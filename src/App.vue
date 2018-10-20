<template>
  <div id="app">
    <div id="input-container">
      <h1>Coffee Wheel</h1>
      <Description />
    </div>
    <Chart />
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import Description from './components/Description.vue'
import wheel from './models/wheel';

export default {
  name: 'app',
  components: {
    Chart,
    Description
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

div#input-container {
  display: flex;
  flex-direction: column;
}

</style>
