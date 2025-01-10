<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import Topbar from '@/components/layout/Topbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';

const collapsed = ref(false);
const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const darkMode = ref(false);
const toggleTheme = () => {
  darkMode.value = !darkMode.value;
};

watch(darkMode, (val) => {
  document.documentElement.classList.toggle('dark', val);
});

onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    darkMode.value = true;
  }
});

const userAvatar = ref('https://cdn-icons-png.flaticon.com/512/219/219983.png');
const userName = ref('belone');

const menuItems = [
  { label: 'Dashboard', icon: 'pi pi-home', to: '/dashboard' },
  { label: 'Reports', icon: 'pi pi-chart-bar', to: '/reports' },
  { label: 'Settings', icon: 'pi pi-cog', to: '/settings' },
];

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Topbar :isDark="darkMode" :userAvatar="userAvatar" :userName="userName" @toggleSidebar="toggleSidebar"
      @toggleTheme="toggleTheme" />

    <div class="flex flex-grow bg-gray-100 dark:bg-gray-900">
      <Sidebar :collapsed="collapsed" :menuItems="menuItems" />
      <router-view />
    </div>
  </div>
</template>