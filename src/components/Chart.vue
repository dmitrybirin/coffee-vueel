<template>
    <canvas id='coffee-wheel'></canvas>
</template>

<script>
import Chart from 'chart.js';

import wheel from '../models/wheel';

const fillColor = '#ffcb0f';
const borderColor = '#663c1f';

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
        tooltips: {
            // enabled: false,
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

export default {
    name: 'Chart',
    computed: {
        chartPoints: () => Object.values(wheel),
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
        current:{
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
            if (e.type === 'mousedown' && arr.length === 0) {
                const { scale } = this.chart;
                
                // calculating rad for X and Y
                let angle 
                if (scale.yCenter-e.layerY >0){
                 angle = Math.atan2(
                    scale.yCenter-e.layerY,
                    e.layerX-scale.xCenter
                )
                } else {
                  angle = Math.atan2(
                    scale.yCenter-e.layerY,
                    e.layerX-scale.xCenter)+2*Math.PI
                } 
                // converting angle: invert and move zero
                const convertedAngle = ((2*Math.PI - angle)+Math.PI/2) % (2*Math.PI)
                if (convertedAngle > (2*Math.PI - Math.PI/this.dataAngles.length)) {
                    this.current.idx = 0
                } else {
                  const angleDiff = this.dataAngles.map(da => Math.abs(da.angle - convertedAngle))
                  let index = angleDiff.indexOf(Math.min(...angleDiff))
                  this.current.idx = index;
                }

                
            }

             if (e.type === 'mouseup' && !this.current.drag) {
                  
                  console.log(this.current.idx)
                  console.log(this.dataLabels)

                  wheel.changeItem(
                    this.dataLabels[this.current.idx],
                    Math.round(this.getValueFromPoint(e.layerX, e.layerY))
                );
            }

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
                const label = this.dataLabels[this.current.idx]
                const roundedValue = Math.round(this.wheel[label]);
                this.wheel.changeItem(label, roundedValue);
            }
        }
    },
    mounted() {
        initData.options.onHover = this.handleClick;

        this.createChart('coffee-wheel', initData);
        this.dataLabels = this.chart.config.data.labels 
        this.dataAngles = this.dataLabels.map((label,idx) => ({
          angle: this.chart.scale.getIndexAngle(idx),
          label
        })) 
    }
};
</script>

<style scoped>
</style>
