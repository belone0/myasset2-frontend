<script lang="ts" setup>
import TodoList from '@/components/todo/TodoList.vue';
import Overview from '@/components/dashboard/Overview.vue';
import Conversion from '@/components/currency/Conversion.vue';

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
        <Overview />

        <!-- Card Grid Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <TodoList />

            <Conversion />

            <!-- Currency Card -->
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Nuance currency
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

            <!-- Activities Card -->
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                    Activities
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    See your money flow
                    <span class="font-medium text-green-500 dark:text-green-400">+8%</span>
                    from last month
                </p>
                <div class="mt-4 h-32 bg-gray-100 dark:bg-gray-700
                 rounded flex items-center justify-center">
                    <span class="text-gray-500 dark:text-gray-400">[Chart Here]</span>
                </div>
            </div>

            <!-- Saving Wallet Card -->
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Saving Wallet
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Total Savings: 853,698.00
                </p>
                <div class="grid grid-cols-2 gap-2 text-center text-sm">
                    <div class="bg-gray-50 dark:bg-gray-700 p-2 rounded
                       text-gray-600 dark:text-gray-200">
                        Housing
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 p-2 rounded
                       text-gray-600 dark:text-gray-200">
                        Shopping
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 p-2 rounded
                       text-gray-600 dark:text-gray-200">
                        Education
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-700 p-2 rounded
                       text-gray-600 dark:text-gray-200">
                        Emergency
                    </div>
                </div>
                <button class="mt-3 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                    Add new
                </button>
            </div>
        </div>

    </div>
</template>
