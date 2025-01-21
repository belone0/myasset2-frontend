// stores/todo.ts
import { fetchTodos, createTodo, deleteTodo, toggleTodo } from '@/services/todoService';
import { defineStore } from 'pinia';
import type { Todo } from '@/types/Todo';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [] as Todo[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchTodos() {
            this.loading = true;
            this.error = null;
            try {
                const fetched_todos = await fetchTodos();
                this.todos = fetched_todos;
            } catch (err: any) {
                console.error('Fetch Todos Error:', err);
                this.error = 'Failed to load todos';
            } finally {
                this.loading = false;
            }
        },
        async createTodo(title: string) {
            try {
                const created_todo = await createTodo(title);
                this.todos.push(created_todo);

                toast.success('Todo created successfully');
            } catch (err: any) {
                toast.error('Error creating todo');
                console.error('Create Todo Error:', err);
                this.error = 'Failed to create todo';
            }
        },
        async toggleTodo(todo: Todo) {
            try {
                const toggled_todo = await toggleTodo(todo);

                const index = this.todos.findIndex((t) => t.id === todo.id);
                if (index !== -1) { this.todos[index] = toggled_todo }
            } catch (err: any) {
                console.error('Toggle Todo Error:', err);
                this.error = 'Failed to update todo';
            }
        },
        async deleteTodo(todoId: number) {
            try {
                await deleteTodo(todoId);
                this.todos = this.todos.filter((t) => t.id !== todoId);
                toast.info('Todo deleted successfully');
            } catch (err: any) {
                toast.error('Error deleting todo');
                console.error('Delete Todo Error:', err);
                this.error = 'Failed to delete todo';
            }
        },
    },
});
