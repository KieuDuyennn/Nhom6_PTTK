const thanhToanDAO = require('../dao/thanhToan.dao');
const hopDongBUS = require('./hopDong.service');
const dichVuBUS = require('./dichVu.service');



class ThanhToan_BUS {

  static async TaoMa() {
    return await thanhToanDAO.sinhMaThanhToan();
  }

  static async ThemPhieu(tt) {
    return await thanhToanDAO.them(tt);
  }

  static async TaoPhieuThanhToanKyDau(maHD, maNV, maTT) {
    // 1. Validate trạng thái hợp đồng qua BUS
    const hopDong = await hopDongBUS.LayTheoMa(maHD);
    if (!hopDong) throw new Error('Không tìm thấy hợp đồng');
    if (hopDong.trangthai !== 'Đã ký xác nhận') {
      throw new Error('Hợp đồng chưa ở trạng thái Đã ký xác nhận');
    }

    // 2. Tính toán tổng tiền
    const tongGiaGiuong = hopDongBUS.TinhTongGiaGiuong(hopDong);
    const maCN = hopDong.hop_dong_giuong?.[0]?.giuong?.phong?.macn;
    let tongDichVu = 0;
    if (maCN) {
      const dichVu = await dichVuBUS.LayTheoMaCN(maCN);
      tongDichVu = dichVu.reduce((sum, dv) => sum + Number(dv.gia), 0);
    }

    const tongTien = tongGiaGiuong + tongDichVu;

    // 3. Tạo đối tượng thanh toán với mã đã truyền vào
    const newTT = {
      matt: maTT,
      loaitt: 'Thanh toán kỳ đầu',
      sotien: tongTien,
      thoidiemyeucau: new Date().toISOString(),
      trangthai: 'Chờ thanh toán',
      mahd: maHD,
      makh: hopDong.makh,
      manvkt: maNV // Nhân viên kế toán lập phiếu
    };

    const createdTT = await thanhToanDAO.them(newTT);

    // 4. Cập nhật trạng thái hợp đồng qua BUS
    await hopDongBUS.CapNhatTrangThai(maHD, 'Chờ thanh toán đầu kỳ');

    return createdTT;
  }
}

module.exports = ThanhToan_BUS;
