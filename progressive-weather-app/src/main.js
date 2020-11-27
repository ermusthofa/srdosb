import Vue from 'vue'
import AppWeather from '@/components/AppWeather.vue'
import Index from './App'
import AppCode from '@/components/AppCode'
import './registerServiceWorker'
import VueRouter from 'vue-router'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const routes = [
  { path: '/code', name: 'showCode', component: AppCode, props: true },
  { path: '/weather', alias: '/', name: 'showWeather', component: AppWeather },
]

const router = new VueRouter({
  mode: "history",
  routes: routes,
})

new Vue({
  router,
  render: h => h(Index)
}).$mount('#app')
