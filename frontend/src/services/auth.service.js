import api from './api';

export async function login(username, password) {
  const res = await api.post('/auth/login', { username, password });
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return { token, user };
}

export async function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export async function getCurrentUser() {
  const res = await api.get('/auth/me');
  return res.data;
}
