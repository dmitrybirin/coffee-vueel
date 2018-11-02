import 'setimmediate'
import { types, flow } from 'mobx-state-tree'
import AuthService from '../auth/AuthService'
import User from './user'
import router from '../router'
import { getItemAsync } from '../helpers'

const authZero = new AuthService()

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
				yield self.rehydrate()
				router.push('/new')
				self.authenticated = true
			} catch (err) {
				self.authenticated = false
				router.push('/')
			}
		}),
		getUser: flow(function* getUser() {
			if (!self.accessToken) return
			try {
				const response = yield authZero.getUserInfo(self.accessToken)
				return {
					sub: response.sub,
					email: response.name,
					nickname: response.nickname,
					picture: response.picture,
				}
			} catch (err) {
				console.error(`Error while getting the User: ${err}`)
			}
		}),
		rehydrate: flow(function* rehydrate() {
			self.authenticated = new Date().getTime() < JSON.parse(yield getItemAsync('expires_at'))
			if (self.authenticated) {
				self.accessToken = yield getItemAsync('access_token')
				let user = JSON.parse(yield getItemAsync('user'))
				if (!user) {
					user = yield self.getUser()
					localStorage.setItem('user', JSON.stringify(user))
				}
				self.user = User.create({
					...user,
				})
			}
		}),
	}))

export default Auth
