<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import Topbar from '@/components/layout/Topbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { useAuthStore } from '@/stores/auth';
import { useThemeStore } from '@/stores/theme';

const authStore = useAuthStore();
const themeStore = useThemeStore();

const theme = ref(themeStore.theme);
const toggleTheme = () => themeStore.toggleTheme();

const collapsed = ref(false);
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const userAvatar = ref('https://cdn-icons-png.flaticon.com/512/219/219983.png');
const userName = authStore.getUser?.email_address;

const menuItems = [
  { label: 'Dashboard', icon: 'pi pi-home', to: '/dashboard' },
  { label: 'Todo', icon: 'pi pi-check', to: '/todo' },
  // { label: 'Settings', icon: 'pi pi-cog', to: '/settings' },
];

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Topbar :theme="theme" :userAvatar="userAvatar" :userName="userName" @toggleSidebar="toggleSidebar"
      @toggleTheme="toggleTheme" />

    <div class="flex flex-grow bg-gray-100 dark:bg-gray-900">
      <Sidebar :collapsed="collapsed" :menuItems="menuItems" />
      <router-view />
    </div>
  </div>
</template>