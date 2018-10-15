import { types } from 'mobx-state-tree';

const Wheel = types.model({
		'sweet': types.number,
		'sour/tart': types.number,
		'floral': types.number,
		'spicy': types.number,
		'salty': types.number,
		'berry fruit': types.number,
		'citrus fruit': types.number,
		'stone fruit': types.number,
		'chocolate': types.number,
		'caramel': types.number,
		'smoky': types.number,
		'bitter': types.number,
		'savory': types.number,
		'body': types.number,
		'clean': types.number,
		'linger/finish': types.number 
}).actions(self => ({
	changeItem(name, value){
		self[name] = value;
	}
}))

const wheel = Wheel.create({ 
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

export default wheel;