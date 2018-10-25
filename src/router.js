import Vue from 'vue'
import VueRouter from 'vue-router'

import List from './components/List'
import New from './components/New'
import Callback  from './components/Callback'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  history: true,
  routes: [
	{ path: '/list', component: List },
	{ path: '/new', component: New },
	{ path: '/callback', component: Callback },
  ]
})

export default router