const hopDongDAO = require('../dao/hopDong.dao');
const dichVuBUS = require('./dichVu.service');


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

  static TinhTongGiaGiuong(hopDong) {
    const tienThueThang = Number(hopDong?.giathue) || 0;
    return tienThueThang;
  }

  static async LayThongTinThanhToanKyDau(maHD) {
    // 1. Lấy thông tin hợp đồng
    const hopDong = await this.LayTheoMa(maHD);
    if (!hopDong) throw new Error('Không tìm thấy hợp đồng');

    // 2. Tính tổng giá giường = tiền thuê hợp đồng
    const tongGiaGiuong = this.TinhTongGiaGiuong(hopDong);

    // 3. Lấy thông tin chi nhánh để lấy dịch vụ
    const maCN = hopDong.hop_dong_giuong?.[0]?.giuong?.phong?.macn;
    let dichVu = [];
    if (maCN) {
      dichVu = await dichVuBUS.LayTheoMaCN(maCN);
    }

    return {
      hopDong,
      tongGiaGiuong,
      dichVu
    };
  }

}

module.exports = HopDong_BUS;
