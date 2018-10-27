<template>
    <div id='container'>
		<h2>Here is your List</h2>
		<ul v-for="cup in cups.items" :key="cup.id">
			<li>{{cup.title}}:{{cup.description || 'no description'}}</li>
		</ul>
    </div>
</template>

<script>
import { cups, auth } from '../models'
export default {
	name: 'List',
	data: () => ({ cups }),
	mounted() {
		if (auth.user.id) cups.getList(auth.user.id)
	},
}
</script>

<style scoped>
ul {
	list-style: none;
}
</style>
