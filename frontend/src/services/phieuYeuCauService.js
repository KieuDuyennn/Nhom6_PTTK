import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const phieuYeuCauService = {
  taoPhieuYeuCau: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/phieu-yeu-cau/dang-ky`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
      return { success: false, message: 'Lỗi kết nối máy chủ' };
    }
  },

  getDanhSach: async (trangthai, keyword) => {
    try {
      let url = `${API_URL}/phieu-yeu-cau/danh-sach`;
      const params = [];
      if (trangthai) params.push(`trangthai=${encodeURIComponent(trangthai)}`);
      if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
      
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Lỗi phieuYeuCauService.getDanhSach:', error);
      return { success: false, message: 'Lỗi khi tải danh sách' };
    }
  },

  huyLich: async (mayc) => {
    try {
      const response = await axios.delete(`${API_URL}/phieu-yeu-cau/huy-lich/${mayc}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi phieuYeuCauService.huyLich:', error);
      return { success: false, message: 'Lỗi khi hủy lịch' };
    }
  },

  layChiTiet: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/phieu-yeu-cau/chi-tiet/${id}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi phieuYeuCauService.layChiTiet:', error);
      return { success: false, message: 'Lỗi khi tải chi tiết' };
    }
  },

  updateTrangThaiChot: async (data) => {
    try {
      const response = await axios.patch(`${API_URL}/phieu-yeu-cau/update-trang-thai-chot`, data);
      return response.data;
    } catch (error) {
      console.error('Lỗi phieuYeuCauService.updateTrangThaiChot:', error);
      throw error;
    }
  },

  deleteChiTiet: async (mayc, maphong, magiuong) => {
    try {
      const response = await axios.delete(`${API_URL}/phieu-yeu-cau/chi-tiet/${mayc}/${maphong}/${magiuong}`);
      return response.data;
    } catch (error) {
      console.error('Lỗi phieuYeuCauService.deleteChiTiet:', error);
      throw error;
    }
  },

  updateTrangThai: async (data) => {
    try {
      const response = await axios.patch(`${API_URL}/phieu-yeu-cau/update-trang-thai`, data);
      return response.data;
    } catch (error) {
      console.error('Lỗi phieuYeuCauService.updateTrangThai:', error);
      throw error;
    }
  }
};
