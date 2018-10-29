const serverEndpoint = process.env.VUE_APP_API_ENDPOINT

export const request = async (relativeUrl, options) => {
	const idToken = await getItemAsync('id_token')
	const headers = new Headers({
		'Content-Type': 'application/json; charset=utf-8',
		Authorization: `Bearer ${idToken}`,
	})
	try {
		const res = await window.fetch(`${serverEndpoint}${relativeUrl}`, {
			headers,
			mode: 'cors',
			...options,
		})
		return res
	} catch (err) {
		throw new Error('Error while fetching:\n', err.message)
	}
}

export const getItemAsync = async (key, count = 0) => {
	if (count > 9) return null
	else if (!localStorage.getItem(key)) {
		await new Promise(res => setTimeout(res, 50))
		count += 1
		await getItemAsync(key, count)
	}
	return localStorage.getItem(key)
}

export const getData = async response => {
	const json = await response.json()
	if (json && json.data) {
		return json.data
	} else {
		throw new Error('No data in response.')
	}
}
