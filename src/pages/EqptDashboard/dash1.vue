<template>
    <div class="equipment-monitoring-dashboard">
      <h1>设备状态监控</h1>
      <!-- <el-row :gutter="20"> -->
        <div class="dashboard-grid">
        <!-- <el-row> -->
        <!-- <el-col :span="6"> -->
          <!-- <el-row> -->

            <el-card class="card-status-pie">
              <div slot="header">设备状态概览</div>
              <div ref="pieChart" style="width: 100%; height: 300px;"></div>
              <div class="mt-4">
                <p>正常: 100x</p>
                <p>异常: 15x</p>
                <p>停机: 10x</p>
              </div>
            </el-card>
          <!-- </el-row> -->
          <!-- <el-row :gutter="20"> -->
          
          <!-- </el-row> -->
        <!-- </el-col> -->
        <!-- <el-col :span="18"> -->
          <!-- <el-row :gutter="24"> -->
          <el-card class="card-station-status">
            <div slot="header">工站状态</div>
            <!-- <div class="stationContainer">
              <div class="line"></div>
              <el-row :gutter="10">
                <el-col :span="3" v-for="station in stations" :key="station">
                  <div class="station-status">
                    <div class="status-indicator"></div>
                    <p>{{ station }}</p>
                    <el-row :gutter="5">
                      <el-col :span="12" v-for="i in 8" :key="i">
                        <div class="sub-status"></div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div> -->
            <StationGrids :stations="stations" />
          </el-card>
          <!-- </el-row> -->
          <el-card class="card-alert">
            <div slot="header">异常报警</div>
            <el-alert
              v-for="(alert, index) in alerts"
              :key="index"
              :title="alert"
              type="error"
              :closable="false"
              show-icon
            >
            </el-alert>
          </el-card>
        <!-- </el-col> -->
        <!-- </el-row> -->
      <!-- </el-row> -->
    </div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  // import StationGrids from './dashStationGrids.vue';
  
  export default {
    name: 'EquipmentMonitoringDashboard',
    components: {
      StationGrids: () => import('./dashStationGrids.vue'),
    },
    data() {
      return {
        stations: [
          'TP010', 'TP020', 'TP030', 'TP040', 'TP050', 'TP060', 'TP070',
          'TP080', 'TP090', 'TP100', 'TP110', 'TP120', 'TP130', 'TP140', 'TP150'
        ],
        alerts: [
          'B5-5F-TP04 xxx工站 xxx机台异常',
          'B5-5F-TP04 xxx工站 xxx机台异常',
          'B5-5F-TP04 xxx工站 xxx机台异常',
          'B5-5F-TP04 xxx工站 xxx机台异常',
          'B5-5F-TP04 xxx工站 xxx机台异常',
        ],
        pieChart: null
      };
    },
    mounted() {
      this.initPieChart();
    },
    methods: {
      initPieChart() {
        this.pieChart = echarts.init(this.$refs.pieChart);
        const option = {
          series: [
            {
              type: 'pie',
              radius: '60%',
              data: [
                { name: '正常', value: 100, itemStyle: { color: '#4CAF50' } },
                { name: '异常', value: 15, itemStyle: { color: '#FFC107' } },
                { name: '停机', value: 10, itemStyle: { color: '#F44336' } },
              ],
              label: {
                show: true,
                formatter: '{b}: {c}'
              }
            }
          ]
        };
        this.pieChart.setOption(option);
      }
    },
    beforeDestroy() {
      if (this.pieChart) {
        this.pieChart.dispose();
      }
    }
  };
  </script>
  
  <style scoped>
  .equipment-monitoring-dashboard {
    padding: 0 20px;
  }
  .mt-4 {
    margin-top: 16px;
  }
  /* .station-status {
    text-align: center;
  }
  .status-indicator {
    width: 24px;
    height: 24px;
    background-color: #4CAF50;
    border-radius: 50%;
    margin: 0 auto 4px;
  }
  .sub-status {
    width: 100%;
    height: 16px;
    background-color: #81C784;
    margin-bottom: 4px;
  }
  .stationContainer {
    position: relative;
  } */

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: repeat(3, minmax(100px, auto));
    grid-template-areas: 
      "card-status-pie card-station-status"
      "card-status-pie card-station-status"
      "card-alert card-station-status";
    grid-gap: 20px;

  }
  .card-status-pie {
    grid-area: card-status-pie; 
  }
  .card-station-status {
    grid-area: card-station-status; 
  }
  .card-alert {
    grid-area: card-alert; 
  }

  </style>