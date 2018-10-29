import 'setimmediate'
import { types, flow } from 'mobx-state-tree'
import Wheel from './wheel'
import { request } from '../helpers'

const Cup = types
	.model({
		id: types.identifier,
		title: types.string,
		timestamp: types.string,
		description: types.string,
		loading: types.boolean,
		wheel: types.maybe(Wheel),
	})
	.actions(self => ({
		send: flow(function* send() {
			self.loading = true
			const res = yield request(`/coffee`, {
				method: 'POST',
				mode: 'cors',
				credentials: 'same-origin',
				body: JSON.stringify(self),
			})
			if (res.status !== 204) {
				self.loading = false
				throw new Error(`Error while posting: status code was ${res.status} not 204`)
			}
			if (res.status === 204) {
				self.reset()
			}
			self.loading = false
		}),
		changeTitle(newTitle) {
			self.title = newTitle
		},
		changeDate(newDate) {
			self.timestamp = newDate
		},
		changeDescription(newDesc) {
			self.description = newDesc
		},
		reset() {
			self.title = ''
			self.description = ''
			self.loading = false
			self.wheel.reset()
		},
	}))

export default Cup
