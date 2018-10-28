import { types } from 'mobx-state-tree'

const User = types
	.model({
		sub: types.string,
		picture: types.string,
		email: types.string,
		nickname: types.string,
	})
	.actions(self => ({
		updateValue(name, value) {
			self[name] = value
		},
	}))
	.views(self => ({
		get id() {
			return self.sub.split('|')[1]
		},
	}))

export default User
