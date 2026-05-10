const phongDao = require('../dao/phong.dao');

class phongService {
  // Lấy thông tin 1 phòng theo mã
  static async layThongTinPhong(maphong) {
    return await phongDao.selectByMaPhong(maphong);
  }

  /**
   * Tìm phòng dựa vào nhu cầu thuê từ phiếu yêu cầu
   * @param {object} params - { hinhThucThue, soNguoi, mucGia, chiNhanh, gioiTinh }
   */
  static async timKiemPhong({ hinhThucThue, soNguoi, mucGia, chiNhanh, gioiTinh }) {
    const mucGiaMax = parseFloat(mucGia) || 0;
    const soNguoiThue = parseInt(soNguoi) || 1;

    // Chuyển tên chi nhánh → mã chi nhánh
    let macn = null;
    if (chiNhanh) {
      const cnMap = {
        'Bình Thạnh': 'CN01', 'Chi nhánh Bình Thạnh': 'CN01',
        'Thủ Đức': 'CN02', 'Chi nhánh Thủ Đức': 'CN02',
        'Gò Vấp': 'CN03', 'Chi nhánh Gò Vấp': 'CN03',
        'CN01': 'CN01', 'CN02': 'CN02', 'CN03': 'CN03',
      };
      macn = cnMap[chiNhanh] || null;
    }

    if (hinhThucThue === 'Thuê nguyên căn') {
      const result = await phongDao.timPhongNguyenCan({ macn, gioiTinh });
      if (!result.success) return result;

      // Lọc nghiệp vụ:
      // 1. Số giường trống == số lượng giường (trống hoàn toàn)
      // 2. Số giường >= số người muốn thuê
      // 3. Tính tổng tiền thuê = tiền thuê tháng * số lượng giường
      // 4. Kiểm tra thỏa mức giá (nếu có yêu cầu)
      const filtered = (result.data || [])
        .filter(p => p.sogiuongtrong === p.soluonggiuong && (p.soluonggiuong || 0) >= soNguoiThue)
        .map(p => {
          const tongTienThue = (p.tienthuethang || 0) * (p.soluonggiuong || 1);
          const dsGiuong = (p.giuong || []).filter(g => g.tinhtrang === 'Chưa sử dụng');
          const thoaGia = !mucGiaMax || mucGiaMax <= 0 || tongTienThue <= mucGiaMax;
          return thoaGia
            ? { ...p, giaMoiGiuong: p.tienthuethang, tongTienThue, dsGiuong, dsMagiuong: dsGiuong.map(g => g.magiuong) }
            : null;
        })
        .filter(Boolean);

      return { success: true, loai: 'nguyen-can', data: filtered };
    }

    if (hinhThucThue === 'Ở ghép') {
      const result = await phongDao.timPhongOGhep({ macn, soNguoi: soNguoiThue, gioiTinh });
      if (!result.success) return result;

      // Lọc nghiệp vụ:
      // 1. Phân bổ các giường trống thành nhóm số lượng = soNguoiThue
      // 2. Tính tổng tiền thuê = tiền thuê mỗi giường * số người thuê
      // 3. Kiểm tra thỏa mức giá (nếu có yêu cầu)
      const ketQua = (result.data || [])
        .flatMap(phong => {
          const giuongTrong = (phong.giuong || [])
            .filter(g => g.tinhtrang === 'Chưa sử dụng')
            .sort((a, b) => {
              const numA = parseInt(String(a.magiuong || '').match(/\d+/)?.[0] || Number.MAX_SAFE_INTEGER, 10);
              const numB = parseInt(String(b.magiuong || '').match(/\d+/)?.[0] || Number.MAX_SAFE_INTEGER, 10);
              return numA - numB;
            });
            
          if (giuongTrong.length < soNguoiThue) return [];

          const tongTienThue = (phong.tienthuethang || 0) * soNguoiThue;
          const thoaGia = !mucGiaMax || mucGiaMax <= 0 || tongTienThue <= mucGiaMax;
          if (!thoaGia) return [];

          // Lấy chính xác số lượng giường trống liên tiếp cần thiết
          const group = giuongTrong.slice(0, soNguoiThue);
          if (group.length < soNguoiThue) return [];

          return [{
            ...phong,
            giaMoiGiuong: phong.tienthuethang,
            tongTienThue,
            dsGiuong: group,
            dsMagiuong: group.map(g => g.magiuong),
            magiuong: group[0]?.magiuong || null,
          }];
        });

      return { success: true, loai: 'o-ghep', data: ketQua };
    }

    return { success: false, message: 'Hình thức thuê không hợp lệ' };
  }
}

module.exports = phongService;
