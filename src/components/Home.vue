<template>
    <div id='container'>
		<div id='nav'>
			<h1>Welcome back</h1>
			<router-link to="/list">Go to List!</router-link>
			<router-link to="/new">Create New</router-link>	
		</div>
		<router-view></router-view>
    </div>
</template>

<script>
import { cups } from '../models'

export default {
	name: 'Home',
  components: {
  },
    data: () => ({ cups }),
	mounted() {
		cups.getList()
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
