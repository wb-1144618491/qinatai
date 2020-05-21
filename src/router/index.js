import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Index from '../views/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'index',
    component: Index
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  let token = Vue.localStorage.get('token')
  if (token) {
    next()
  } else if (to.path != '/login') {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})

export default router
