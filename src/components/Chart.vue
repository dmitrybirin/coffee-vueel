<template>
    <div id='container'>
        <canvas id='coffee-wheel'></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

import wheel from '../models/wheel';

const fillColor = "rgb(255, 203, 15, 0.4)";
const borderColor = "rgb(255, 199, 0)";

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
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scale: {
            ticks: {
                max: 5,
                min: 0,
                stepSize: 1
            }
        },
        elements: {
            point: {
                radius: 2,
                hoverRadius: 10
            }
        },

        events: ['mousedown', 'mouseup', 'mousemove']
    }
};

const Pi = Math.PI;

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
        current: {
            drag: false,
            label: null,
            idx: 0
        },
        dataLabels: [],
        dataAngles: []
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
        rangeValue(value) {
            const { max, min } = this.chart.scale;
            if (value > max) return max;
            if (value < min) return min;
            return value;
        },
        getValueFromPoint(x, y) {
            const { scale } = this.chart;
            const angleRad = scale.getIndexAngle(this.current.idx);
            const angle = (angleRad * 180) / Pi;
            let dist;
            if (angleRad === Pi / 2 || angleRad === (3 * Pi) / 2) {
                dist = (x - scale.xCenter) / Math.sin(angleRad);
            } else {
                dist = (scale.yCenter - y) / Math.cos(angleRad);
            }

            const scalingFactor = scale.drawingArea / (scale.max - scale.min);
            const value = dist / scalingFactor + scale.min;
            return this.rangeValue(value);
        },
        clicking(e, arr) {
              if (e.type === 'mousedown' && arr.length === 0) {
                const { scale } = this.chart;

                // calculating rad for X and Y
                let angle;
                if (scale.yCenter - e.layerY > 0) {
                    angle = Math.atan2(
                        scale.yCenter - e.layerY,
                        e.layerX - scale.xCenter
                    );
                } else {
                    angle =
                        Math.atan2(
                            scale.yCenter - e.layerY,
                            e.layerX - scale.xCenter
                        ) +
                        2 * Pi;
                }
                // converting angle: invert and move zero
                const convertedAngle =
                    (2 * Pi - angle + Pi / 2) % (2 * Pi);
                if (
                    convertedAngle >
                    2 * Pi - Pi / this.dataAngles.length
                ) {
                    this.current.idx = 0;
                } else {
                    const angleDiff = this.dataAngles.map(da =>
                        Math.abs(da - convertedAngle)
                    );
                    let index = angleDiff.indexOf(Math.min(...angleDiff));
                    this.current.idx = index;
                }
            }

            if (e.type === 'mouseup' && !this.current.drag) {
                wheel.changeItem(
                    this.dataLabels[this.current.idx],
                    Math.round(this.getValueFromPoint(e.layerX, e.layerY))
                );
            }
        },
        dragging (e, arr) {
                      if (e.type === 'mousedown' && arr.length !== 0) {
                this.current.drag = true;
                const { scale } = this.chart;
                this.current.idx = arr[0]['_index'];
            }
            if (e.type === 'mousemove' && this.current.drag) {
                wheel.changeItem(
                    this.dataLabels[this.current.idx],
                    this.getValueFromPoint(e.layerX, e.layerY)
                );
            }

            if (e.type === 'mouseup' && this.current.drag) {
                this.current.drag = false;
                const label = this.dataLabels[this.current.idx];
                const roundedValue = Math.round(this.wheel[label]);
                this.wheel.changeItem(label, roundedValue);
            }
        },
        handleClick(e, arr) {
          this.clicking(e, arr)
          this.dragging(e, arr)
        }
    },
    mounted() {
        initData.options.onHover = this.handleClick;

        this.createChart('coffee-wheel', initData);
        this.dataLabels = this.chart.config.data.labels;
        this.dataAngles = this.dataLabels.map((label, idx) =>
            this.chart.scale.getIndexAngle(idx)
        );
    }
};
</script>

<style scoped>
div#container {
    position: relative;
    width: 80vw;
    height: 90vh;
}
</style>
