<template>
    <div id='container'>
		<h2>Here is your List</h2>
		<el-row :gutter="30">
			<el-col :span="12" v-for="cup in cups.items" :key="cup.id"  >
				<Card :cup="cup"/>
			</el-col>
		</el-row>
    </div>
</template>

<script>
import { cups } from '../models'
import Card from './Card'

export default {
	name: 'List',
	components: {
		Card,
	},
	data: () => ({ cups }),
	mounted() {
		cups.getList()
	},
}
</script>

<style scoped>
.el-col {
	padding-top: 20px;
}
</style>
