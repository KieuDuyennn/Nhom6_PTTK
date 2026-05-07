const bangDoiSoatDAO = require('../dao/bangDoiSoat.dao');

class BangDoiSoat_BUS {
  static async LayTheoMaHD(maHD) {
    return await bangDoiSoatDAO.docTheoMaHD(maHD);
  }
}

module.exports = BangDoiSoat_BUS;
