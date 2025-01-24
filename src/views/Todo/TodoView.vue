<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();

const newTitle = ref('');

onMounted(() => {
    todoStore.fetchTodos();
});

const todos = computed(() => todoStore.todos);
const loading = computed(() => todoStore.loading);
const error = computed(() => todoStore.error);

const addTodo = async () => {
    if (!newTitle.value.trim()) return;
    await todoStore.createTodo(newTitle.value.trim());
    newTitle.value = '';
};

const toggleTodo = (todo: any) => {
    todoStore.toggleTodo(todo);
};

const deleteTodo = (id: number) => {
    todoStore.deleteTodo(id);
};
</script>

<template>
    <div class="min-h-screen p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
        <div class="mb-4">
            <h1 class="text-xl sm:text-2xl font-bold mb-1 text-gray-800 dark:text-gray-100">
                Todo List
            </h1>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Manage your todo list
            </p>
        </div>

        <div class="rounded-lg shadow-sm p-4 mb-6
             bg-white dark:bg-gray-800
             text-gray-800 dark:text-gray-100
             transition-colors">
            <div class="flex items-center justify-between">
                <span class="text-lg font-semibold">Add New Todo</span>
            </div>

            <div class="mt-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <input v-model="newTitle" type="text" placeholder="Enter a new todo..." class="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none
                 focus:ring-2 focus:ring-purple-500 bg-gray-50 dark:bg-gray-700 dark:border-gray-700
                 dark:text-gray-100 dark:focus:ring-purple-500
                 transition-colors" />

                <!-- Add button -->
                <button @click="addTodo" class="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700
                 focus:outline-none focus:ring-2 focus:ring-purple-500
                 transition-colors">
                    Add
                </button>
            </div>
        </div>

        <div class="space-y-4">
            <div v-if="loading" class="text-gray-700 dark:text-gray-300">
                Loading todos...
            </div>
            <div v-else-if="error" class="text-red-500">
                {{ error }}
            </div>

            <div v-for="todo in todos" :key="todo.id" class="rounded-lg shadow-sm p-4
               bg-white dark:bg-gray-800
               text-gray-800 dark:text-gray-100
               flex items-center justify-between
               transition-colors">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo)" class="cursor-pointer h-5 w-5 accent-purple-600
                   dark:bg-gray-700 dark:border-gray-600
                   focus:ring-2 focus:ring-purple-500" />
                    <span :class="todo.done ? 'line-through text-gray-500 dark:text-gray-400' : ''">
                        {{ todo.name }}
                    </span>
                </div>
                <i class="pi-trash pi hover:text-red-500 hover:cursor-pointer" @click="deleteTodo(todo.id)"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-through {
    text-decoration: line-through;
}
</style>
