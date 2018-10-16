<template>
  <div id="app">
    <h1>Coffee Wheel</h1>
    <Chart />
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import wheel from './models/wheel';

export default {
  name: 'app',
  components: {
    Chart,
  },
  data: () => ({
    wheel
  })
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
  flex-direction: row;
  justify-content: baseline;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
