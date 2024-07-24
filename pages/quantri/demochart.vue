<template>
  <div>
    <canvas id="myChart" style="width: 100%"></canvas>
    <canvas id="myChart1" style="width: 100%"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      xValues: [],
      yValues: [],
      barColors: [],
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    formatCurrency(value) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },

    async getData() {
      const res = await this.$axios.get(
        `/api/lokehoach/reportTrencackehoachnam`
      );
      this.data = res.data.luongcongdoantungkehoachnam;
      //   console.log(res.data.luongcongdoantungkehoachnam);
      // Định dạng tiền tệ cho từng phần tử trong dữ liệu
      // this.data = res.data.luongcongdoantungkehoachnam.map((item) => ({
      //   ...item,
      //   tongluongcongdoan: this.formatCurrency(item.tongluongcongdoan),
      // }));
      this.xValues = this.data.map((item) => item.kehoachnam);
      this.yValues = this.data.map((item) => item.tongluongcongdoan);
      // console.log(this.yValues);
      this.barColors = this.data.map(() => this.getRandomColor());
      // console.log(this.xValues);
      // console.log(this.yValues);
      this.renderChart();
      this.renderChart1();
    },

    renderChart() {
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.xValues,
          datasets: [
            {
              backgroundColor: this.barColors,
              data: this.yValues,
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Chart Title",
          },
        },
      });
    },

    renderChart1() {
      const ctx = document.getElementById("myChart1").getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: this.xValues,
          datasets: [
            {
              backgroundColor: this.barColors,
              data: this.yValues,
            },
          ],
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: "Chart Title",
          },
        },
      });
    },

    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
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
