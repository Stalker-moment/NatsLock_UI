<!-- LineChart.vue -->
<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['chartData', 'options'],
  watch: {
    chartData: {
      immediate: true,
      handler(newChartData) {
        if (newChartData) {
          this.renderChart(newChartData, this.options);
        }
      }
    }
  },
  mounted() {
    if (this.chartData) {
      this.renderChart(this.chartData, this.options);
    }
  }
};
</script>
