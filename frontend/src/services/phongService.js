import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// PhongGiuong_BUS – Frontend Service
export const phongService = {
  // Tìm kiếm phòng/giường theo tiêu chí (gọi từ MH_KetQuaTimKiemPhong)
  timKiemPhong: async ({ hinhThucThue, soNguoi, mucGia, chiNhanh, gioiTinh }) => {
    try {
      const params = new URLSearchParams({ hinhThucThue, soNguoi, mucGia, chiNhanh, gioiTinh });
      const response = await axios.get(`${API_URL}/phong/tim-kiem?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi phongService.timKiemPhong:', error);
      return { success: false, message: 'Lỗi khi tìm kiếm phòng' };
    }
  },
};
