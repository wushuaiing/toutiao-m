import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/login.vue'
import Home from '@/views/Home/home.vue'
import Main from '@/views/Main/Main.vue'
import User from '@/views/User/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '', name: 'home', component: Home },
      { path: '/user', name: 'user', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
