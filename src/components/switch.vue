<template>
  <div>
    <div id="cha1"></div>
    <el-button @click="switchOption">Switch</el-button>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "switch",
  data() {
    return {
      currentOption: 1,
      chartInstance: null,
      option_1: {
        angleAxis: {
          max: 2,
          startAngle: 30,
          splitLine: {
            show: false,
          },
        },
        radiusAxis: {
          type: "category",
          data: ["v", "w", "x", "y", "z"],
          z: 10,
        },
        polar: {},
        series: [
          {
            type: "bar",
            data: [4, 3, 2, 1, 0],
            coordinateSystem: "polar",
            name: "Without Round Cap",
            itemStyle: {
              borderColor: "red",
              opacity: 0.8,
              borderWidth: 1,
            },
          },
          {
            type: "bar",
            data: [4, 3, 2, 1, 0],
            coordinateSystem: "polar",
            name: "With Round Cap",
            roundCap: true,
            itemStyle: {
              borderColor: "green",
              opacity: 0.8,
              borderWidth: 1,
            },
          },
        ],
        legend: {
          show: true,
          data: ["Without Round Cap", "With Round Cap"],
        },
      },
      option_2: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Profit", "Expenses", "Income"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
          },
        ],
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        series: [
          {
            name: "Profit",
            type: "bar",
            label: {
              show: true,
              position: "inside",
            },
            emphasis: {
              focus: "series",
            },
            data: [200, 170, 240, 244, 200, 220, 210],
          },
          {
            name: "Income",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 302, 341, 374, 390, 450, 420],
          },
          {
            name: "Expenses",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              position: "left",
            },
            emphasis: {
              focus: "series",
            },
            data: [-120, -132, -101, -134, -190, -230, -210],
          },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderEcharts();
    });
    // var myChart = echarts.init(document.getElementById("cha1"));
    // var option = {
    //   title: {
    //     text: "ECharts 入门示例",
    //   },
    //   tooltip: {},
    //   legend: {
    //     data: ["销量"],
    //   },
    //   xAxis: {
    //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: "销量",
    //       type: "bar",
    //       data: [5, 20, 36, 10, 10, 20],
    //     },
    //   ],
    // };
    // myChart.setOption(option);
  },
  methods: {
    switchOption() {
      this.currentOption = this.currentOption === 1 ? 2 : 1;
      this.renderEcharts();
    },
    renderEcharts() {
      if (!this.chartInstance) {
        this.chartInstance = echarts.init(document.getElementById("cha1"));
      } else {
        this.chartInstance.clear();
      }
      this.$nextTick(() => {
        this.chartInstance.setOption(this["option_" + this.currentOption]);
      });
    },
  },
};
</script>

<style scoped>
#cha1 {
  width: 600px;
  height: 400px;
}
</style>
