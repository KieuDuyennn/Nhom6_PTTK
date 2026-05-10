const chiNhanhDao = require('../dao/chiNhanh.dao');

class chiNhanhService {
  static async layThongTinChiNhanh(macn) {
    return await chiNhanhDao.selectByMaCN(macn);
  }
}

module.exports = chiNhanhService;
