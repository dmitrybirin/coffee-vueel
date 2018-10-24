import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import App from './App.vue'
import List from './components/List'
import New from './components/New'

Vue.use(VueRouter)

const routes = [
  { path: '/list', component: List },
  { path: '/new', component: New }
]
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
