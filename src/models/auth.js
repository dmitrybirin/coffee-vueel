import 'setimmediate'
import { types, flow } from 'mobx-state-tree'
import AuthService from '../auth/AuthService'
import User from './user'
import router from '../router'

const authZero = new AuthService()

const getItemAsync = async (key, count = 0) => {
	if (count > 9) return null
	else if (!localStorage.getItem(key)) {
		await new Promise(res => setTimeout(res, 50))
		count += 1
		await getItemAsync(key, count)
	}
	return localStorage.getItem(key)
}

const Auth = types
	.model({
		authenticated: types.boolean,
		accessToken: types.maybeNull(types.string),
		user: types.maybe(User),
	})
	.actions(self => ({
		login() {
			authZero.login()
		},
		logout() {
			authZero.logout()
			self.authenticated = false
			self.user = undefined
			self.accessToken = ''
			router.push('/')
		},
		handleAuth: flow(function* handleAuth() {
			try {
				yield authZero.handleAuthentication()
				router.push('/')
				self.authenticated = true
			} catch (err) {
				self.authenticated = false
				router.push('/')
			}
		}),
		getUser: flow(function* getUser() {
			console.log('gettgin user')
			if (!self.accessToken) return
			try {
				const response = yield authZero.getUserInfo(self.accessToken)
				self.user = User.create({
					sub: response.sub,
					email: response.name,
					nickname: response.nickname,
					picture: response.picture,
				})
			} catch (err) {
				console.error(`Error while getting the User: ${err}`)
			}
		}),
		rehydrate: flow(function* rehydrate() {
			self.authenticated = new Date().getTime() < JSON.parse(yield getItemAsync('expires_at'))
			if (self.authenticated) {
				self.accessToken = yield getItemAsync('access_token')
				yield self.getUser()
			} else {
				authZero.logout()
			}
		}),
	}))

export default Auth
