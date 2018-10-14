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
      {
        data: Object.values(wheel+1)
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
      },
    },
    // hover: {
    //     intersect: true,
    // },
    events: ['mousedown', 'mouseup'],
    // onHover: (e, arr) => {
    //     if (e.type === 'mousemove'){
    //         // console.log('MOVED! ', e.movementX)
    //     }

    //     if (e.type === 'mousedown' && arr.length!==0) {
    //         console.log('down', e)
    //         const chartData = arr[0]['_chart'].config.data;
    //         const idx = arr[0]['_index'];
    //         const label = chartData.labels[idx];
    //         const value = chartData.datasets[0].data[idx];
    //         console.log(`${label}:${value}`)
    //     } else if (e.type === 'mouseup'){
    //         // console.log('up', e)
    //         // console.log(this.scales)
    //     }
    // },
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
        scalingFactor: 0,
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
    handleClick(e, arr){
    
    console.log('click', e.type)
    // const elements = this.chart.getElementsAtEvent(e)
    
    if (e.type === 'mousedown' && arr.length!==0) {
        console.log('...dragging...')
        this.drag.status = true;
        const scale = this.chart.scale
        this.drag.scalingFactor = scale.drawingArea / (scale.max - scale.min)

        const chartData = arr[0]['_chart'].config.data;
        const idx = arr[0]['_index'];
        
        this.drag.label = chartData.labels[idx];
        

    }
    if (e.type === 'mouseup' && this.drag.status) {
        this.drag.status = false;
        console.log('done')
        const scale = this.chart.scale
        const dist = Math.sqrt(Math.pow(scale.xCenter-e.layerX, 2) + Math.pow(scale.yCenter-e.layerY, 2))
        const value = (dist/this.drag.scalingFactor ) + scale.min        
        console.log(value)
        wheel.changeItem(this.drag.label, String(value))
      
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
