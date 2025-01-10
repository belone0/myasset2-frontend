<template>
    <header class="bg-white shadow flex justify-between items-center px-4 h-16">
        <h1 class="text-lg font-semibold text-gray-700">Dashboard</h1>
        <Menu ref="menu" :model="menuItems" popup />
        <button @click="toggleMenu" class="flex items-center space-x-2">
            <img :src="userAvatar" class="w-10 h-10 rounded-full" />
            <span>{{ userName }}</span>
            <i class="pi pi-chevron-down"></i>
        </button>
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Menu from 'primevue/menu';
import router from '@/router';

const authStore = useAuthStore();
const userAvatar = ref('https://via.placeholder.com/40');
const userName = ref('John Doe');
const menu = ref();

const menuItems = [
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => logout() },
];

const toggleMenu = (event: Event) => {
    menu.value?.toggle(event);
};

const logout = () => {
    authStore.logout();
    router.push('/login');
};
</script>

<style scoped>
header {
    z-index: 10;
}
</style>