import { defineStore } from 'pinia';
import { login, logout, fetchCurrentUser, register } from '@/services/authService';
import router from '@/router';
import type { User } from '@/types/User';
import { useToast } from 'vue-toastification';

const toast = useToast();

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
        toast.success('Logged in successfully');
      } catch (error) {
        toast.error('Login failed, check your credentials or internet access');
        console.error('Login failed:', error);
      }
    },
    async register(email_address: string, password: string) {
      try {
        const user_data = await register(email_address, password);
        this.setUser(user_data);

        router.push({ name: "Login" });
        toast.success('Registered successfully, now log in with your account!');
      } catch (error) {
        console.error('Registration failed:', error);
        toast.error('Registration failed');
      }
    },
    async logout() {
      try {
        await logout();
        this.setUser(null);

        router.push({ name: "Login" });
        toast.success('Logged out successfully');
      } catch (error) {
        toast.error('Logout failed');
        console.error('Logout failed:', error);
      }
    },
    async fetchCurrentUser() {
      try {
        const user_data = await fetchCurrentUser();
        console.log('Authenticated.');

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
