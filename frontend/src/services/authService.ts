import apiClient from '@/utils/axios';

export const login = async (email_address: string, password: string) => {
  const response = await apiClient.post('/session', { email_address, password });

  return response.data;
};

export const register = async (email_address: string, password: string) => {
  const response = await apiClient.post('/users', { email_address, password });

  return response.data;
}

export const logout = async () => {
  await apiClient.delete('/session');
};

export const fetchCurrentUser = async () => {
  const response = await apiClient.get('/users/me');
  return response.data;
};
