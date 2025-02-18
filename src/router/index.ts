import { createRouter, createWebHistory } from 'vue-router'
import DataForgeGenView from '../views/DataForgeGenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
        icon: '../assets/logo-black.svg'
      },
      component: DataForgeGenView,
    },
  ],
})

export default router
