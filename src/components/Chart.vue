<template>
    <canvas id="planet-chart"></canvas>
</template>

<script>
import Chart from "chart.js";

import wheel from "../models/wheel";

const options = {
    responsive: true,
    maintainAspectRatio: true,
    scale: {
        ticks: {
            max: 5,
            min: 0,
            stepSize:1,
        }
    }
};

export default {
  name: "Chart",
  computed: {
    chartData: () => ({
      labels: Object.keys(wheel),
      datasets: [
        {
          pointStyle: "circle",
          pointRadius: 5,
          label: "coffeewheel",
          data: Object.values(wheel)
        }
      ]
    })
  },
  watch: {
    chartData: function(newData) {
      this.createChart("planet-chart", { data: newData, options });
    }
  },
  data: () => ({
    wheel
  }),
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: "radar",
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart("planet-chart", { data: this.chartData, options });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->Ž
<style scoped>
</style>
