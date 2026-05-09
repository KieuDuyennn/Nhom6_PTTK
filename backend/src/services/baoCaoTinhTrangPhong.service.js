const baoCaoTinhTrangPhongDAO = require('../dao/baoCaoTinhTrangPhong.dao');

class BaoCaoTinhTrangPhong_BUS {
  static async LayTheoHopDong(maHD) {
    return await baoCaoTinhTrangPhongDAO.docTheoHD(maHD);
  }
}

module.exports = BaoCaoTinhTrangPhong_BUS;
