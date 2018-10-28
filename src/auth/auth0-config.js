const devUrl = 'http://localhost:8080'
const prodUrl =  'https://coffeewheel.xyz'

export const AUTH_CONFIG = {
	clientId: 'sjCx8tDOXrkydooBnvyMCClbQO8t1MwS',
	domain: 'cofferver.eu.auth0.com',
	callbackUrl: `${process.env.NODE_ENV === 'dev' ? devUrl : prodUrl}/callback`,
	apiUrl: 'https://api.coffeewheel.xyz',
	returnUrl: `${process.env.NODE_ENV === 'dev' ? devUrl : prodUrl}`,
}
