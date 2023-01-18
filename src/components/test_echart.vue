<template>
  <div class="test_template">
    <div id="cha"></div>
    <div id="cha2" ref="cha2"></div>
    <el-button @click="pauseFn" type="primary">{{pause}}</el-button>
  </div>
</template>


<script>
import * as echarts from "echarts";
import moment from 'moment';
export default {
  name: "test_template",
  components: {},
  data() {
    return {
      interval2: null,
      pause: "Play",
      income: [320, 302, 341, 374, 390, 450, 420],
      expenses: [-120, -132, -101, -134, -190, -230, -210],
      option: {
        title: {
          text: "实际每小时用电量 KW/H",
          // top: "-7",
        },
        legend: {
          top: "400",
        },
        tooltip: {},
        label: {
          show: true,
          offset: [0, -10],
        },
        dataset: {
          source: [],
        },
        xAxis: {
          type: "category",
        },
        yAxis: {},
        series: [
          {
            type: "bar",
          },
          {
            type: "line",
            lineStyle: {
              width: 10,
            },
            smooth: true,
            symbol: "circle",
            symbolSize: 20,
          },
        ],
        barWidth: 20,
      },
      option2: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        title: {
          text: "各阶段人员分布情况",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: {
              show: true,
              pixelRatio: 1,
              title: "保存图片",
              type: "png",
              lang: ["点击保存"],
            },
          },
        },
        legend: {
          data: ["Expenses", "Income"],
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
            axisLabel: {
              //把x轴的负数改成正数，毕竟对比不需要负数，如果需要负数把axisLabel删掉就行
              formatter: function (value) {
                if (value < 0) {
                  return -value;
                } else {
                  return value;
                }
              },
            },
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
        color: ["#3E95F5", "#F77A4D"],
        series: [
          {
            name: "Income",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              color: "#fff",
            },
            emphasis: {
              focus: "series",
            },
            data: this.income,
          },
          {
            name: "Expenses",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              // position: 'left',
              color: "#fff",
              formatter: function (value) {
                //把数据也转换成正数用的是负负为正，下面data里的数据就要是负数，如果需要负数把这段formatter删掉
                if (value.data < 0) {
                  return -value.data;
                }
              },
            },
            emphasis: {
              focus: "series",
            },
            data: this.expenses,
          },
        ],
      },
      source: [
        ["xdata", "实际用电量", "标准用电量"],
        ["1", 121, 0],
        ["2", 131, 0],
        ["3", 129, 0],
        ["4", 128, 0],
        ["5", 129, 0],
        ["6", 103, 0],
        ["7", 42, 0],
        ["8", 33, 10],
        ["9", 0, 0],
      ],
        echartsInstance1: null,
        echartsInstance2: null,
    };
  },
  computed: {},
  created() {},
  mounted() {
    let optionTmp = this.option;
    let instance = null;
    const sourceTmp = this.source;
    optionTmp.dataset.source = this.source;
    instance = echarts.init(document.getElementById("cha"));
    instance.setOption(optionTmp);

    setTimeout(function () {
      optionTmp.dataset.source = [];
      instance.setOption(optionTmp);
    }, 2000);
    setTimeout(function () {
      optionTmp.dataset.source = sourceTmp;
      instance.setOption(optionTmp);
    }, 4000);

    let optionTmp2 = this.option2;
    optionTmp2.series[0].data = this.income;
    optionTmp2.series[1].data = this.expenses;
    this.echartsInstance2 = echarts.init(this.$refs['cha2']);
    this.echartsInstance2.setOption(optionTmp2);

// for every 2 seconds, update the data with random value
    // this.interval2 = setInterval(() => {
    //   this.income = this.income.map((item) => Math.ceil(Math.random()*100));
    //   this.expenses = this.expenses.map((item) => 0 - Math.ceil(Math.random()*100));
    // }, 2000);

  },
  methods: {
    pauseFn() {
      if (this.interval2 !== null) {
        clearInterval(this.interval2);
        this.interval2 = null;
        this.pause = 'Play';
      }
      else {
        this.interval2 = setInterval(() => {
          this.income = this.income.map((item) => Math.ceil(Math.random()*100));
          this.expenses = this.expenses.map((item) => 0 - Math.ceil(Math.random()*100));
        }, 2000);
        this.pause = 'Pause';
      
    }
    }
  },
watch: {
    income: function (val) {
      let optionTmp2 = this.option2;
      optionTmp2.series[0].data = val;
      optionTmp2.yAxis[0].data.shift();
      optionTmp2.yAxis[0].data.push(moment(new Date(1500035474800+Math.random()*899999999+100000000)).format('l'))
      this.echartsInstance2.setOption(optionTmp2);
    },
    expenses: function (val) {
      let optionTmp2 = this.option2;
      optionTmp2.series[1].data = val;
      optionTmp2.yAxis[0].data.shift();
      optionTmp2.yAxis[0].data.push(moment(new Date(1500035474800+Math.random()*899999999+100000000)).format('l'))
      this.echartsInstance2.setOption(optionTmp2);
    },
}
};
</script>


<style scoped>
#cha,
#cha2 {
  height: 300px;
  width: 500px;
}
</style>