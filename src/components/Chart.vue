<template>
    <canvas id="planet-chart"></canvas>
</template>

<script>
import Chart from 'chart.js';

import wheel from '../models/wheel';

export default {
    name: 'Chart',
    computed: {
      chartData: () => ({
                labels: Object.keys(wheel),
                datasets: [
                    {
                        pointStyle: 'circle',
                        pointRadius: 10,
                        label: 'coffeewheel',
                        data: Object.values(wheel)
                    }
                ],
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }
            })
    },
    data: () => ({
        wheel
    }),
    beforeUpdate(){console.log(this.chartData)},
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
        this.createChart('planet-chart', {data: this.chartData});
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->Ž
<style scoped>
</style>
