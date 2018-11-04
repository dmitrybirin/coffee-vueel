<template>
	<el-row type="flex" class="row-bg">
		<el-col :span="8"><Form /></el-col>
		<el-col :span="16"><Chart /></el-col>
	</el-row>
</template>

<script>
import Chart from './Chart.vue'
import Form from './Form.vue'
import wheel from '../models/wheel'

export default {
	name: 'New',
	components: {
		Chart,
		Form,
	},
	data: () => ({
		wheel,
	}),
}
</script>

<style scoped lang="css">
.el-row {
	margin-top: 40px;
}
</style>



