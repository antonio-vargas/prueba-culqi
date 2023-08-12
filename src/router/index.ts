import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/panel',
      component: () => import('@/layouts/PanelLayout.vue'),
      children: [
        {
          path: 'empleados',
          name: 'EmployeeView',
          component: () => import('@/views/EmployeeView.vue')
        },
        {
          path: 'reclutamiento',
          name: 'RecruitingView',
          component: () => import('@/views/RecruitingView.vue')
        }
      ]
    },
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated && to.name !== 'LoginView') {
    return { name: 'LoginView' }
  }
  if (authStore.isAuthenticated && to.name === 'LoginView') {
    return { name: 'EmployeeView' }
  }
})

export default router
