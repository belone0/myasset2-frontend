<template>
    <nav class="w-64 bg-blue-800 text-white flex-shrink-0 flex flex-col">
      <div class="p-4 text-xl font-bold">MyApp</div>
      <ul class="flex-1 space-y-2 p-4">
        <li>
          <router-link to="/dashboard" class="block px-4 py-2 rounded hover:bg-blue-700">
            <i class="pi pi-home mr-2"></i> Dashboard
          </router-link>
        </li>
        <!-- Add more menu items -->
      </ul>
      <div class="p-4 text-sm">© 2025 MyApp</div>
    </nav>
  </template>
  
  <script lang="ts" setup></script>
  