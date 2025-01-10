<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleSubmit = () => {
    authStore.login(email.value, password.value);
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="login-form">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" placeholder="Enter your email" required />

        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" placeholder="Enter your password" required />

        <button type="submit">Login</button>
    </form>
</template>

<style scoped>
.login-form {
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 10px;
}

.login-form input,
.login-form button {
    padding: 10px;
    font-size: 16px;
}

.login-form button {
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

.login-form button:hover {
    background-color: #0056b3;
}
</style>