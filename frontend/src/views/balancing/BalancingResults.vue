<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBalancingStore } from '@/stores/balancing';
import type { Balancing } from '@/types/Balancing';
import Piechart from '@/components/balancing/Piechart.vue';

interface ResultRow {
    asset_type: string;
    current_value: number;
    current_percentage: number;
    updated_value: number;
    desired_percentage: number;
    difference: number;
    action: 'Buy' | 'Sell' | 'Hold';
    amount: number;
}

const route = useRoute();
const store = useBalancingStore();

const balancing = ref<Balancing | null>(null);

const loading = ref(true);

const results = ref<ResultRow[]>([]);

const totalCurrentValue = computed(() =>
    results.value.reduce((sum, row) => sum + Number(row.current_value), 0)
);

function formatDate(dateString: string | Date) {
    return new Date(dateString).toLocaleString();
}


onMounted(async () => {
    loading.value = true;

    const balancingId = Number(route.params.id);

    const foundBal = await store.fetchBalancingById(balancingId);

    if (!foundBal) {
        loading.value = false;
        return;
    }

    balancing.value = foundBal;


    const rows = foundBal.balancing_assets.map((asset: any) => {
        const diff = asset.updated_value - asset.current_value;
        let action: 'Buy' | 'Sell' | 'Hold' = 'Hold';
        if (diff > 0) action = 'Buy';
        if (diff < 0) action = 'Sell';

        return {
            asset_type: asset.asset_type,
            current_value: asset.current_value,
            current_percentage: asset.current_percentage,
            updated_value: asset.updated_value,
            desired_percentage: asset.desired_percentage,
            difference: diff,
            action,
            amount: Math.abs(diff),
        } as ResultRow;
    });

    results.value = rows;
    loading.value = false;
});
</script>

<template>
    <div class="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div class="mb-4">
            <h1 class="text-2xl font-bold">
                Balancing Results
                <span v-if="balancing && balancing.created_at" class="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({{ formatDate(balancing.created_at) }})
                </span>
            </h1>
            <p class="text-sm mt-2 text-gray-600 dark:text-gray-400">
                Compare your current vs. desired distribution. Follow the recommended actions.
            </p>
        </div>

        <div v-if="loading" class="text-lg">
            Loading...
        </div>

        <!-- Main Content -->
        <div v-else>

            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="flex flex-col py-4 rounded-lg ">
                    <span class="text-gray-700 dark:text-gray-300">Total Current Value:</span>
                    <p class="text-gray-800 dark:text-gray-100 text-2xl font-bold">
                        {{ totalCurrentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </p>
                </div>
            </div>

            <div class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 px-6">
                <table class="w-full border-collapse text-left">

                    <thead class="border-b border-gray-300 dark:border-gray-700">
                        <tr class="text-sm text-gray-600 dark:text-gray-300">
                            <th class="pb-3">Asset</th>
                            <th class="pb-3">Current</th>
                            <th class="pb-3">Desired</th>
                            <th class="pb-3">Action</th>
                            <th class="pb-3">Amount (R$)</th>
                        </tr>
                    </thead>

                    <tbody class="text-sm">
                        <tr v-for="(row, index) in results" :key="index" class="border-b border-gray-200 dark:border-gray-700 
                     ">
                            <!-- Asset name -->
                            <td class="py-3 pr-2 whitespace-nowrap">
                                <div class="font-semibold text-gray-800 dark:text-gray-100">
                                    {{ row.asset_type }}
                                </div>
                            </td>

                            <!-- Current (R$ + %) -->
                            <td class="py-3 pr-2 whitespace-nowrap">
                                <div class="text-gray-800 dark:text-gray-100">
                                    {{ Number(row.current_value).toLocaleString('pt-BR', {
                                        style: 'currency', currency:
                                            'BRL'
                                    })
                                    }}
                                </div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                    ({{ row.current_percentage }}%)
                                </div>
                            </td>

                            <!-- Desired (R$ + %) -->
                            <td class="py-3 pr-2 whitespace-nowrap">
                                <div class="text-gray-800 dark:text-gray-100">
                                    {{ Number(row.updated_value).toLocaleString('pt-BR', {
                                        style: 'currency', currency:
                                            'BRL'
                                    })
                                    }}
                                </div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                    ({{ row.desired_percentage }}%)
                                </div>
                            </td>

                            <!-- Action (icon + label) -->
                            <td class="py-3 pr-2 whitespace-nowrap">
                                <div class="inline-flex items-center gap-1 font-semibold" :class="{
                                    'text-green-600 dark:text-green-400': row.action === 'Buy',
                                    'text-red-600 dark:text-red-400': row.action === 'Sell',
                                    'text-gray-700 dark:text-gray-200': row.action === 'Hold'
                                }">
                                    <template v-if="row.action === 'Buy'">
                                        <i class="pi pi-plus-circle"></i>
                                        <span>Buy</span>
                                    </template>
                                    <template v-else-if="row.action === 'Sell'">
                                        <i class="pi pi-minus-circle"></i>
                                        <span>Sell</span>
                                    </template>
                                    <template v-else>
                                        <i class="pi pi-check-circle"></i>
                                        <span>Hold</span>
                                    </template>
                                </div>
                            </td>

                            <td class="py-3 pr-2 whitespace-nowrap">
                                <div class="text-gray-800 dark:text-gray-100 font-medium">
                                    {{ Number(row.amount).toLocaleString('pt-BR', {
                                        style: 'currency', currency: 'BRL'
                                    }) }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex mt-6 gap-6">
                <div >
                    <Piechart :mode="'current'" />
                </div>
                <div >
                    <Piechart :mode="'updated'" />
                </div>

            </div>
        </div>
    </div>
</template>
