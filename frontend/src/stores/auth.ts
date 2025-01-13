import { defineStore } from 'pinia';
import { login, logout, fetchCurrentUser, register } from '@/services/authService';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { email_address: string } | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  actions: {
    async login(email_address: string, password: string) {
      try {
        const user = await login(email_address, password);
        this.setUser(user);

        router.push('/dashboard');
        alert('Login successful');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Invalid credentials');
      }
    },
    async register(email_address: string, password: string) {
      try {
        const user = await register(email_address, password);
        this.setUser(user);

        router.push('/login');
        alert('Registered successfully, now log in with your account!');
      } catch (error) {
        console.error('Registration failed:', error);
        alert('Registration failed');
      }
    },
    async logout() {
      try {
        await logout();
        this.setUser(null);

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
        this.setUser(user);
        router.push('/dashboard');
      } catch (error) {
        console.log('Log in!');
      }
    },
    async setUser(user: { email_address: string } | null) {
      this.user = user;
    }
  }
});
