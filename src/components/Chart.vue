<template>
    <div id='container'>
        <canvas id='coffee-wheel'></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js';

import wheel from '../models/wheel';

const fillColor = 'rgb(255, 203, 15, 0.4)';
const borderColor = 'rgb(255, 199, 0)';

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
            display: false,
        },
        tooltips: {
            enabled: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scale: {
            pointLabels :{
               fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
               fontStyle: "italic",
               fontSize: 20,
               padding: 20,
            },
            ticks: {
                max: 5,
                min: 0,
                stepSize: 1,
                fontSize: 15
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
        getValueFromPoint(x, y) {
            const { scale } = this.chart;
            const angleRad = scale.getIndexAngle(this.current.idx);
            let dist;
            if (angleRad === Pi / 2 || angleRad === (3 * Pi) / 2) {
                dist = (x - scale.xCenter) / Math.sin(angleRad);
            } else {
                dist = (scale.yCenter - y) / Math.cos(angleRad);
            }

            const scalingFactor = scale.drawingArea / (scale.max - scale.min);
            const value = dist / scalingFactor + scale.min;

            const { max, min } = scale;
            if (value > max) return max;
            if (value < min) return min;
            return value;
        },
        getAngleFromCords(x, y) {
            const { scale } = this.chart;
            const x0 = scale.xCenter;
            const y0 = scale.yCenter;

            // calculating rad for X and Y
            let angle;
            if (scale.yCenter - y > 0) {
                angle = Math.atan2(y0 - y, x - x0);
            } else {
                angle = Math.atan2(y0 - y, x - x0) + 2 * Pi;
            }
            // converting angle: invert and move zero
            return (2 * Pi - angle + Pi / 2) % (2 * Pi);
        },
        getIndexFromAngle(angle) {
            if (angle > 2 * Pi - Pi / this.dataAngles.length) {
                return 0;
            } else {
                const angleDiff = this.dataAngles.map(da =>
                    Math.abs(da - angle)
                );
                return angleDiff.indexOf(Math.min(...angleDiff));
            }
        },
        handleClicking(e, arr) {
            if (e.type === 'mousedown' && arr.length === 0) {
                const angle = this.getAngleFromCords(e.layerX, e.layerY);
                this.current.idx = this.getIndexFromAngle(angle);
            }
            if (e.type === 'mouseup' && !this.current.drag) {
                wheel.changeItem(
                    this.dataLabels[this.current.idx],
                    Math.round(this.getValueFromPoint(e.layerX, e.layerY))
                );
            }
        },
        hangdleDragging(e, arr) {
            if (e.type === 'mousedown' && arr.length !== 0) {
                this.current.drag = true;
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
        }
    },
    mounted() {
        initData.options.onHover = (e, arr) => {
            this.handleClicking(e, arr);
            this.hangdleDragging(e, arr);
        };

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
    height: 90vh;
    width:80vw;
}
</style>
