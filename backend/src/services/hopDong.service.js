const hopDongDAO = require('../dao/hopDong.dao');

class HopDong_BUS {
  static async LayTheoMa(maHD) {
    return await hopDongDAO.docTheoMa(maHD);
  }

  static async LayTheoTrangThai(tt) {
    return await hopDongDAO.layDanhSachTheoTrangThai(tt);
  }

  static async TimKiem(tt, keyword) {
    return await hopDongDAO.timKiem(keyword, tt);
  }

  static async CapNhatTrangThai(ma, tt) {
    return await hopDongDAO.capNhatTrangThai(ma, tt);
  }
}

module.exports = HopDong_BUS;
