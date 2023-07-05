import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Search from '../views/Search.vue'


const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/invest',
    name: 'invest',
    component: () => import('../views/Invest.vue')
  },
  {
    path: '/chat/:friend',
    name: 'chat',
    component: () => import('../views/Chat.vue'),
    props: true,
  },
  {
    path: '/state',
    name: 'state',
    component: () => import('../components/State.vue')
  },
  {
    path: '/QA',
    name: 'QA',
    component: () => import('../views/Forum.vue')
  },
  {
    path: '/poll',
    name: 'poll',
    component: () => import('../components/Poll.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
