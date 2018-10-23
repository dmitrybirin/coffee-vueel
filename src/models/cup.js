import { types } from 'mobx-state-tree';
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
	get: async () => {
		const res = await request(serverEndpoint)
		const data = await getData(res)
		return data
	},
	send: async () => {
		self.beginLoading()
		const res = await request(`${serverEndpoint}/coffee`, {...postOptions, body: JSON.stringify(self)})
		if (res.status !== 204) {
			self.endLoading()
			throw new Error(`Error while posting: status code was ${res.status} not 204`)
		} 
		if (res.status === 204) {
			self.changeTitle('')
		}
		self.endLoading()
	},
	changeTitle(newTitle) {
		self.title = newTitle
	},
	changeDate(newDate) {
		self.timestamp = newDate
	},
	changeDescription(newDesc) {
		self.description = newDesc
	},
	beginLoading(){
		self.loading = true
	},
	endLoading(){
		self.loading = false
	}
}))

export default Cup;