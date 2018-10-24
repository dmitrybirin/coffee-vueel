
import 'setimmediate'
import { types, flow } from 'mobx-state-tree'
import Wheel from './wheel'


const postOptions = {
	method: 'POST',
	mode: 'cors',
	credentials: 'same-origin'
}

const serverEndpoint = `${process.env.serverEndpoint || 'http://localhost:3000'}`

const request = async (url, options) => {
	try {
		const res = await window.fetch(url, {	headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}, ...options})
		return res
	} catch (err) {
		throw new Error('Error while fetching:\n', err.message)
	}
}

const getData = async (response) => {
	const json = await response.json()
	if (json && json.data) {
		return json.data;
	} else {
		throw new Error('No data in response.')
	}
}

const Cup = types.model({
	id: types.identifier,
	serverId: types.maybe(types.number),
	title: types.string,
	timestamp: types.string,
	description: types.string,
	loading: types.boolean,
	wheel: Wheel,
}).actions(self => ({
	get: flow(function* get() {
		const res = yield request(serverEndpoint)
		const data = yield getData(res)
		return data
	}),
	send: flow(function* send() {
		self.loading = true
		const res = yield request(`${serverEndpoint}/coffee`, {...postOptions, body: JSON.stringify(self)})
		if (res.status !== 204) {
			self.loading = false
			throw new Error(`Error while posting: status code was ${res.status} not 204`)
		} 
		if (res.status === 204) {
			self.title = ''
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
}))

export default Cup;