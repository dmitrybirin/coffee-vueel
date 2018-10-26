import 'setimmediate'
import { types, flow } from 'mobx-state-tree'
import AuthService from '../auth/AuthService'
import router from '../router'

const authZero = new AuthService()

const getItemAsync = async (key, count = 0) => {
	if (count > 9) throw new Error(`Cannot get the item '${key}'`)
	else if (!localStorage.getItem(key)) {
		await new Promise(res => setTimeout(res, 100))
		count += 1
		await getItemAsync(key, count)
	}
	return localStorage.getItem(key)
}

const Auth = types
	.model({
		authenticated: types.boolean,
		userName: types.string,
	})
	.actions(self => ({
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
		changeAuthenticated(value) {
			self.authenticated = value
		},
		changeUser(name) {
			self.userName = name
		},
		login() {
			authZero.login()
		},
		logout() {
			authZero.logout()
			self.authenticated = false
			self.userName = ''
			router.push('/')
		},
		async isAuthenticated() {
			try {
				return new Date().getTime() < JSON.parse(await getItemAsync('expires_at'))
			} catch (err) {
				return false
			}
		},
		async getUser() {
			try {
				const res = await getItemAsync('userName')
				return res
			} catch (err) {
				return ''
			}
		},
		async rehydrate() {
			self.changeUser(await self.getUser())
			self.changeAuthenticated(await self.isAuthenticated())
		},
	}))

export default Auth
