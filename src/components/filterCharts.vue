<template>
  <div>
    <div id="barChart" style="width: 600px;height:400px;"></div>
    <div id="pieChart" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      barData: {
        xAxis: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
        yAxis: [23, 44, 55, 26, 88],
      },
      pieData: [
        { value: 23, name: "Apple" },
        { value: 44, name: "Banana" },
        { value: 55, name: "Cherry" },
        { value: 26, name: "Date" },
        { value: 88, name: "Elderberry" },
      ],
    };
  },
  mounted() {
    window.ee = echarts;
    this.$nextTick(() => {
    //   this.renderEcharts();
    this.initBarChart();
    this.initPieChart();
    });
  },
  methods: {
    initBarChart() {
      const barChart = echarts.init(document.getElementById("barChart"));
      const option = {
        toolbox: {
          feature: {
            myTool: {
              show: true,
              title: 'Reset',
              icon: 'path://M512 85.333333c-235.733333 0-426.666667 192-426.666667 426.666667s192 426.666667 426.666667 426.666667 426.666667-192 426.666667-426.666667-192-426.666667-426.666667-426.666667z m0 768c-188.586667 0-341.333333-152.746667-341.333333-341.333333s152.746667-341.333333 341.333333-341.333333 341.333333 152.746667 341.333333 341.333333-152.746667 341.333333-341.333333 341.333333z m-93.333333-512-85.333334 85.333333 178.773333 178.773334-178.773333 178.773333 85.333334 85.333333 178.773333-178.773333 178.773334 178.773333 85.333333-85.333333-178.773333-178.773333 178.773333-178.773334-85.333333-85.333333-178.773334 178.773334z',
              onclick: () => {
                this.resetBarChart();
              }
            },
          }
        },
        xAxis: {
          type: "category",
          data: this.barData.xAxis,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.barData.yAxis,
            type: "bar",
          },
        ],
      };
      barChart.setOption(option);
      barChart.on("click", this.handleBarClick);
    },
    initPieChart() {
      const pieChart = echarts.init(document.getElementById("pieChart"));
      const option = {
        series: [
          {
            type: "pie",
            data: this.pieData,
          },
        ],
      };
      pieChart.setOption(option);
    },
    handleBarClick(params) {
      // 获取点击的 X 轴数据
      const xAxisName = params.name;

      // 实现柱体的高亮逻辑
      const barChart = echarts.init(document.getElementById("barChart"));
      const seriesData = this.barData.yAxis.map((value, index) => {
        return {
          value,
          itemStyle: {
            color: this.barData.xAxis[index] === xAxisName ? "red" : "#ccc",
          },
        };
      });
      barChart.setOption({
        series: [
          {
            data: seriesData,
          },
        ],
      });

      // 更新饼图逻辑
      // ... 可以在这里根据业务需求来更新 pieData，并重新 setOption
      // 例如：假设点击 'Apple'，则只展示与 'Apple' 相关的饼图数据
      const filteredPieData = this.pieData.filter((item) => item.name === xAxisName);
      const pieChart = echarts.init(document.getElementById("pieChart"));
      pieChart.setOption({
        series: [
          {
            data: filteredPieData,
          },
        ],
      });
    },
    resetBarChart() {
      // 重置柱状图到未点击状态
      const seriesData = this.barData.yAxis.map((value) => ({ value }));
      const barChart = echarts.init(document.getElementById("barChart"));
      barChart.setOption({
        series: [
          {
            data: seriesData,
          },
        ],
      });

      // 重置饼图到未点击状态
      const pieChart = echarts.init(document.getElementById("pieChart"));
      pieChart.setOption({
        series: [
          {
            data: this.pieData,
          },
        ],
      });
    },
  },
};
</script>
