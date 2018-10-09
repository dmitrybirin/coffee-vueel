import { types } from 'mobx-state-tree';

const Wheel = types.model({
		'sweet': types.string,
		'sour/tart': types.string,
		'floral': types.string,
		'spicy': types.string,
		'salty': types.string,
		'berry fruit': types.string,
		'citrus fruit': types.string,
		'stone fruit': types.string,
		'chocolate': types.string,
		'caramel': types.string,
		'smoky': types.string,
		'bitter': types.string,
		'savory': types.string,
		'body': types.string,
		'clean': types.string,
		'linger/finish': types.string 
}).actions(self => ({
	changeItem(name, value){
		self[name] = value;
	}
}))

const wheel = Wheel.create({ 
	'sweet': '1',
	'sour/tart': '1',
	'floral': '1',
	'spicy': '1',
	'salty': '1',
	'berry fruit': '1',
	'citrus fruit': '1',
	'stone fruit': '1',
	'chocolate': '1',
	'caramel': '1',
	'smoky': '1',
	'bitter': '1',
	'savory': '1',
	'body': '1',
	'clean': '1',
	'linger/finish': '1' })

export default wheel;