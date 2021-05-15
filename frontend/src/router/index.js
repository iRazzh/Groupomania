import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  
  {
    path: "/:catchAll(.*)",
    redirect: { path: "/" }
  }
]

const router = new createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.name)
  console.log(from.name)
  next();
})

export default router
