<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';

const user = useAuthStore().getUser;


</script>

<template>
    <div class="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
        <!-- Page Heading -->
        <div class="mb-6">
            <h1 class="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">Dashboard</h1>
            <p class="text-gray-600 dark:text-gray-400">
                Here’s your overview dashboard for this month
            </p>
        </div>

        <!-- Large Overview Row -->
        <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
                <div class="text-3xl md:text-4xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                    $1025,254.00
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    Last transaction: You earned $205.98 from James < 2 mins ago </div>
                </div>
                <div class="mt-4 md:mt-0 flex space-x-2">
                    <button class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors">
                        Move Money
                    </button>
                    <button
                        class="bg-transparent border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-800 dark:text-gray-200 py-2 px-4 rounded transition-colors">
                        Request
                    </button>
                    <button class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors">
                        Transfer
                    </button>
                </div>
            </div>

            <!-- Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Currency Card -->
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Nuance currency</h2>
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
                        <span class="font-medium text-green-500 dark:text-green-400">+8%</span> from last month
                    </p>
                    <div class="mt-4 h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span class="text-gray-500 dark:text-gray-400">[Chart Here]</span>
                    </div>
                </div>

                <!-- Saving Wallet -->
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg space-y-2">
                    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Saving Wallet</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400">Total Savings: 853,698.00</p>
                    <div class="grid grid-cols-2 gap-2 text-center text-sm">
                        <div class="bg-gray-50 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-200">
                            Housing
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-200">
                            Shopping
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-200">
                            Education
                        </div>
                        <div class="bg-gray-50 dark:bg-gray-700 p-2 rounded text-gray-600 dark:text-gray-200">
                            Emergency
                        </div>
                    </div>
                    <button class="mt-3 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                        Add new
                    </button>
                </div>
            </div>

            <!-- Another Row (Recent Transactions, Additional Card) -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Recent Transaction -->
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                        Recent Transactions
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        See your transaction history this month
                    </p>
                    <ul class="space-y-2">
                        <li class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
                            <span>Income: Salary</span>
                            <span class="text-green-500 dark:text-green-400">+ $1,500.00</span>
                        </li>
                        <li class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
                            <span>Expense: Groceries</span>
                            <span class="text-red-500 dark:text-red-400">- $200.00</span>
                        </li>
                        <li class="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
                            <span>Expense: Rent</span>
                            <span class="text-red-500 dark:text-red-400">- $800.00</span>
                        </li>
                    </ul>
                </div>

                <!-- Additional Card -->
                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Other Metrics
                    </h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Analyze additional data...
                    </p>
                    <div class="mt-4 h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span class="text-gray-500 dark:text-gray-400">[Chart/Table Here]</span>
                    </div>
                </div>
            </div>
        </div>
</template>
