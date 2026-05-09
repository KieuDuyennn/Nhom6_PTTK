import api from './api';

export const getInitialPaymentInfo = async (maHD) => {
  const response = await api.get(`/thanh-toan/thong-tin-ky-dau/${maHD}`);
  return response.data;
};

export const generatePaymentId = async () => {
  const response = await api.get('/thanh-toan/sinh-ma');
  return response.data.maTT;
};

export const createInitialPayment = async (data) => {
  // data should contain { maHD, maNV, maTT }
  const response = await api.post('/thanh-toan/ky-dau', data);
  return response.data;
};
