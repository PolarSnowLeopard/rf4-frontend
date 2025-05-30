import { createRouter, createWebHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import FishManueList from '@/views/FishManueList.vue'
import FishDetailView from '@/views/FishDetailView.vue'

const routes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/manue/fish',
        name: 'manueFish',
        component: FishManueList
      },
      {
        path: '/manue/fish/:name',
        name: 'manueFishDetail',
        component: FishDetailView,
        props: true
      },
      {
        path: '/user/login',
        name: 'userLogin',
        component: () => import('@/views/user/UserLogin.vue')
      },
      {
        path: '/agent',
        name: 'agent',
        component: () => import('@/views/Agent.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 