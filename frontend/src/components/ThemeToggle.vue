<template>
    <button @click="toggleTheme" class="p-2 rounded-md bg-gray-200 dark:bg-gray-700">
      <i v-if="theme === 'light'" class="pi pi-moon text-xl"></i>
      <i v-else class="pi pi-sun text-xl"></i>
    </button>
  </template>
  
  <script lang="ts" setup>
import { useThemeStore } from '@/stores/theme';
import { ref } from 'vue';
  
  const themeStore = useThemeStore();
  const toggleTheme = () => themeStore.toggleTheme();
  
  const theme = ref(themeStore.theme);
  </script>
  
  <style scoped>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }
  </style>
  