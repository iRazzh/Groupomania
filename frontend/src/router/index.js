import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue'
import Signup from '@/views/Signup.vue'

const routes = [
  // Route page d'accueil
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  // Route inscription
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  
  // Redirection page d'accueil si aucune page trouvée
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
