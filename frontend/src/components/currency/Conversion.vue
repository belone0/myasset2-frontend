<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const toCurrency = ref<'BRL' | 'USD'>('BRL');
const fromCurrency = ref<'BRL' | 'USD'>('USD');

const fromAmount = ref<number>(0);

const exchangeRate = ref<number>(1);

onMounted(fetchRate);

async function fetchRate() {
    try {
        const response = await fetch('https://economia.awesomeapi.com.br/json/last/usd');
        const data = await response.json();
        // data.USDBRL.bid is a string like "6.05" – convert to number
        exchangeRate.value = parseFloat(data.USDBRL.bid);
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
    }
}

function toggleCurrencies() {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
}

const toAmount = computed(() => {
    if (fromAmount.value === 0) {
        return '0.00';
    }

    if (fromCurrency.value === 'BRL') {
        return (fromAmount.value / exchangeRate.value).toFixed(2);
    }

    return (fromAmount.value * exchangeRate.value).toFixed(2);

});
</script>

<template>
    <div class="p-4 max-w-xs rounded-md dark:bg-gray-800 bg-white">
        <h1 class="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {{ fromCurrency }} → {{ toCurrency }} Converter
        </h1>

        <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Amount in {{ fromCurrency }}
        </label>
        <input min="0" v-model.number="fromAmount" type="number" class="w-full p-1 text-sm rounded
             dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-800
             focus:ring-blue-500 focus:border-blue-500 mb-2" />

        <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <strong>{{ toCurrency }}:</strong> {{ toAmount }}
        </p>

        <button @click="toggleCurrencies" class="inline-flex items-center px-2 py-1
             text-xs font-medium rounded border text-white bg-purple-600
             hover:bg-purple-700 focus:ring-purple-500 focus:border-purple-500">
            Swap
        </button>

        <p class="mt-2 text-xs text-gray-500">
            1 USD = {{ exchangeRate.toFixed(4) }} BRL
        </p>
    </div>
</template>
