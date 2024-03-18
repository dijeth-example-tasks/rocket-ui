import { createRouter, createWebHistory } from 'vue-router'
import LeadsView from '../views/LeadsView.vue'

export const routes = [
  {
    path: '/',
    name: 'index',
    redirect: { name: 'leads' },
  },
  {
    path: '/managers',
    name: 'managers',
    component: () => import('../views/ManagersView.vue'),
  },
  {
    path: '/leads',
    name: 'leads',
    component: LeadsView,
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
