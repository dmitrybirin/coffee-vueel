import Vue from 'vue'
import VueRouter from 'vue-router'

import List from './components/List'
import New from './components/New'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
	{ path: '/list', component: List },
	{ path: '/new', component: New }
  ]
})

export default router