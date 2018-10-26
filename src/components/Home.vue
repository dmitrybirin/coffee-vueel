<template>
    <div id='container'>
		<div id='nav'>
			<h2>Welcome back</h2>
            <h3 v-if="auth.userName">{{auth.userName}}</h3>
			<router-link to="/list">Go to List!</router-link>
			<router-link to="/new">Create New</router-link>	
            <a href="javascript:;" v-if="auth.authenticated" @click="auth.logout()">Log out</a>
            <a href="javascript:;" v-else @click="auth.login()">Log in</a>
		</div>
		<router-view></router-view>
    </div>
</template>

<script>
import { cups, auth } from '../models'

export default {
	name: 'Home',
    data: () => ({ cups, auth }),
	mounted() {
        cups.getList()
        auth.rehydrate()
    },
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

h3 {
    margin: 15px;
}

ul {
    list-style: none;
}
</style>
