import { types } from 'mobx-state-tree';

const Cup = types.model({
	title: types.string,
	date: types.Date,
	description: types.string,
}).actions(self => ({
	changeTitle(newTitle) {
		self.title = newTitle
	},
	changeDate(newDate) {
		self.date = newDate
	},
	changeDescription(newDesc) {
		self.description = newDesc
	}
}))

const cup = Cup.create({
	title:'',
	date: new Date,
	description:'',
})

export default cup;