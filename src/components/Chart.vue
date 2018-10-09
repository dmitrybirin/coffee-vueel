<script>
import { Radar } from 'vue-chartjs'

export default {
  name: 'Chart',
  extends: Radar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#64b587',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    },  {responsive: false, maintainAspectRatio: true})
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->Ž
<style scoped>
</style>
