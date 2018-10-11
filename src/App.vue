<template>
  <div id="app">
    <Clock/>
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import Clock from './components/Clock.vue'
import Input from './components/Input.vue'

export default {
  name: 'app',
  components: {
    Chart,
    Input,
    Clock
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
