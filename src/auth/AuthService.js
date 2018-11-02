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

	login() {
		this.auth0.authorize()
	}

	signUp(email, password, data) {
		this.auth0.signup(
			{
				connection: 'Username-Password-Authentication',
				email,
				password,
				user_metadata: data,
			},
			err => {
				if (err) return alert('Something went wrong: ' + err.message)
				return alert('success signup without login!')
			}
		)
	}

	handleAuthentication() {
		return new Promise((res, rej) => {
			this.auth0.parseHash((err, authResult) => {
				if (err) rej(err)
				if (authResult && authResult.accessToken && authResult.idToken) {
					this.setSession(authResult)
					res(authResult)
				}
			})
		})
	}

	getUserInfo(accessToken) {
		return new Promise((res, rej) =>
			this.auth0.client.userInfo(accessToken, (err, profile) => {
				if (err) rej(err)
				if (profile) res(profile)
			})
		)
	}

	setSession(authResult) {
		let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
		localStorage.setItem('access_token', authResult.accessToken)
		localStorage.setItem('id_token', authResult.idToken)
		localStorage.setItem('expires_at', expiresAt)
	}

	logout() {
		localStorage.removeItem('access_token')
		localStorage.removeItem('id_token')
		localStorage.removeItem('expires_at')
		localStorage.removeItem('user')
		this.auth0.logout({ returnTo: AUTH_CONFIG.returnUrl })
	}
}

export default AuthService
