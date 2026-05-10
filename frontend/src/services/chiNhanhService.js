import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ChiNhanh_BUS – Frontend Service
export const chiNhanhService = {
  // Lấy danh sách tất cả chi nhánh (gọi từ dropdown MH_DangKyThuePhong)
  layDanhSachChiNhanh: async () => {
    try {
      const response = await axios.get(`${API_URL}/chi-nhanh`);
      return response.data;
    } catch (error) {
      console.error('Lỗi chiNhanhService.layDanhSachChiNhanh:', error);
      return { success: false, data: [] };
    }
  },
};
