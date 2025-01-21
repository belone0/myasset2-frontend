import { defineStore } from 'pinia';
import { login, logout, fetchCurrentUser, register } from '@/services/authService';
import router from '@/router';
import type { User } from '@/types/User';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  actions: {
    async login(email_address: string, password: string) {
      try {
        const user_data = await login(email_address, password);
        this.setUser(user_data);

        router.push({ name: "Dashboard" });
        alert('Login successful');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Invalid credentials');
      }
    },
    async register(email_address: string, password: string) {
      try {
        const user_data = await register(email_address, password);
        this.setUser(user_data);

        router.push({ name: "Login" });
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

        router.push({ name: "Login" });
        alert('Logged out successfully');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    async fetchCurrentUser() {
      try {
        const user_data = await fetchCurrentUser();
        console.log('Fetched user!');

        this.setUser(user_data);
      } catch (error) {
        console.log('Log in!');
      }
    },
    async setUser(user: User | null) {
      this.user = user;
    }
  }
});
