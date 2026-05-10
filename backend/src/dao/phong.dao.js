const supabase = require('../config/supabase');

class phongDao {
  static async timPhongNguyenCan({ macn, gioiTinh }) {
    let query = supabase
      .from('phong')
      .select(`
        maphong,
        soluonggiuong,
        sogiuongtrong,
        gioitinh,
        tienthuethang,
        trangthai,
        macn,
        chi_nhanh (tencn, diachi),
        giuong (magiuong, tinhtrang)
      `)
      .eq('trangthai', 'Còn giường trống');

    if (macn) query = query.eq('macn', macn);
    if (gioiTinh) query = query.in('gioitinh', [gioiTinh, 'Hỗn hợp']);

    const { data, error } = await query.order('tienthuethang', { ascending: true });

    if (error) {
      console.error('Lỗi phongDao.timPhongNguyenCan:', error);
      return { success: false, error };
    }
    
    return { success: true, data: data || [] };
  }

  static async timPhongOGhep({ macn, soNguoi, gioiTinh }) {
    const soNguoiThue = parseInt(soNguoi) || 1;
    let query = supabase
      .from('phong')
      .select(`
        maphong,
        soluonggiuong,
        sogiuongtrong,
        gioitinh,
        tienthuethang,
        trangthai,
        macn,
        chi_nhanh (tencn, diachi),
        giuong (magiuong, tinhtrang)
      `)
      .eq('trangthai', 'Còn giường trống')
      .gte('sogiuongtrong', soNguoiThue); // Lọc cơ bản ở DB

    if (macn) query = query.eq('macn', macn);
    if (gioiTinh) query = query.in('gioitinh', [gioiTinh, 'Hỗn hợp']);

    const { data, error } = await query.order('tienthuethang', { ascending: true });

    if (error) {
      console.error('Lỗi phongDao.timPhongOGhep:', error);
      return { success: false, error };
    }

    return { success: true, data: data || [] };
  }

  // Lấy trạng thái hiện tại của phòng
  static async selectTrangThai(maphong) {
    const { data, error } = await supabase
      .from('phong')
      .select('maphong, trangthai')
      .eq('maphong', maphong)
      .single();

    if (error) {
      console.error('Lỗi phongDao.selectTrangThai:', error);
      return { success: false, error };
    }
    return { success: true, data };
  }

  // Cập nhật trạng thái phòng
  // Giá trị hợp lệ (schema mới): 'Còn giường trống' | 'Hết giường' | 'Đang giữ chỗ'
  static async updateTrangThai(maphong, trangthai) {
    const { data, error } = await supabase
      .from('phong')
      .update({ trangthai })
      .eq('maphong', maphong)
      .select()
      .single();

    if (error) {
      console.error('Lỗi phongDao.updateTrangThai:', error);
      return { success: false, error };
    }
    return { success: true, data };
  }
  // Lấy thông tin phòng theo mã phòng
  static async selectByMaPhong(maphong) {
    const { data, error } = await supabase
      .from('phong')
      .select('maphong, tienthuethang, trangthai, macn, gioitinh')
      .eq('maphong', maphong)
      .single();

    if (error) {
      console.error('Lỗi phongDao.selectByMaPhong:', error);
      return { success: false, error };
    }
    return { success: true, data };
  }
}

module.exports = phongDao;
