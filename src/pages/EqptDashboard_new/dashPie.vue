<template>
  <div class="dash-pie">
    <div ref="pieChart" style="min-width: 300px; min-height: 300px"></div>
    <div class="pie-legend">
      <div class="legend-item">
        <div class="legend-text">正常: {{ pieData.normal }}x</div>
      </div>
      <div class="legend-item">
        <div class="legend-text">异常: {{ pieData.error }}x</div>
      </div>
      <div class="legend-item">
        <div class="legend-text">停机: {{ pieData.stop }}x</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "DashPie",
  props: {
    pieData: {
      type: Object,
      required: true,
      default: () => {
        return {
          normal: 0,
          error: 0,
          stop: 0,
        };
      },
    },
  },
  data() {
    return {
      pieChart: null,
    };
  },
  computed: {},
  mounted() {
    this.initPieChart();
  },
  beforeDestroy() {
    this.pieChart.dispose();
  },
  methods: {
    initPieChart() {
      this.pieChart = echarts.init(this.$refs.pieChart);
      const option = {
        legend: {
          orient: "horizontal",
          // right: 10,
          // top: 20,
          top: "bottom",
          data: ["正常", "异常", "停机"],
          // formatter: function (name) {
          //   return name + ' 100x';
          // }
        },
        series: [
          {
            type: "pie",
            radius: ["35%", "60%"],
            data: [
              {
                name: "正常",
                value: this.pieData.normal,
                itemStyle: { color: "#4CAF50" },
              },
              {
                name: "异常",
                value: this.pieData.error,
                // itemStyle: { color: "#FFC107" },
                itemStyle: { color: "yellow" },
              },
              {
                name: "停机",
                value: this.pieData.stop,
                // itemStyle: { color: "#F44336" },
                itemStyle: { color: "red" },
              },
            ],
            label: {
              show: false,
              formatter: "{b}: {c}",
              // position: 'inside'
            },
          },
        ],
      };
      this.pieChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.dash-pie {
  display: flex;
  justify-content: center;
}
.pie-legend {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* margin-left: 20px; */
  font-weight: bold;
}
</style>
