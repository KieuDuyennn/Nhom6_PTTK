import api from './api';

export const getContractsByStatus = async (status) => {
  const response = await api.get('/checkout/contracts', { params: { status } });
  return response.data;
};

export const searchContracts = async (keyword, status) => {
  const response = await api.get('/checkout/contracts/search', { params: { keyword, status } });
  return response.data;
};

export const getContractById = async (id) => {
  const response = await api.get(`/checkout/contracts/${id}`);
  return response.data;
};

export const getCreationData = async (maHD) => {
  const response = await api.get('/checkout/reports/creation-data', { params: { maHD } });
  return response.data;
};

export const createCheckoutReport = async (data) => {
  const response = await api.post('/checkout/reports', data);
  return response.data;
};

export const getReportDetails = async (id) => {
  const response = await api.get(`/checkout/reports/${id}`);
  return response.data;
};

