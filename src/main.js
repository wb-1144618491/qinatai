import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// ElementUI 插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入初始化css样式
import '@/assets/css/unit.css'
// 缓存
import VueLocalStorage from 'vue-localstorage'
// axios 插件
import vueAxios from 'vue-axios'
import axios from 'axios'

// axios拦截器
import interceptor from '@/plugins/interceptors.js'

Vue.use(VueLocalStorage)
Vue.use(vueAxios, axios)
Vue.use(interceptor, router)
Vue.use(ElementUI)

// 解决同一路有反复点击报错问题
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
