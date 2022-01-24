import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/login.vue'
import Home from '@/views/Home/home.vue'
import Main from '@/views/Main/Main.vue'
import User from '@/views/User/user.vue'
import Search from '@/views/Search/search.vue'
import Result from '@/views/SearchResult/searchResult.vue'

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
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/result/:value',
    name: 'result',
    component: Result,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
