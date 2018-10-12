<template>
    <canvas id="planet-chart"></canvas>
</template>

<script>
import Chart from 'chart.js';

import wheel from '../models/wheel';

export default {
    name: 'Chart',
    data: () => ({
        wheel
    }),
    methods: {
        createChart(chartId, chartData) {
            const ctx = document.getElementById(chartId);
            new Chart(ctx, {
                type: 'radar',
                data: chartData.data,
                options: chartData.options
            });
        }
    },
    mounted() {
          this.createChart('planet-chart', {data:{
            labels: Object.keys(this.wheel),
            datasets: [{
              pointStyle: 'circle', pointRadius: 10, label: 'coffeewheel',
              data:Object.values(this.wheel),
            }]

          }});
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->Ž
<style scoped>
</style>
