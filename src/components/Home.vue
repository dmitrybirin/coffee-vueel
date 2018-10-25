<template>
    <div id='container'>
		<div id='nav'>
			<h1>Welcome back</h1>
			<router-link to="/list">Go to List!</router-link>
			<router-link to="/new">Create New</router-link>	
            <a href="javascript:;" v-if="authenticated" @click="logout()">Log out</a>
            <a href="javascript:;" v-else @click="login()">Log in</a>
		</div>
		<router-view></router-view>
    </div>
</template>

<script>
import { cups } from '../models'
import auth  from '../auth/AuthService'

const { login, logout, authenticated, authNotifier } = auth

export default {
	name: 'Home',
    // data: () => ({ cups, auth, authenticated }),
      data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
    cups,
      auth,
      authenticated
    }
  },
	mounted() {
        cups.getList()
        // this.listenToAuth()
    },
    methods: {
        login,
        logout,
        // listenToAuth: () => authNotifier.on('authChange', function (authState){
        //         this.authenticated = authState.authenticated
        // })
  }
};
</script>

<style scoped>
div#nav {
	background-color: #fff5ea;
}

div#nav h1,
h3 {
    margin: 0px;
}

div#nav a {
    color:black;
    text-align: center;
	padding:  14px 25px;
    text-decoration: none;
}

div#nav a:hover {
    color:gray;
}

h1 {
  margin-top: 20px;
}

ul {
    list-style: none;
}
</style>
