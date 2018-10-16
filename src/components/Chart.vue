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
            this.chartLabels = this.chart.config.data.labels

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
            console.log(angleRad)
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
                 angle = Math.atan2(
                    scale.yCenter-e.layerY,
                    e.layerX-scale.xCenter
                )
                // converting angle: invert and move zero
                const convertedAngle = ((2*Math.PI - angle)+Math.PI/2) % (2*Math.PI)
                const angleDiff = this.dataAngles.map(da => (da + (Math.PI/2-convertedAngle))%(Math.PI*2)).map(da => Math.abs(da - Math.PI/2))
                let index = angleDiff.indexOf(Math.min(...angleDiff))
                if (index === this.dataAngles.length - 1) {
                    index = 0;
                }
                this.current.idx = index;

            }

             if (e.type === 'mouseup' && arr.length === 0) {
                  wheel.changeItem(
                    this.chartLabels[this.current.idx],
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
                    this.chartLabels[this.current.idx],
                    this.getValueFromPoint(e.layerX, e.layerY)
                );
            }

            if (e.type === 'mouseup' && this.current.drag) {
                this.current.drag = false;

                const roundedValue = Math.round(this.wheel[this.current.label]);
                this.wheel.changeItem(this.current.label, roundedValue);
            }
        }
    },
    mounted() {
        initData.options.onHover = this.handleClick;

        this.createChart('coffee-wheel', initData);
        this.dataAngles = [...
          [...Array(Object.keys(this.wheel).length).keys()].map(
            index => this.chart.scale.getIndexAngle(index)
        ),
        2*Math.PI];
        console.log(this.dataAngles);
    }
};
</script>

<style scoped>
</style>
