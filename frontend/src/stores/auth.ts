import { defineStore } from 'pinia';
import { login, logout, fetchCurrentUser } from '@/services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { email: string } | null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const user = await login(email, password);
        this.user = user;
        alert('Login successful');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Invalid credentials');
      }
    },
    async logout() {
      try {
        await logout();
        this.user = null;
        alert('Logged out successfully');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    async fetchCurrentUser() {
      try {
        const user = await fetchCurrentUser();
        this.user = user;
      } catch (error) {
        console.error('Failed to fetch user:', error);
        this.user = null;
      }
    },
  },
});
