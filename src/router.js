import Vue from 'vue'
import VueRouter from 'vue-router'

import List from './components/List'
import New from './components/New'
import Callback from './components/Callback'

Vue.use(VueRouter)

const getMetaTags = description => ({
	metaTags: [
		{
			name: 'description',
			content: description,
		},
		{
			property: 'og:description',
			content: description,
		},
	],
})

const router = new VueRouter({
	mode: 'history',
	history: true,
	routes: [
		{
			path: '/list',
			component: List,
		},
		{
			path: '/new',
			component: New,
			meta: {
				title: 'New Cup',
				metaTags: getMetaTags('Add a new cup to the list'),
			},
		},
		{
			path: '/edit',
			component: New,
			meta: {
				title: 'Edit Cup',
				metaTags: getMetaTags('Edit the cup'),
			},
		},
		{
			path: '/callback',
			component: Callback,
			meta: {
				title: 'Brewing your login',
				metaTags: getMetaTags('Authentification progress'),
			},
		},
	],
})

export default router
