import type { Todo } from '@/types/Todo';
import apiClient from '@/utils/axios';

export const fetchTodos = async () => {
    const response = await apiClient.get('/todos');

    return response.data;
};

export const createTodo = async (name: string) => {
    const response = await apiClient.post('/todos', { name });

    return response.data;
}

export const toggleTodo = async (todo: Todo) => {
    const response = await apiClient.patch(`/todos/${todo.id}`, { done: !todo.done });
    return response.data;
};

export const deleteTodo = async (todoId: number) => {
    const response = await apiClient.delete(`/todos/${todoId}`);
    return response.data;
};
