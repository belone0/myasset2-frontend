<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { Pie } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { useBalancingStore } from '@/stores/balancing';
import type { Balancing } from '@/types/Balancing';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

/**
 * The component props:
 * - balancing: an optional Balancing object (could be null or undefined).
 * - mode: either "current" or "updated", controlling which value we chart.
 */
const props = defineProps<{
    balancing?: Balancing | null;
    mode: 'current' | 'updated';
}>();

// We'll store the final balancing used for the chart (either from prop or from store)
const finalBalancing = ref<Balancing | null>(null);

// Access store if we need to self-fetch
const store = useBalancingStore();

// A simple color palette to assign each asset a color in the Pie chart
const colorPalette = [
    '#F87171', // red-400
    '#FBBF24', // yellow-400
    '#34D399', // green-400
    '#60A5FA', // blue-400
    '#A78BFA', // purple-400
    '#F472B6', // pink-400
    '#10B981', // green-500
    '#6366F1', // indigo-500
    '#F59E0B', // amber-500
    '#EC4899'  // pink-500
];

/**
 * onMounted:
 *  - If props.balancing is given (non-null), use it directly.
 *  - Otherwise, fetch data from the store and pick the last balancing.
 */
onMounted(async () => {
    // No balancing provided => self-fetch
    await store.fetchBalancings();

    // Pick last from store if any
    if (store.balancings.length > 0) {
        finalBalancing.value = store.balancings[store.balancings.length - 1];
    } else {
        finalBalancing.value = null; // no data found
    }
});

/**
 * Build chart data based on finalBalancing and mode.
 */
const chartData = computed(() => {
    const bal = finalBalancing.value;
    if (!bal) {
        // No data if there's no final balancing
        return { labels: [], datasets: [] };
    }

    // Grab asset labels
    const assetTypes = bal.balancing_assets.map(a => a.asset_type);

    // Depending on the mode, use current_value or updated_value
    const dataValues = bal.balancing_assets.map(a =>
        props.mode === 'current' ? a.current_value : a.updated_value
    );

    // Build a color array for each asset
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

/** Capitalize the mode prop for display purposes */
const capitalizedMode = computed(() => {
    return props.mode.charAt(0).toUpperCase() + props.mode.slice(1);
});
</script>

<template>
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <!-- If finalBalancing is null => no data found -->
        <div v-if="!finalBalancing">
            <p class="text-gray-800 dark:text-gray-100">
                No balancing data available.
            </p>
        </div>
        <!-- Otherwise, show the Pie chart -->
        <div v-else>
            <h1 class="text-center font-bold mb-2">{{ capitalizedMode + ' Position' }}</h1>
            <Pie :data="chartData" />
        </div>
    </div>
</template>
