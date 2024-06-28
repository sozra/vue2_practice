<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">设备状态监控</h1>
      <div class="grid grid-cols-3 gap-4">
        <el-card>
          <div slot="header">
            <span>设备状态概览</span>
          </div>
          <div>
            <div ref="pieChart" style="height: 300px;"></div>
            <div class="mt-4">
              <p>正常: 100x</p>
              <p>异常: 15x</p>
              <p>停机: 10x</p>
            </div>
          </div>
        </el-card>
        <el-card class="col-span-2">
          <div slot="header">
            <span>工站状态</span>
          </div>
          <div class="grid grid-cols-8 gap-2">
            <div v-for="station in stations" :key="station" class="text-center">
              <div class="w-6 h-6 bg-green-500 rounded-full mx-auto mb-1"></div>
              <p class="text-sm">{{ station }}</p>
              <div class="grid grid-cols-2 gap-1 mt-1">
                <div v-for="i in 8" :key="i" class="w-full h-4 bg-green-300"></div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-card class="mt-4">
        <div slot="header">
          <span>异常报警</span>
        </div>
        <div>
          <el-alert
            v-for="(alert, index) in alerts"
            :key="index"
            title="警告"
            type="error"
            :description="alert"
            show-icon
            class="mb-2"
          ></el-alert>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    data() {
      return {
        data: [
          { name: '正常', value: 100, color: '#4CAF50' },
          { name: '异常', value: 15, color: '#FFC107' },
          { name: '停机', value: 10, color: '#F44336' }
        ],
        stations: [
          'TP001', 'TP010', 'TP020', 'TP030', 'TP040', 'TP050', 'TP060', 'TP070',
          'TP080', 'TP090', 'TP100', 'TP110', 'TP120', 'TP130', 'TP140'
        ],
        alerts: [
          'B5-5F-TP04 xxx工站 xxx机台异常',
          'B5-5F-TP04 xxx工站 xxx机台异常',
          'B5-5F-TP04 xxx工站 xxx机台异常',
          'B5-5F-TP04 xxx工站 xxx机台异常',
          'B5-5F-TP04 xxx工站 xxx机台异常'
        ]
      }
    },
    mounted() {
      this.initPieChart();
    },
    methods: {
      initPieChart() {
        var chart = echarts.init(this.$refs.pieChart);
        var option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: '设备状态',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 100, name: '正常', itemStyle: { color: '#4CAF50' } },
                { value: 15, name: '异常', itemStyle: { color: '#FFC107' } },
                { value: 10, name: '停机', itemStyle: { color: '#F44336' } }
              ]
            }
          ]
        };
        chart.setOption(option);
      }
    }
  }
  </script>
  
  <style scoped>
  .p-4 {
    padding: 1rem;
  }
  .grid {
    display: grid;
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, 1fr);
  }
  .gap-4 {
    gap: 1rem;
  }
  .mt-4 {
    margin-top: 1rem;
  }
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  .w-6 {
    width: 1.5rem;
  }
  .h-6 {
    height: 1.5rem;
  }
  .bg-green-500 {
    background-color: #4CAF50;
  }
  .rounded-full {
    border-radius: 9999px;
  }
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .mb-1 {
    margin-bottom: 0.25rem;
  }
  .text-sm {
    font-size: 0.875rem;
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .gap-1 {
    gap: 0.25rem;
  }
  .h-4 {
    height: 1rem;
  }
  .bg-green-300 {
    background-color: #81C784;
  }
  </style>
  