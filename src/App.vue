<template>
  <div id="app">
    <Home/>
    <!-- <div id="input-container"> -->
      <!-- <h1>Coffee Wheel</h1> -->
      <!-- <Description /> -->
    <!-- </div> -->
    <!-- <Chart /> -->
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Chart from './components/Chart.vue'
import Description from './components/Description.vue'
import wheel from './models/wheel'

export default {
	name: 'app',
	components: {
		Chart,
		Description,
		Home,
	},
	data: () => ({
		wheel,
	}),
}
</script>

<style>
h1 {
	font-size: 70px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
#app {
	display: flex;
	flex-direction: column;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

div#input-container {
	display: flex;
	flex-direction: column;
}
</style>
