<template>
    <canvas id='coffee-wheel'></canvas>
</template>

<script>
import Chart from 'chart.js';

import wheel from '../models/wheel';

const fillColor = '#ffcb0f';
const borderColor = '#663c1f'

const initData = {
  data: {
    labels: Object.keys(wheel),
    datasets: [
      {
        pointStyle: 'circle',
        pointRadius: 5,
        label: 'coffeewheel',
        backgroundColor: fillColor,
        borderColor: borderColor,
        pointBackgroundColor: fillColor,
        pointBorderColor: borderColor,
        data: Object.values(wheel)
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scale: {
      ticks: {
        max: 5,
        min: 0,
        stepSize: 1
      }
    },
    events: ['mousedown', 'mouseup'],
    onHover: (e, arr) => {
        if (e.type === 'mousedown' && arr.length!==0) {
            console.log('down')
        } else if (e.type === 'mouseup'){
            console.log('up')
        }
    },
  }
};

export default {
  name: 'Chart',
  computed: {
    chartPoints: () => Object.values(wheel)
  },
  watch: {
    chartPoints: function(newPoints) {
      this.chart.data.datasets[0].data = newPoints;
      this.chart.update();
    }
  },
  data: () => ({
    wheel,
    chart: null
  }),
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      this.chart = new Chart(ctx, {
        type: 'radar',
        data: chartData.data,
        options: chartData.options
      });
    },
  },
  mounted() {
    this.createChart('coffee-wheel', initData);
  }
};
</script>

<style scoped>
</style>
