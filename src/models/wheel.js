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

export default Wheel;