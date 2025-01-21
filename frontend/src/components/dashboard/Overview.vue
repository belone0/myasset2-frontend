<script setup lang="ts">
import { useBalancingStore } from '@/stores/balancing';
import { computed, ref, onMounted } from 'vue';
import formatDate from '@/utils/formatDate';
import router from '@/router';
import type { Balancing } from '@/types/Balancing';

const store = useBalancingStore();
await store.fetchBalancings();

const last_balancing = store.getBalancings[0];

const value_to_display = Number(last_balancing.total_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })


const goToHistory = () => {
    const id = last_balancing.id;
    router.push({ name: 'BalancingResults', params: { id: id } })
}

const goToNewBalancing = () => {
    router.push({name: 'Balancing'});
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row
             md:items-center md:justify-between mb-6">
        <div>
            <div class="text-3xl md:text-4xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                {{ value_to_display }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
                Last balancing total value ({{
                    formatDate(String(last_balancing?.created_at)) }}) </div>
        </div>
        <div class="mt-4 md:mt-0 flex space-x-2">
            <button class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4
                 rounded transition-colors" @click="goToHistory()">
                Balancing details
            </button>
            <button class="bg-transparent border border-gray-300 dark:border-gray-600
                 hover:border-gray-400 dark:hover:border-gray-500
                 text-gray-800 dark:text-gray-200 py-2 px-4 rounded
                 transition-colors" @click="goToNewBalancing()">
                New Balancing
            </button>


        </div>
    </div>
</template>