import { types } from 'mobx-state-tree';

const Cup = types.model({
	title: types.string,
	timestamp: types.string,
	description: types.string,
}).actions(self => ({
	changeTitle(newTitle) {
		self.title = newTitle
	},
	changeDate(newDate) {
		self.timestamp = newDate
	},
	changeDescription(newDesc) {
		self.description = newDesc
	}
}))

const cup = Cup.create({
	title:'',
	timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
	description:'',
})

export default cup;