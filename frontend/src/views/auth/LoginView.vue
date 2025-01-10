<template>
    <div class="app-bg flex flex-col items-center justify-center p-4">
      <h1 class="mb-8 text-4xl font-extrabold text-white drop-shadow-lg select-none">
        MyAsset
      </h1>
  
      <div
        class="w-full max-w-sm rounded-lg shadow-md bg-gray-800 text-gray-100 p-6"
      >
        <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
  
        <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
          <div class="flex flex-col space-y-1">
            <label for="email_address" class="text-sm font-medium">
              Email:
            </label>
            <input
              id="email_address"
              v-model="email_address"
              type="email"
              placeholder="Enter your email address"
              required
              class="px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     placeholder-gray-400"
            />
          </div>
  
          <!-- Password -->
          <div class="flex flex-col space-y-1">
            <label for="password" class="text-sm font-medium">
              Password:
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
              class="px-3 py-2 rounded bg-gray-700 text-gray-100 border border-gray-600
                     focus:outline-none focus:ring-2 focus:ring-purple-500
                     placeholder-gray-400"
            />
          </div>
  
          <!-- Submit Button -->
          <button
            type="submit"
            class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded
                   transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  // Data properties
  const email_address = ref('');
  const password = ref('');
  
  // Auth store
  const authStore = useAuthStore();
  
  // Submit logic
  const handleSubmit = () => {
    authStore.login(email_address.value, password.value);
  };
  </script>
  
  <style scoped>

  .app-bg {
    min-height: 100vh;
    background-color: #111;
    background-image:
      radial-gradient(circle at -25% -25%, rgba(147,51,234, 0.5), transparent 40%),
      radial-gradient(circle at 125% 125%, rgba(147,51,234, 0.5), transparent 40%);
    background-repeat: no-repeat;
    background-size: cover;
  }
  </style>
  