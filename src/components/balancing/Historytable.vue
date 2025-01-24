<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBalancingStore } from '@/stores/balancing';
import formatDate from '@/utils/formatDate';

const store = useBalancingStore();
const router = useRouter();

onMounted(() => {
    store.fetchBalancings();
});

const balancings = computed(() => store.balancings);

// -------------------- Pagination Setup --------------------
const currentPage = ref(1);
const perPage = ref(10); // Items per page

// Calculate total pages based on how many balancings
const totalPages = computed(() => {
    return Math.ceil(balancings.value.length / perPage.value);
});

const paginatedBalancings = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return balancings.value.slice(start, end);
});

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
    }
}

// -------------------- Formatters --------------------
function getAssetsDetails(balancing: any) {
    return balancing.balancing_assets
        .map((asset: any) => asset.asset_type)
        .join(', ');
}

function goToBalancingDetail(id: number) {
    router.push({ name: 'BalancingResults', params: { id: id } });
}

function deleteBalancing(id: number) {
    store.deleteBalancing(id);
    alert(store.error ? store.error : 'Sucessfully deleted balancing')
}
</script>
<template>
    <!-- Table Container -->
    <div v-if="balancings && balancings.length" class="overflow-x-auto bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg">
        <table class="w-full border-collapse text-left">
            <!-- Table Head with purple accent -->
            <thead class="bg-white text-gray-800 dark:text-white dark:bg-gray-800 ">
                <tr>
                    <th class="px-4 py-2 whitespace-nowrap">Date</th>
                    <th class="px-4 py-2 whitespace-nowrap">Total Value</th>
                    <th class="px-4 py-2 whitespace-nowrap">Assets</th>
                    <th class="px-4 py-2 whitespace-nowrap">Actions</th>
                </tr>
            </thead>

            <!-- Table Body -->
            <tbody>
                <tr v-for="balancing in paginatedBalancings" :key="balancing.id"
                    class=" hover:bg-gray-50 dark:hover:bg-gray-700">
                    <!-- Date -->
                    <td class="px-4 py-2 text-gray-800 dark:text-gray-100 whitespace-nowrap">
                        {{ formatDate(String(balancing.created_at)) }}
                    </td>

                    <!-- Total Value -->
                    <td class="px-4 py-2 text-gray-800 dark:text-gray-100 whitespace-nowrap">
                    {{ Number(balancing.total_value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                    </td>

                    <!-- Assets -->
                    <td class="px-4 py-2 text-gray-800 dark:text-gray-100 whitespace-nowrap">
                        {{ getAssetsDetails(balancing) }}
                    </td>

                    <!-- View Details Button -->
                    <td class="px-4 py-2 whitespace-nowrap gap-4 flex items-center">
                        <button
                            class="border border-purple-600 text-gray-800 dark:text-white px-3 py-1 rounded text-sm hover:bg-purple-600 hover:text-white"
                            @click="goToBalancingDetail(balancing.id)">
                            View
                        </button>
                        <i class="pi-trash pi hover:cursor-pointer text-gray-800 dark:text-white  hover:text-red-500 hover:text-red-500"
                            @click="deleteBalancing(balancing.id)"></i>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1"
            class="mt-4 flex flex-col sm:flex-row items-center justify-between p-3 bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-600">
            <!-- Page Info -->
            <div class="text-gray-800 dark:text-gray-100 mb-2 sm:mb-0">
                Page {{ currentPage }} of {{ totalPages }}
            </div>

            <div class="flex items-center space-x-2">
                <!-- Previous Button -->
                <button
                    class="border border-purple-600 text-gray-800 dark:text-white px-3 py-1 rounded text-sm hover:bg-purple-600 hover:text-white disabled:opacity-50"
                    :disabled="currentPage === 1" @click="prevPage">
                    Previous
                </button>

                <!-- Page Numbers (Optional) -->
                <div class="space-x-1">
                    <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
                        'px-3 py-1 rounded text-sm border',
                        currentPage === page
                            ? 'border-purple-700 bg-purple-700 text-white'
                            : 'border-purple-600 text-gray-800 dark:text-white hover:bg-purple-200 dark:hover:bg-purple-700'
                    ]">
                        {{ page }}
                    </button>
                </div>

                <!-- Next Button -->
                <button
                    class="border border-purple-600 text-gray-800 dark:text-white px-3 py-1 rounded text-sm hover:bg-purple-600 hover:text-white disabled:opacity-50"
                    :disabled="currentPage === totalPages" @click="nextPage">
                    Next
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <h1 class="text-2xl text-gray-800 dark:text-white">
            You don't have any balancing yet! Create one to see it here.
        </h1>
    </div>

</template>