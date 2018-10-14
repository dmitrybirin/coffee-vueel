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
      },
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
      },
    },
    events: ['mousedown', 'mouseup', 'mousemove'],
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
    chart: null,
    drag: {
        status: false,
        label: null,
    },
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
    getValueFromPoint(x,y){
        const scale = this.chart.scale
        const dist = Math.sqrt(Math.pow(scale.xCenter-x, 2) + Math.pow(scale.yCenter-y, 2))
        const scalingFactor = scale.drawingArea / (scale.max - scale.min)
        return (dist/scalingFactor ) + scale.min   
    },
    handleClick(e, arr){
    
    if (e.type === 'mousedown' && arr.length!==0) {
        this.drag.status = true;
        const scale = this.chart.scale
        
        const chartData = arr[0]['_chart'].config.data;
        const idx = arr[0]['_index'];
        this.drag.label = chartData.labels[idx];
    }
    if (e.type === 'mousemove' && this.drag.status) {
        wheel.changeItem(this.drag.label, String(this.getValueFromPoint(e.layerX, e.layerY)))
    }

    if (e.type === 'mouseup' && this.drag.status) {
        this.drag.status = false;
    }
    },
  },
  mounted() {
    initData.options.onHover = this.handleClick

    this.createChart('coffee-wheel', initData);
  }
};
</script>

<style scoped>
</style>
