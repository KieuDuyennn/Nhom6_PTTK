const bienBanTraPhongDAO = require('../dao/bienBanTraPhong.dao');
const hopDongDAO = require('../dao/hopDong.dao');

class BienBanTraPhong_BUS {
  static async Tao(maHD, maNV) {
    // 1. Validate contract status
    const hopDong = await hopDongDAO.docTheoMa(maHD);
    if (!hopDong) throw new Error('Không tìm thấy hợp đồng');
    
    // Check using lowercase property name from Supabase
    if (hopDong.trangthai !== 'Đã đối soát') {
      throw new Error('Hợp đồng chưa ở trạng thái Đã đối soát');
    }

    // 2. Generate ID
    const maBBTP = await bienBanTraPhongDAO.sinhMaBienBanTraPhong();

    // 3. Create report using lowercase column names for Supabase
    const newBB = {
      mabienbantp: maBBTP,
      ngaylap: new Date().toISOString().split('T')[0],
      trangthai: 'Chưa xác nhận',
      mahd: maHD,
      manv: maNV || 'NV01' 
    };

    return await bienBanTraPhongDAO.them(newBB);
  }

  static async SinhMaBienBan() {
    return await bienBanTraPhongDAO.sinhMaBienBanTraPhong();
  }

  static async LayTheoMa(maBBTP) {
    return await bienBanTraPhongDAO.docTheoMa(maBBTP);
  }

  static async CapNhatTrangThai(ma, tt) {
    return await bienBanTraPhongDAO.capNhatTrangThai(ma, tt);
  }
}

module.exports = BienBanTraPhong_BUS;
