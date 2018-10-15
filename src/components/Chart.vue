<template>
    <canvas id='coffee-wheel'></canvas>
</template>

<script>
import Chart from "chart.js";

import wheel from "../models/wheel";

const fillColor = "#ffcb0f";
const borderColor = "#663c1f";

const initData = {
  data: {
    labels: Object.keys(wheel),
    datasets: [
      {
        pointStyle: "circle",
        pointRadius: 5,
        label: "coffeewheel",
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
    tooltips: {
        // enabled: false,
    },    
    elements: {
        point: {
            radius: 2,
            hoverRadius: 10
        },
    },
    
    events: ["mousedown", "mouseup", "mousemove"]
  }
};

export default {
  name: "Chart",
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
      idx: 0
    }
  }),
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      this.chart = new Chart(ctx, {
        type: "radar",
        data: chartData.data,
        options: chartData.options
      });
    },
    rangeValue(value) {
      const { max, min } = this.chart.scale;
      if (value > max) return max;
      if (value < min) return min;
      return value;
    },
    getValueFromPoint(x, y) {
      const { scale } = this.chart;
      const angleRad = scale.getIndexAngle(this.drag.idx);
      const angle = (angleRad * 180) / Math.PI;
      let dist;
      if (angleRad === Math.PI / 2 || angleRad === (3 * Math.PI) / 2) {
        dist = (x - scale.xCenter) / Math.sin(angleRad);
      } else {
        dist = (scale.yCenter - y) / Math.cos(angleRad);
      }

      const scalingFactor = scale.drawingArea / (scale.max - scale.min);
      const value = dist / scalingFactor + scale.min;
      return this.rangeValue(value);
    },
    handleClick(e, arr) {
      if (e.type === "mousedown" && arr.length !== 0) {
        this.drag.status = true;
        const { scale } = this.chart;

        const chartData = arr[0]["_chart"].config.data;
        this.drag.idx = arr[0]["_index"];
        this.drag.label = chartData.labels[this.drag.idx];
      }
      if (e.type === "mousemove" && this.drag.status) {
        wheel.changeItem(
          this.drag.label,
          String(this.getValueFromPoint(e.layerX, e.layerY))
        );
      }

      if (e.type === "mouseup" && this.drag.status) {
        this.drag.status = false;

        const roundedValue = Math.round(this.wheel[this.drag.label]);
        this.wheel.changeItem(this.drag.label, String(roundedValue));
      }
    }
  },
  mounted() {
    initData.options.onHover = this.handleClick;

    this.createChart("coffee-wheel", initData);
  }
};
</script>

<style scoped>
</style>
