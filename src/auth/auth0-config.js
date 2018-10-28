export const AUTH_CONFIG = {
	clientId: 'sjCx8tDOXrkydooBnvyMCClbQO8t1MwS',
	domain: 'cofferver.eu.auth0.com',
	callbackUrl:
		process.env.NODE_ENV === 'dev'
			? 'https://localhost:8080/callback'
			: 'https://coffeewheel.xyz/callback',
	apiUrl: 'https://api.coffeewheel.xyz',
}
