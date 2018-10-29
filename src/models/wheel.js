import { types } from 'mobx-state-tree'

const Wheel = types
	.model({
		/* eslint-disable */
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
		/* eslint-enable */
	})
	.actions(self => ({
		changeItem(name, value) {
			self[name] = value
		},
		reset() {
			for (let key of Object.keys(self.toJSON())) {
				self[key] = 1
			}
		},
	}))

export default Wheel
