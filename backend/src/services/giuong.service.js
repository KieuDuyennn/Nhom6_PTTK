const giuongDao = require('../dao/giuong.dao');

class giuongService {
  static async layDanhSachGiuongCuaPhong(maphong) {
    return await giuongDao.selectByMaPhong(maphong);
  }

  static async layTinhTrangGiuong(magiuong, maphong) {
    return await giuongDao.selectTinhTrang(magiuong, maphong);
  }

  static async capNhatTinhTrangGiuong(magiuong, maphong, tinhtrang) {
    return await giuongDao.updateTinhTrang(magiuong, maphong, tinhtrang);
  }
}

module.exports = giuongService;
