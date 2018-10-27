import uuidv4 from 'uuid/v4';
import { onAction } from 'mobx-state-tree'

import Wheel from './wheel'
import Cup from './cup'
import CupList from './cuplist'
import Auth from './auth'

const cup = Cup.create({
	id: uuidv4(),
	title:'',
	timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
	description:'',
	loading: false,
	wheel: Wheel.create({ 
		id: uuidv4(),
		'sweet': 1,
		'sour/tart': 1,
		'floral': 1,
		'spicy': 1,
		'salty': 1,
		'berry fruit': 1,
		'citrus fruit': 1,
		'stone fruit': 1,
		'chocolate': 1,
		'caramel': 1,
		'smoky': 1,
		'bitter': 1,
		'savory': 1,
		'body': 1,
		'clean': 1,
		'linger/finish': 1 })
})

const cups = CupList.create({
	items:[]
})

const auth = Auth.create({
	authenticated: false,
	accessToken: null
})

onAction(auth, call => {
	if(call.name === 'logout') {
		cup.reset()
		cups.reset()
	}
})

export { cup, cups, auth }