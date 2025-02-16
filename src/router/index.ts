import { createRouter, createWebHistory } from 'vue-router'
import DataForgeGenView from '../views/DataForgeGenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DataForgeGenView,
    },
  ],
})

export default router
