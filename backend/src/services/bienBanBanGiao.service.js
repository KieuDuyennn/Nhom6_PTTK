const bienBanBanGiaoDAO = require('../dao/bienBanBanGiao.dao');

class BienBanBanGiao_BUS {
  static async LayTaiSanTheoHopDong(maHD) {
    return await bienBanBanGiaoDAO.docTheoHD(maHD);
  }
}

module.exports = BienBanBanGiao_BUS;
