import Vue from 'vue'
import VueRouter from 'vue-router'
import Chats from '../views/Chats.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Chats',
    component: Chats
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
