<script lang="ts" setup>
import TodoList from '@/components/todo/TodoList.vue';
import Overview from '@/components/dashboard/Overview.vue';
import Conversion from '@/components/currency/Conversion.vue';
import Chart from '@/components/balancing/Linechart.vue';
import Piechart from '@/components/balancing/Piechart.vue';


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
            <Piechart />
        </div>

        <div class="w-full">
            <Suspense>
                <Chart />
            </Suspense>
        </div>

    </div>
</template>
