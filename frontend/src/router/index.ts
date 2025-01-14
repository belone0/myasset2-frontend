import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/RegisterView.vue'),
    },
    {
      path: '/',
      name: 'Main',
      component: () => import('../components/layout/Layout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('../views/Dashboard.vue'),
        },
        {
          path: 'todo',
          name: 'Todo',
          component: () => import('../views/TodoView.vue'),
        },
        {
          path: 'balancing',
          name: 'Balancing',
          component: () => import('../views/balancing/Balancing.vue'),
        },
        {
          path: '/balancing-history',
          name: 'BalancingHistory',
          component: () => import('../views/balancing/BalancingHistory.vue'), 
        }
        
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const authenticated = authStore.isLoggedIn;  

  if ((to.name !== 'Login' && to.name !== 'Register') && !authenticated) {
    next({ name: 'Login' });
    return;
  }
  next();
});

export default router
