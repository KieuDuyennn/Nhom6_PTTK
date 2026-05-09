const dichVuDAO = require('../dao/dichVu.dao');

class DichVu_BUS {
  static async LayTheoMaCN(maCN) {
    return await dichVuDAO.layTheoMaCN(maCN);
  }
}

module.exports = DichVu_BUS;
