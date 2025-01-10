<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Topbar />
      <main class="p-4 flex-grow bg-white">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Sidebar from './Sidebar.vue';
  import Topbar from './Topbar.vue';
</script>