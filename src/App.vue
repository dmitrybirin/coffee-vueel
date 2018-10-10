<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <Chart :width="500" :height="300"/> -->
    <Input name='chocolate' :angle='angle'/>
    <!-- <Input name='body' angle= '60'/> -->
    <input @input="e=>{this.angle=e.target.value}" type="number">
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import Input from './components/Input.vue'

export default {
  name: 'app',
  components: {
    Chart,
    Input
  },
  data: () => ({
    angle: 0
  })
}
</script>

<style>
#app {
  display: flex;
  align-content: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
