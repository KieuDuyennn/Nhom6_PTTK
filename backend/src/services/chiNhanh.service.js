const chiNhanhDao = require('../dao/chiNhanh.dao');

class chiNhanhService {
  static async layThongTinChiNhanh(macn) {
    return await chiNhanhDao.selectByMaCN(macn);
  }

  // Lấy danh sách tất cả chi nhánh (dùng cho dropdown ở UI)
  static async layDanhSachChiNhanh() {
    return await chiNhanhDao.selectAll();
  }
}

module.exports = chiNhanhService;

