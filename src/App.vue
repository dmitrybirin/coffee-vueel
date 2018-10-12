<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Chart />
    <!-- <Input name='chocolate' :angle='angle'/> -->
    <!-- <Input name='body' angle= '60'/> -->
    <!-- <input @input="e=>{this.angle=e.target.value}" type="number"> -->
    <InputContainer />
  </div>
</template>

<script>
import Chart from './components/Chart.vue'
import Input from './components/Input.vue'
import InputContainer from './components/InputContainer.vue'

export default {
  name: 'app',
  components: {
    Chart,
    Input,
    InputContainer
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
