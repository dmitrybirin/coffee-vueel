<script>
import { Radar, mixins } from 'vue-chartjs'
import wheel from '../models/wheel';
const { reactiveProp, reactiveData } = mixins

export default {
  name: 'Chart',
  mixins: [reactiveData],
  extends: Radar,
  data: () => ({
    chartData: null
  }),
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: Object.keys(wheel.toJSON()).map(label => label.toUpperCase()),
      datasets: [
        {
          label: 'Coffee Wheel',
          backgroundColor: '#64b587',
          data: parseInt(Object.values(wheel.toJSON()))
        }
      ]
    },  {responsive: false, maintainAspectRatio: true})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->Ž
<style scoped>
</style>
