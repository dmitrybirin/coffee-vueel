const serverEndpoint = `${process.env.serverEndpoint || 'http://localhost:3000'}`

export const request = async (relativeUrl, options) => {
	try {
		const res = await window.fetch(`${serverEndpoint}${relativeUrl}`, {	headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}, ...options})
		return res
	} catch (err) {
		throw new Error('Error while fetching:\n', err.message)
	}
}

export const getData = async (response) => {
	const json = await response.json()
	if (json && json.data) {
		return json.data;
	} else {
		throw new Error('No data in response.')
	}
}