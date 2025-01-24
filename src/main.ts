import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(createPinia())

const authStore = useAuthStore();
await authStore.fetchCurrentUser();

const themeStore = useThemeStore();
themeStore.initializeTheme();

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.use(Toast, { timeout: 3000 });

app.use(router)

app.mount('#app')
