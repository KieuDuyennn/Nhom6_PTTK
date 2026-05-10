const phongDao = require('../dao/phong.dao');

class phongService {
  static async layThongTinPhong(maphong) {
    return await phongDao.selectByMaPhong(maphong);
  }
}

module.exports = phongService;
