<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
        <!-- Email -->
        <div class="flex flex-col space-y-1">
            <label for="email_address" class="text-sm font-medium">
                Email:
            </label>
            <input id="email_address" v-model="email_address" type="email" placeholder="Enter your email address"
                required class="px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-700
                 focus:outline-none focus:ring-2 focus:ring-purple-500
                 placeholder-gray-400" />
        </div>

        <!-- Password -->
        <div class="flex flex-col space-y-1">
            <label for="password" class="text-sm font-medium">
                Password:
            </label>
            <input id="password" v-model="password" type="password" placeholder="Enter your password" required class="px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-700
                 focus:outline-none focus:ring-2 focus:ring-purple-500
                 placeholder-gray-400" />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded
               transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500">
            Login
        </button>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const email_address = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleSubmit = () => {
    authStore.login(email_address.value, password.value);
};
</script>