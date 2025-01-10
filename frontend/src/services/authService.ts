import apiClient from '@/utils/axios';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/session', { email, password });
  return response.data;
};

export const logout = async () => {
  await apiClient.delete('/session');
};

export const fetchCurrentUser = async () => {
  const response = await apiClient.get('/users/me');
  return response.data;
};
