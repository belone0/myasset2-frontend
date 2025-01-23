<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { useBalancingStore } from '@/stores/balancing';
import { onMounted, ref } from 'vue';
import type { Balancing } from '@/types/Balancing';
import formatDate from '@/utils/formatDate';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

const store = useBalancingStore();

await store.fetchBalancings();

const balancings = store.getBalancings;

let values = balancings.map(b => (b as Balancing).total_value);

const labels = balancings
    .map(b => (b as Balancing).created_at)
    .filter(Boolean)
    .map(date => formatDate(date as string))
    .reverse();

values = values.reverse();

const chartData = ref({
    labels: labels,
    datasets: [
        {
            label: 'Portfolio value over time (based on history)',
            backgroundColor: 'rgb(147, 51, 234)',
            borderColor: 'rgb(147, 51, 234)',
            data: values,
            // tension: 0,
            color: '#fffff',

        }
    ],
    options: {
        plugins: {
            legend: {
                labels: {
                    color: '#ff0000',
                }
            }
        }
    }
});

</script>
<template>
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
        <Line :data="chartData" />
    </div>
</template>