import { types } from 'mobx-state-tree';

import Wheel from './wheel'
import Cup from './cup'

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

const Coffee = types.model({
	cup: Cup,
	wheel: Wheel
}).actions(self => ({
	get: async () => {
		const res = await request(serverEndpoint)
		const data = await getData(res)
		return data
	},
	send: async () => {
		const res = await request(`${serverEndpoint}/coffee`, {...postOptions, body: JSON.stringify(self)})
		if (res.status !== 204) {
			throw new Error(`Error while posting: status code was ${res.status} not 204`)
		}
	},
}))

const coffee = Coffee.create({
	wheel: Wheel.create({ 
		'sweet': 1,
		'sour/tart': 1,
		'floral': 1,
		'spicy': 1,
		'salty': 1,
		'berry fruit': 1,
		'citrus fruit': 1,
		'stone fruit': 1,
		'chocolate': 1,
		'caramel': 1,
		'smoky': 1,
		'bitter': 1,
		'savory': 1,
		'body': 1,
		'clean': 1,
		'linger/finish': 1 }),
	cup: Cup.create({
		title:'',
		timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
		description:'',
	})
})

export default coffee