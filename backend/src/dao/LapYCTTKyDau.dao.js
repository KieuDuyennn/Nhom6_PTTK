const supabase = require('../config/supabase');

// ============================================================
// HopDong_DAO — Truy vấn bảng HOP_DONG
// ============================================================

/**
 * Lấy danh sách hợp đồng đã ký xác nhận, join KHACH_HANG
 */
async function layDSHDDaKyXacNhan() {
  // Dọn rác: Tự động xoá các phiếu YCTT kỳ đầu đang ở trạng thái 'Mới' (do người dùng thoát ngang)
  await supabase
    .from('thanh_toan')
    .delete()
    .eq('loaitt', 'Tiền thuê')
    .eq('trangthai', 'Mới');

  const { data, error } = await supabase
    .from('hop_dong')
    .select('*, khach_hang(*), thanh_toan(loaitt, trangthai)')
    .eq('trangthai', 'Đã ký xác nhận')
    .order('ngaybatdau', { ascending: false });

  if (error) throw error;

  // Lọc bỏ những hợp đồng đã có phiếu "Tiền thuê" ở trạng thái "Chờ thanh toán"
  return (data || []).filter(hd => {
    const hasChoThanhToan = hd.thanh_toan?.some(tt =>
      tt.loaitt === 'Tiền thuê' && tt.trangthai === 'Chờ thanh toán'
    );
    return !hasChoThanhToan;
  });
}

/**
 * Đọc chi tiết 1 hợp đồng + join KH, giường, phòng
 */
async function docThongTinHD(maHD) {
  const { data, error } = await supabase
    .from('hop_dong')
    .select('*, khach_hang(*)')
    .eq('mahd', maHD)
    .single();

  if (error) throw error;

  // Lấy thông tin giường qua bảng trung gian
  const { data: hdGiuong, error: errGiuong } = await supabase
    .from('hop_dong_giuong')
    .select('magiuong, maphong')
    .eq('mahd', maHD);

  if (errGiuong) throw errGiuong;

  data.giuongList = hdGiuong || [];
  // Lấy thông tin phòng từ mã phòng đầu tiên
  if (hdGiuong && hdGiuong.length > 0) {
    const maPhong = hdGiuong[0].maphong;
    const { data: phongData } = await supabase
      .from('phong')
      .select('maphong, soluonggiuong, gioitinh, loaihinh, tienthuethang, trangthai, macn')
      .eq('maphong', maPhong)
      .single();
    data.phong = phongData;
  }

  return data;
}

/**
 * Tìm kiếm hợp đồng theo tên KH, SĐT, mã HD
 */
async function timKiem(keyword) {
  const k = `%${keyword}%`;

  // Search theo mã HD
  const { data: byMaHD } = await supabase
    .from('hop_dong')
    .select('*, khach_hang(*), thanh_toan(loaitt, trangthai)')
    .eq('trangthai', 'Đã ký xác nhận')
    .ilike('mahd', k);

  // Search theo tên KH
  const { data: byTen } = await supabase
    .from('hop_dong')
    .select('*, khach_hang!inner(*), thanh_toan(loaitt, trangthai)')
    .eq('trangthai', 'Đã ký xác nhận')
    .ilike('khach_hang.hoten', k);

  // Search theo SĐT
  const { data: bySDT } = await supabase
    .from('hop_dong')
    .select('*, khach_hang!inner(*), thanh_toan(loaitt, trangthai)')
    .eq('trangthai', 'Đã ký xác nhận')
    .ilike('khach_hang.sdt', k);

  // Gộp kết quả, loại bỏ trùng lặp theo mahd
  const map = new Map();
  [...(byMaHD || []), ...(byTen || []), ...(bySDT || [])].forEach(hd => {
    // Lọc bỏ những hợp đồng đã có phiếu "Tiền thuê" ở trạng thái "Chờ thanh toán"
    const hasChoThanhToan = hd.thanh_toan?.some(tt =>
      tt.loaitt === 'Tiền thuê' && tt.trangthai === 'Chờ thanh toán'
    );
    if (!hasChoThanhToan && !map.has(hd.mahd)) map.set(hd.mahd, hd);
  });

  return Array.from(map.values());
}

// ============================================================
// THANHTOAN_DAO — Truy vấn bảng THANH_TOAN
// ============================================================

/**
 * Thêm phiếu YCTT mới (LoaiTT = 'Tiền thuê')
 */
async function them(tt) {
  const { data, error } = await supabase
    .from('thanh_toan')
    .insert(tt)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Đọc chi tiết 1 phiếu thanh toán, join KH và HD
 */
async function docThongTinTT(maTT) {
  const { data, error } = await supabase
    .from('thanh_toan')
    .select('*, khach_hang(*), hop_dong(*)')
    .eq('matt', maTT)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Cập nhật trạng thái phiếu thanh toán
 */
async function capNhatTrangThai(maTT, trangThai) {
  const { data, error } = await supabase
    .from('thanh_toan')
    .update({ trangthai: trangThai })
    .eq('matt', maTT)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Xóa phiếu thanh toán (khi người dùng quay lại/hủy)
 */
async function xoaThanhToan(maTT) {
  const { data, error } = await supabase
    .from('thanh_toan')
    .delete()
    .eq('matt', maTT);

  if (error) throw error;
  return data;
}

/**
 * Lấy DS thanh toán theo hợp đồng (kiểm tra đã có YCTT kỳ đầu chưa)
 */
async function layDSTheoHopDong(maHD) {
  const { data, error } = await supabase
    .from('thanh_toan')
    .select('*')
    .eq('mahd', maHD)
    .eq('loaitt', 'Tiền thuê');

  if (error) throw error;
  return data || [];
}

/**
 * Lấy tiền cọc đã đối soát thành công theo hợp đồng
 */
async function layTienCocTheoHD(maHD) {
  const { data, error } = await supabase
    .from('thanh_toan')
    .select('sotien')
    .eq('mahd', maHD)
    .eq('loaitt', 'Tiền cọc')
    .eq('trangthai', 'Đối soát thành công')
    .single();

  if (error) return 0;
  return data ? data.sotien : 0;
}

/**
 * Sinh mã TT mới (TT + số tăng dần)
 */
async function sinhMaTT() {
  // Lấy tất cả mã TT của Tiền thuê để tìm số lớn nhất (tránh lỗi sort chuỗi TT99 > TT100 và tránh lấy nhầm TTC)
  const { data } = await supabase
    .from('thanh_toan')
    .select('matt')
    .eq('loaitt', 'Tiền thuê');

  if (data && data.length > 0) {
    let maxNum = 0;
    data.forEach(item => {
      const num = parseInt(item.matt.replace(/\D/g, ''), 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    });
    return 'TT' + String(maxNum + 1).padStart(2, '0');
  }
  return 'TT01';
}

// ============================================================
// DichVu_DAO — Truy vấn bảng DICH_VU
// ============================================================

/**
 * Lấy TẤT CẢ dịch vụ của chi nhánh chứa phòng (qua chuỗi: PHONG → CHI_NHANH → CHI_NHANH_DICH_VU → DICH_VU)
 */
async function layDSTheoChiNhanhCuaPhong(maPhong) {
  // Bước 1: Lấy mã chi nhánh từ phòng
  const { data: phong, error: errPhong } = await supabase
    .from('phong')
    .select('macn')
    .eq('maphong', maPhong)
    .single();

  if (errPhong || !phong) return [];

  // Bước 2: Lấy danh sách dịch vụ qua bảng trung gian
  const { data: cnDV, error: errCNDV } = await supabase
    .from('chi_nhanh_dich_vu')
    .select('dich_vu(*)')
    .eq('macn', phong.macn);

  if (errCNDV) return [];
  return cnDV ? cnDV.map(item => item.dich_vu) : [];
}

module.exports = {
  // HopDong_DAO
  layDSHDDaKyXacNhan,
  docThongTinHD,
  timKiem,
  // THANHTOAN_DAO
  them,
  docThongTinTT,
  capNhatTrangThai,
  xoaThanhToan,
  layDSTheoHopDong,
  layTienCocTheoHD,
  sinhMaTT,
  // DichVu_DAO
  layDSTheoChiNhanhCuaPhong,
};
