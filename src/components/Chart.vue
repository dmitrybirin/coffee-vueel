<script>
import { Radar } from 'vue-chartjs'

const data = { 
  'sweet': 0,
  'sour/tart': 0,
  'floral': 0,
  'spicy': 0,
  'salty': 0,
  'berry fruit': 0,
  'citrus fruit': 0,
  'stone fruit': 0,
  'chocolate': 0,
  'caramel': 0,
  'smoky': 0,
  'bitter': 0,
  'savory': 0,
  'body': 0,
  'clean': 0,
  'linger/finish': 0 }

Object.keys(data).map(k => data[k] = Math.floor(Math.random()*5))


export default {
  name: 'Chart',
  extends: Radar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: Object.keys(data).map(label => label.toUpperCase()),
      datasets: [
        {
          label: 'Coffee Wheel',
          backgroundColor: '#64b587',
          data: Object.values(data)
        }
      ]
    },  {responsive: false, maintainAspectRatio: true})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->Ž
<style scoped>
</style>
