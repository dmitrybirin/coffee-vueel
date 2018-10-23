import { types } from 'mobx-state-tree';

const Cup = types.model({
	// id: types.optional(types.identifier),
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

export default Cup;