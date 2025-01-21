<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useBalancingStore } from '@/stores/balancing';
import type { Balancing } from '@/types/Balancing';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps<{
    mode: 'current' | 'updated';
}>();

const finalBalancing = ref<Balancing | null>(null);

const store = useBalancingStore();

const colorPalette = [
    '#5B21B6',  // purple-800
    '#A78BFA', // purple-400
    '#818CF8', // indigo-400
    '#6366F1', // indigo-500
    '#7C3AED', // purple-600
    '#4F46E5',  // indigo-600
    '#818CF8', // indigo-400
    '#6366F1', // indigo-500
    '#4F46E5', // indigo-600
    '#4338CA', // indigo-700
    '#3730A3', // indigo-800
    '#312E81', // indigo-900
];

onMounted(async () => {
    await store.fetchBalancings();

    if (store.balancings.length > 0) {
        finalBalancing.value = store.balancings[store.balancings.length - 1];
        return;
    }
    
    finalBalancing.value = null;
    return;
});

const chartData = computed(() => {
    const bal = finalBalancing.value;
    if (!bal) {
        return { labels: [], datasets: [] };
    }

    const assetTypes = bal.balancing_assets ? bal.balancing_assets.map(a => a.asset_type) : [];

    const dataValues = bal.balancing_assets ? bal.balancing_assets.map(a =>
        props.mode === 'current' ? a.current_value : a.updated_value
    ) : [];

    const backgroundColors = assetTypes.map((_, i) => colorPalette[i % colorPalette.length]);

    return {
        labels: assetTypes,
        datasets: [
            {
                label: props.mode === 'current' ? 'Current Distribution' : 'Updated Distribution',
                data: dataValues,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors
            }
        ]
    };
});
</script>

<template>
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div v-if="!finalBalancing">
            <p class="text-gray-800 dark:text-gray-100">
                No balancing data available.
            </p>
        </div>

        <div v-else>
            <h1 class="text-center font-bold dark:text-white text-gray-800">{{ chartData.datasets[0].label ?? 'Position'
                }} </h1>
            <p class="text-center -mt-1 m-0 p-0 text-xs text-gray-500 dark:text-white">Last balancing</p>
            <Doughnut :data="chartData" />
        </div>
    </div>
</template>
