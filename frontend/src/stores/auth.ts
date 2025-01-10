import { defineStore } from 'pinia';
import { login, logout, fetchCurrentUser } from '@/services/authService';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { email_address: string } | null,
  }),
  actions: {
    async login(email_address: string, password: string) {
      try {
        const user = await login(email_address, password);
        this.user = user;

        router.push('/dashboard');
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

        router.push('/login');
        alert('Logged out successfully');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    async fetchCurrentUser() {
      try {
        const user = await fetchCurrentUser();
        console.log('Fetched user:', user);
        this.user = user;
        router.push('/dashboard');
      } catch (error) {
        console.log('Log in!');
      }
    },
  },
});
