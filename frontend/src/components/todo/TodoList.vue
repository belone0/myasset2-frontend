<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();


onMounted(() => {
    todoStore.fetchTodos();
});

const todos = computed(() => todoStore.todos);
const loading = computed(() => todoStore.loading);
const error = computed(() => todoStore.error);

const toggleTodo = (todo: any) => {
    todoStore.toggleTodo(todo);
};

const deleteTodo = (id: number) => {
    todoStore.deleteTodo(id);
};

</script>

<template>
    <div class="p-4 w-full overflow-auto bg-white dark:bg-gray-800 rounded-lg  mb-6">

        <div class="flex justify-between">
            <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                Todos
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    See your todo list
                </p>
            </h1>
            <span class="text-center align-middle">
                <router-link to="/todo" class="text-purple-600 dark:text-purple-400 hover:underline">
                    View All </router-link>
            </span>
        </div>


        <!-- Todo List Container -->
        <div class="space-y-2">
            <!-- Loading or error states -->
            <div v-if="loading" class="text-gray-700 dark:text-gray-300">
                Loading todos...
            </div>
            <div v-else-if="error" class="text-red-500">
                {{ error }}
            </div>

            <!-- List of Todos -->
            <div v-for="todo in todos" :key="todo.id" class="rounded-lg shadow-sm p-1
               bg-white dark:bg-gray-800
               text-gray-800 dark:text-gray-100
               flex items-center justify-between
               transition-colors w-full">
                <!-- Left: Checkbox + Title -->
                <div class="flex items-center space-x-3  w-full">
                    <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo)" class="cursor-pointer h-5 w-5 accent-purple-600
                   dark:bg-gray-700 dark:border-gray-600
                   focus:ring-2 focus:ring-purple-500" />
                    <div class="flex justify-between w-full">
                        <span :class="todo.done ? 'line-through text-gray-500 dark:text-gray-400' : ''">
                            {{ todo.name }}
                        </span>
                        <i class="pi-trash pi hover:text-red-500 hover:cursor-pointer" @click="deleteTodo(todo.id)"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.line-through {
    text-decoration: line-through;
}
</style>
