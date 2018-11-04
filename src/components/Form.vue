<template>
<div id="container">

	<el-row type="flex" justify="start">
		<el-col :span="8">
			<span class="input-label">Coffee name</span>
		</el-col>
		<el-col :span="16">
			<el-input 
				id="title"
				placeholder="Kenya from Rōst"
				type="text" 
				v-bind:value="cup.title"
				v-on:input="onNameChange"
			>
			</el-input>
		</el-col>
	</el-row>

	<el-row type="flex" justify="start">
		<el-col :span="8">
			<span class="input-label">Description</span>
		</el-col>
		<el-col :span="16">
			<el-input 
				placeholder="Easy-peasy lemon squesy"
				type="textarea" 
				v-bind:value="cup.description"
				v-on:input="onDescriptionChange"
			>
			</el-input>
		</el-col>
	</el-row>
	<el-row :span="4" type="flex" justify="center">	
		<el-button @click="this.sendCup">Send!</el-button>
	</el-row>	
</div>
</template>

<script>
import { cup } from '../models'
export default {
	name: 'Form',
	data: () => ({
		cup,
	}),
	methods: {
		sendCup: () => {
			cup.changeDate(
				new Date()
					.toISOString()
					.slice(0, 19)
					.replace('T', ' ')
			)
			cup.send()
		},
		onNameChange: value => cup.changeTitle(value),
		onDescriptionChange: value => cup.changeDescription(value),
	},
}
</script>

<style scoped lang="css">
div#container {
	margin-top: 200px;
}
.el-row {
	margin-top: 25px;
	align-items: center;
}
</style>
