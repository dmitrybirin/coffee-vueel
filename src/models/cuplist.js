import 'setimmediate'
import { types, flow } from 'mobx-state-tree'
import Cup from './cup'

import { getData, request } from '../helpers'

const CupList = types
	.model({
		items: types.array(Cup),
	})
	.actions(self => ({
		getList: flow(function* getList() {
				const res = yield request(`/coffee`)
				const data = yield getData(res)
				self.items = data.map(cup => ({ ...cup, loading: false, id: String(cup.id) }))
		}),
		reset() {
			self.items = []
		},
	}))

export default CupList
