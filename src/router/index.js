import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Control from '../views/control.vue';
import Monitoring from '../views/monitoring.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/control', 
      name: 'control',
      component: Control,
    },
    {
      path: '/monitoring',
      name: 'monitoring',
      component: Monitoring,
    }
  ],
});

export default router;
