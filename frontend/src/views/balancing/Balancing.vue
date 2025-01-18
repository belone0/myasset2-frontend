<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // If using Vue Router
import { useBalancingStore } from '@/stores/balancing';
import type { BalancingAsset as LocalAsset } from '@/types/BalancingAsset';
import Conversion from '@/components/currency/Conversion.vue';

const store = useBalancingStore();
const router = useRouter();

const showCurrencyModal = ref<boolean>(false);

const cleanAsset = {
    asset_type: '',
    current_value: 0,
    current_percentage: 0,
    desired_percentage: 0,
    updated_value: 0,
};

const totalValue = ref<number>(0);
const assets = ref<LocalAsset[]>([cleanAsset]);

function recalculate(asset: LocalAsset) {
    totalValue.value = assets.value.reduce((sum, a) => sum + a.current_value, 0);

    const tv = totalValue.value || 0;
    asset.current_percentage = tv > 0 ? (asset.current_value / tv) * 100 : 0;
    asset.updated_value = (asset.desired_percentage / 100) * tv;
}

function recalculateAll() {
    for (const asset of assets.value) {
        recalculate(asset);
    }
}

function addAsset() {
    assets.value.push(cleanAsset);
}

function removeAsset(index: number) {
    assets.value.splice(index, 1);
}

async function saveBalancing() {
    const createdBal = await store.createBalancingWithAssets(
        totalValue.value,
        assets.value
    );

    if (!createdBal) {
        return;
    }

    totalValue.value = 0;
    assets.value = [cleanAsset];
}

function goToHistory() {
    router.push({ name: 'BalancingHistory' });
}

function toggleCurrencyModal() {
    showCurrencyModal.value = !showCurrencyModal.value;
}
</script>

<template>
    <div class="min-h-screen p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 w-full">
        <div class="flex items-center gap-8 justify-between mb-4">
            <div>
                <h1 class="text-xl sm:text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                    Balancing
                </h1>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Welcome to balancing! Add different asset types and values to balance your portfolio.
                </p>
            </div>

            <div class="flex flex-wrap gap-2">
                <button
                    class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 text-sm rounded mt-2 sm:mt-0 flex items-center"
                    @click="toggleCurrencyModal">
                    Convert
                </button>
                <button
                    class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 text-sm rounded mt-2 sm:mt-0 flex items-center"
                    @click="goToHistory">
                    History
                </button>
            </div>
        </div>

        <div class="mb-4 w-52">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Total Value
            </label>
            <div class="text-base font-medium text-gray-800 dark:text-gray-100 
               border dark:border-gray-700 rounded-md p-2
               bg-white dark:bg-gray-800">
                {{ totalValue }}
            </div>
        </div>

        <h2 class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Assets
        </h2>

        <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            <div v-for="(asset, index) in assets" :key="index" class="p-3  dark:border-gray-700 
                       rounded-md shadow-sm dark:bg-gray-800 bg-white">
                <div class="mb-2">
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Asset Type
                    </label>
                    <input v-model="asset.asset_type" type="text" class="w-full p-3 text-sm rounded  
                               dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100  
                               bg-gray-50 text-gray-800
                               focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div class="mb-2">
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Current Value
                    </label>
                    <input v-model.number="asset.current_value" type="number" @input="recalculateAll" class="w-full p-3 text-sm rounded  
                               dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 
                               bg-gray-50 text-gray-800
                               focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div class="mb-2">
                    <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Desired %
                    </label>
                    <input v-model.number="asset.desired_percentage" type="number" @input="recalculateAll" class="w-full p-3 text-sm rounded  
                               dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 
                               bg-gray-50 text-gray-800
                               focus:ring-blue-500 focus:border-blue-500" />
                </div>

                <div class="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p>
                        <strong>Current %:</strong>
                        {{ asset.current_percentage.toFixed(2) }}%
                    </p>
                    <p>
                        <strong>Updated Value:</strong>
                        {{ asset.updated_value.toFixed(2) }}
                    </p>
                </div>

                <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 
                           rounded text-xs mt-3" @click="removeAsset(index)">
                    Remove
                </button>
            </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-4">
            <button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 text-sm rounded" @click="addAsset">
                Add another asset
            </button>

            <button class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 text-sm rounded"
                @click="saveBalancing">
                Save
            </button>
        </div>

        <transition name="fade">
            <div v-if="showCurrencyModal" class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black bg-opacity-50" @click="toggleCurrencyModal"></div>

                <div class="relative bg-white dark:bg-gray-800 p-4 w-full max-w-md mx-2 rounded shadow-lg z-50">

                    <Conversion />

                    <div class="flex justify-end gap-2">
                        <button type="button" class="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 text-sm rounded"
                            @click="toggleCurrencyModal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
