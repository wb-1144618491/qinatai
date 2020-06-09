import Vue from 'vue'
import VueRouter from 'vue-router'
// 登录页
import Login from '../views/login.vue'
//首页
import Index from '../views/index.vue'

/* 权限管理 */
import Limit from '../views/Limit.vue'
import LimitAdd from '../views/LimitAdd.vue'
/* 角色管理 */
import Role from '../views/Role.vue'
import RoleAdd from '../views/RoleAdd.vue'
/* 用户管理*/
import User from '../views/User.vue'
import UserAdd from '../views/UserAdd.vue'
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
    component: Index,
    children: [
      // 权限管理路由
      {
        path: 'Limit',
        name: 'Limit',
        component: Limit
      },
      {
        path: 'LimitAdd',
        name: 'LimitAdd',
        component: LimitAdd
      },
      // 角色管理路由
      {
        path: 'Role',
        name: 'Role',
        component: Role
      },
      {
        path: 'RoleAdd',
        name: 'RoleAdd',
        component: RoleAdd
      },
      // 用户管理路由
      {
        path: 'User',
        name: 'User',
        component: User
      },
      {
        path: 'UserAdd',
        name: 'UserAdd',
        component: UserAdd
      }
    ]
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
