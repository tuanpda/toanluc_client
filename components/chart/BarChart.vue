<template>
  <div>
    <canvas ref="myChart" style="width: 100%; max-width: 600px"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    labels: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    backgroundColors: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  methods: {
    renderChart() {
      try {
        if (this.$refs.myChart) {
          new Chart(this.$refs.myChart.getContext("2d"), {
            type: "bar",
            data: {
              labels: this.labels,
              datasets: [
                {
                  backgroundColor: this.backgroundColors,
                  data: this.data,
                },
              ],
            },
            options: {
              legend: { display: false },
              title: {
                display: true,
                text: "World Wine Production 2018",
              },
            },
          });
        }
      } catch (error) {
        console.error("Error rendering chart:", error);
      }
    },
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  max-width: 600px;
}
</style>
