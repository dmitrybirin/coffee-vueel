<template>
    <div id='container'>
		<h1>Welcome back</h1>
		<h2>Here is your List</h2>
		<ul v-for="cup in cups.items" :key="cup.id">
			<li>{{cup.title}}:{{cup.description || 'no description'}}</li>
		</ul>
    </div>
</template>

<script>
import { cups } from '../models';
export default {
    name: 'Home',
    data: () => ({ cups }),
	mounted() {
		cups.getList()
    }

};
</script>

<style scoped>
div#container h1,
h3 {
    margin: 10px;
}

ul {
    list-style: none;
}
</style>
