import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/login.vue'
import Home from '@/views/Home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
