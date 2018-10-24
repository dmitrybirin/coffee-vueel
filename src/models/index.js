import uuidv4 from 'uuid/v4';

import Wheel from './wheel'
import Cup from './cup'
import CupList from './cuplist'

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

export { cup, cups }