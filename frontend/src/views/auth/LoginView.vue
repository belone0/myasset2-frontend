<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<template>
    <div class="login-view">
        <h1>Login</h1>
        <LoginForm />
    </div>
</template>

<style scoped>
.login-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>