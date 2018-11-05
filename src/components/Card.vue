<template>
    <el-card :body-style="{ padding: '0px' }">
		<el-row type="flex" justify="center">
		<el-col :span="8">
			<el-row type="flex" justify="center">
				<span class="title">{{ cup.title || 'Untitled'}}</span>
			</el-row>
        	<el-row type="flex" justify="center">
          		<time class="time" datetime="cup.timestamp">{{ new Date(cup.timestamp).toLocaleDateString() }}</time>
			</el-row>
		</el-col>
		<el-col :span="12" type="flex" justify="center">
			<p>{{ cup.description.length > 20 ? cup.description.slice(0,17) + '...' : cup.description }}</p>
		</el-col>
		<el-col :span="4">
			<el-button type="text" class="button" icon="el-icon-edit"></el-button>
		</el-col>
		</el-row>
    </el-card>
</template>

<script>
export default {
	name: 'Card',
	props: ['cup'],
}
</script>

<style>
.title {
	font-size: 20px;
	font-weight: 700;
	padding-top: 10px;
}

.image {
	width: 100%;
	display: block;
}

.time {
	padding-top: 15px;
	font-size: 13px;
	color: #999;
}

.button {
	align-items: center;
}

.button i {
	font-size: 20px;
}
</style>