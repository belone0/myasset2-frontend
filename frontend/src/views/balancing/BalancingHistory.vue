<script setup lang="ts">

import Historytable from '@/components/balancing/Historytable.vue';

</script>
<template>

    <div class="min-h-screen p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 ">
        <div class="mb-6">
            <h1 class="text-xl sm:text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                Balancing
            </h1>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Welcome to balancing! Add different asset types and values to balance your portfolio.
            </p>
        </div>

        <Historytable />
    </div>
</template>
