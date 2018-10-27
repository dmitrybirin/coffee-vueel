import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-config'

class AuthService {
	constructor() {
		this.auth0 = new auth0.WebAuth({
			domain: AUTH_CONFIG.domain,
			clientID: AUTH_CONFIG.clientId,
			redirectUri: AUTH_CONFIG.callbackUrl,
			responseType: 'token id_token',
			scope: 'openid profile',
		})
	}

	login = () => {
		this.auth0.authorize()
	}

	handleAuthentication = () =>
		new Promise((res, rej) => {
			this.auth0.parseHash((err, authResult) => {
				if (err) rej(err)
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult)
					res(authResult)
				}
			})
		})
		
	getUserInfo = (accessToken) => new Promise((res,rej) =>
		this.auth0.client.userInfo(accessToken, (err, profile) => {
			if (err) rej(err)
			if (profile) res(profile)
		  })
	)

	setSession = authResult => {
		let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
		localStorage.setItem('access_token', authResult.accessToken)
		localStorage.setItem('id_token', authResult.idToken)
		localStorage.setItem('expires_at', expiresAt)
		localStorage.setItem(
			'userName',
			(authResult && authResult.idTokenPayload && authResult.idTokenPayload.nickname) ||
				'stranger'
		)
	}

	logout = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('id_token')
		localStorage.removeItem('expires_at')
		localStorage.removeItem('userName')
	}
}

export default AuthService
