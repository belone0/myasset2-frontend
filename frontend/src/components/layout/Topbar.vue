<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const props = defineProps<{
  theme: string;
  userAvatar?: string;
  userName?: string;
}>();

const emit = defineEmits(['toggleSidebar', 'toggleTheme']);

const isDark = ref(props.theme === 'dark');

const showUserMenu = ref(false);

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const toggleTheme = () => {
  emit('toggleTheme');
  isDark.value = !isDark.value;
}

const onLogout = () => {
  authStore.logout();
  showUserMenu.value = false;
};

const date = new Date().toLocaleDateString()
</script>
<template>
  <header
    class="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-100">
    <!-- LEFT: Sidebar Toggle + "Plan" -->
    <div class="flex items-center space-x-4">
      <!-- Emit an event to toggle sidebar -->
      <button @click="$emit('toggleSidebar')"
        class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
        <i class="pi pi-bars text-xl"></i>
      </button>

      <div
        class="bg-gray-100 dark:bg-gray-800 py-1 px-3 rounded-full text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        My Asset 2
      </div>
    </div>

    <!-- CENTER: Search bar (optional, hidden on small screens) -->
    <div class="hidden md:flex w-1/2 mx-4">
      <div class="relative flex-grow">
        <span class="absolute inset-y-0 left-2 flex items-center text-gray-400">
          <i class="pi pi-search"></i>
        </span>
        <input type="text" placeholder="Search..."
          class="w-full pl-9 pr-4 py-2 rounded bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors" />
      </div>
    </div>

    <!-- RIGHT: Date range + Dark Mode Toggle + User Avatar -->
    <div class="flex items-center space-x-4">
      <!-- Date Range (example) -->
      <button
        class="flex items-center space-x-2 py-1 px-3 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <i class="pi pi-calendar"></i>
        <span class="hidden sm:inline">{{ date }}</span>
      </button>

      <!-- Dark Mode Toggle -->
      <button class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" @click="toggleTheme">
        <i v-if="isDark" class="pi pi-moon text-xl"></i>
        <i v-else class="pi pi-sun text-xl"></i>
      </button>

      <!-- USER AVATAR + DROPDOWN -->
      <div class="relative">
        <div class="flex items-center space-x-2 cursor-pointer" @click="toggleUserMenu">
          <img :src="userAvatar" alt="User Avatar" class="w-8 h-8 rounded-full object-cover" />
          <span class="hidden sm:inline">{{ userName }}</span>
          <i class="pi pi-chevron-down"></i>
        </div>

        <!-- Dropdown Menu -->
        <transition enter-active-class="transition ease-out duration-100 transform"
          enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75 transform" leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95">
          <ul v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded shadow-xl z-20">
            <li
              class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-200"
              @click="onLogout">
              <i class="pi pi-sign-out"></i>
              <span>Logout</span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </header>
</template>