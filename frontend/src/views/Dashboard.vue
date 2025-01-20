<script lang="ts" setup>
import TodoList from '@/components/todo/TodoList.vue';
import Overview from '@/components/dashboard/Overview.vue';
import Conversion from '@/components/currency/Conversion.vue';
import Chart from '@/components/balancing/Chart.vue';

</script>
<template>
    <div class="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
        <!-- Heading -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                Dashboard
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
                Welcome to the myasset dashboard
            </p>
        </div>

        <!-- Overview Row -->
        <Suspense>
            <Overview />
        </Suspense>


        <!-- Card Grid Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

            <TodoList />

            <Conversion />

            <!-- Currency Card -->
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Nuance currency (mock)
                </h2>
                <div class="flex items-center space-x-2">
                    <span>🇺🇸</span>
                    <p class="text-sm text-gray-600 dark:text-gray-400">USD 893,689.00</p>
                </div>
                <div class="flex items-center space-x-2">
                    <span>🇯🇵</span>
                    <p class="text-sm text-gray-600 dark:text-gray-400">JPY 154,578.00</p>
                </div>
                <button class="mt-3 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                    Add new
                </button>
            </div>        
        </div>

        <div class="w-full">
            <Suspense>
                <Chart />
            </Suspense>
        </div>

    </div>
</template>
