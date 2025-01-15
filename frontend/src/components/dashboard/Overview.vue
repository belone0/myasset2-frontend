<script setup lang="ts">
import { useBalancingStore } from '@/stores/balancing';
import { computed, ref, onMounted } from 'vue';
import formatDate from '@/utils/formatDate';
import router from '@/router';

const store = useBalancingStore();

onMounted(() => {
    store.fetchBalancings();
});

const balancings = computed(() => store.balancings);

const last_balancing = balancings.value[0]

const goToHistory = () => {
    const id = last_balancing.id;
}

const goToNewBalancing = () => {
    router.push('/balancing');
}

</script>

<template>
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row
             md:items-center md:justify-between mb-6">
        <div>
            <div class="text-3xl md:text-4xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                {{ last_balancing?.total_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
                Last balancing: You portfolio was last saved with this value ({{
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