<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBalancingStore } from '@/stores/balancing';
import formatDate from '@/utils/formatDate';

// Access the Balancing store
const store = useBalancingStore();
const router = useRouter();

// Fetch balancings on mount
onMounted(() => {
    store.fetchBalancings();
});

// All balancings (unpaginated)
const balancings = computed(() => store.balancings);

// -------------------- Pagination Setup --------------------
const currentPage = ref(1);
const perPage = ref(5); // Items per page

// Calculate total pages based on how many balancings
const totalPages = computed(() => {
    return Math.ceil(balancings.value.length / perPage.value);
});

// Slice the balancings array based on currentPage & perPage
const paginatedBalancings = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return balancings.value.slice(start, end);
});

// Go to previous page
function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

// Go to next page
function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

// Optional: If we want a jump to page
function goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
    }
}

// -------------------- Formatters --------------------
function getAssetsDetails(balancing: any) {
    // Join asset types as a comma-separated string
    return balancing.balancing_assets
        .map((asset: any) => asset.asset_type)
        .join(', ');
}

function goToBalancingDetail(id: number) {
    router.push({ name: 'BalancingDetails', params: { id } });
}
</script>

<template>
    <div class="min-h-screen p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
        <!-- Title -->
        <h1 class="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            Balancing History
        </h1>

        <!-- Table Container -->
        <div class="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded">
            <table class="w-full border-collapse text-left">
                <!-- Table Head with purple accent -->
                <thead class="bg-purple-600 text-white dark:bg-purple-700">
                    <tr>
                        <th class="px-4 py-2 whitespace-nowrap">Date</th>
                        <th class="px-4 py-2 whitespace-nowrap">Total Value</th>
                        <th class="px-4 py-2 whitespace-nowrap">Assets</th>
                        <th class="px-4 py-2 whitespace-nowrap">Details</th>
                    </tr>
                </thead>

                <!-- Table Body -->
                <tbody>
                    <tr v-for="balancing in paginatedBalancings" :key="balancing.id"
                        class="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                        <!-- Date -->
                        <td class="px-4 py-2 text-gray-800 dark:text-gray-100 whitespace-nowrap">
                            {{ formatDate(String(balancing.created_at)) }}
                        </td>

                        <!-- Total Value -->
                        <td class="px-4 py-2 text-gray-800 dark:text-gray-100 whitespace-nowrap">
                            {{ Number(balancing.total_value).toFixed(2) }}
                        </td>

                        <!-- Assets -->
                        <td class="px-4 py-2 text-gray-800 dark:text-gray-100 whitespace-nowrap">
                            {{ getAssetsDetails(balancing) }}
                        </td>

                        <!-- View Details Button -->
                        <td class="px-4 py-2 whitespace-nowrap">
                            <button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                                @click="goToBalancingDetail(balancing.id)">
                                View
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination Controls -->
            <div v-if="totalPages > 1"
                class="flex flex-col sm:flex-row items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <!-- Page Info -->
                <div class="text-gray-800 dark:text-gray-100 mb-2 sm:mb-0">
                    Page {{ currentPage }} of {{ totalPages }}
                </div>

                <div class="flex items-center space-x-2">
                    <!-- Previous Button -->
                    <button
                        class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                        :disabled="currentPage === 1" @click="prevPage">
                        Previous
                    </button>

                    <!-- Page Numbers (Optional) -->
                    <div class="space-x-1">
                        <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
                            'px-3 py-1 rounded text-sm',
                            currentPage === page
                                ? 'bg-purple-700 text-white'
                                : 'bg-purple-100 dark:bg-purple-800 text-gray-800 dark:text-gray-100 hover:bg-purple-200 dark:hover:bg-purple-700'
                        ]">
                            {{ page }}
                        </button>
                    </div>

                    <!-- Next Button -->
                    <button
                        class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
                        :disabled="currentPage === totalPages" @click="nextPage">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
