<template>
  <div id="container">
	<h2>Coffee Wheel</h2>
    <div id="input-container">
      <Form />
    </div>
    <Chart />
  </div>
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

<style scoped>
h1 {
	font-size: 70px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
#container {
	display: flex;
	flex-direction: column;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 10px;
}

div#input-container {
	display: flex;
	flex-direction: column;
}
</style>
