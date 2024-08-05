<template>
  <div class="equipment-monitoring-dashboard">
    <div id="dashboard_full">
      <div class="form-banner center">
        设备状态监控
        <span><i class="el-icon-full-screen" @click="toggle"></i></span>
      </div>
      <el-form v-show="!fullscreen" :inline="true" :model="form">
        <el-form-item label="线体名称">
          <el-select
            v-model="form.lineName"
            placeholder="请选择线体名称"
            clearable
            filterable
          >
            <el-option
              v-for="item in lineNameOptions"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button @click="getData">查询</el-button>
      </el-form>
      <div class="dashboard-grid">
        <div class="card-status-pie">
          <DashPie :pieData="pieData" />
        </div>
        <div class="card-station-status">
          <ProcessGrids :process="processData" :fullscreen="fullscreen" />
        </div>
        <div class="card-alert">
          <dash-list :errorList="errorList" :fullscreen="fullscreen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { generateRandomTestData } from "./stationMock.js";
import _ from "lodash";
// import * as echarts from "echarts";
// import DashList from "./dashList.vue";
// import ProcessGrids from './dashProcessGrids.vue';

export default {
  name: "EquipmentMonitoringDashboard",
  components: {
    ProcessGrids: () => import("./processGrids.vue"),
    DashList: () => import("./dashList.vue"),
    DashPie: () => import("./dashPie.vue"),
  },
  data() {
    return {
      form: {
        lineName: "",
      },
      lineNameOptions: [],
      processData: [],
      row1List: [],
      row2List: [],
      row3List: [],
      fullscreen: false,
      refreshInterval: null,
      refreshTime: 60,
      pieChart: null,
      pieData: {
        normal: 0,
        error: 0,
        stop: 0,
      },
    };
  },
  computed: {
    errorList() {
      // return _.filter(this.processData.slice(0,45).processList, { status: "stop" });
      let arr = [];
      this.processData.forEach((process) => {
        process.stationList.forEach((station) => {
          if (station.status === "stop") {
            arr.push({
              processName: process.processName,
              stationName: station.stationName,
            });
          }
        });
      });
      return arr;
    },
  },
  mounted() {
    window.kk = this;
    // window.qq = generateRandomTestData;
    this.getLineNameOptions();
    // this.getData();
  },
  methods: {
    getData() {
      if (!this.form.lineName) {
        this.$message.error("请选择线体名称");
        return;
      }
      this.$http.axios
        .post("ms/api/mesStationStatusMaintain/stationStatusReport", {
          lineName: this.form.lineName,
        })
        .then((res) => {
          // this.$http.getMockFile("dash.json").then((res) => {
          // console.log(res);
          if (res.RESULT === "PASS") {
            this.processData = res.DATA.processList;
            this.row1List = this.processData.slice(0, 15);
            this.row2List = this.processData.slice(15, 30);
            this.row3List = this.processData.slice(30, 45);
            this.calcPieData();
            // this.initPieChart();
          }
        });
    },
    calcPieData() {
      let normalCount = 0;
      let errorCount = 0;
      let stopCount = 0;
      this.processData.forEach((process) => {
        process.stationList.forEach((station) => {
          if (station.status === "normal") {
            normalCount++;
          } else if (station.status === "error") {
            errorCount++;
          } else if (station.status === "stop") {
            stopCount++;
          }
        });
      });
      this.pieData = {
        normal: normalCount,
        error: errorCount,
        stop: stopCount,
      };
    },
    getLineNameOptions() {
      this.$http.axios
        .post("mes/api/mesLine/getList", {})
        .then((res) => {
          this.lineNameOptions = _.uniq(res.DATA.map((item) => item.name));
        });
    },
    toggle() {
      console.log(1111);
      let self = this;
      this.$fullscreen.toggle(document.getElementById("dashboard_full"), {
        wrap: false,
        callback: (f) => {
          this.fullscreen = f;
          if (f) {
            let height = document.body.clientHeight - 18;
            self.rowHeight = height / 16;
            if (this.refreshInterval) {
              clearInterval(this.refreshInterval);
              this.refreshInterval = setInterval(() => {
                this.getData();
              }, this.refreshTime * 1000);
            }
          } else {
            self.rowHeight = 23;
            if (this.refreshInterval) {
              clearInterval(this.refreshInterval);
            }
          }
        },
      });
    },
  },
  beforeDestroy() {
    if (this.pieChart) {
      this.pieChart.dispose();
    }
  },
};
</script>

<style scoped>
#dashboard_full {
  background-color: #ffffff;
  padding: 0 30px;
}
#dashboard_full .controlb {
  color: #fff;
  font-size: 24px; /*position:absolute;right:10px*/
  float: right;
}
#dashboard_full .tb {
  /*position: absolute;*/
  float: left;
  color: #606266;
  margin-top: 6px;
  font-size: 14px;
  margin-left: 10px;
}
/* #dashboard_full.fullscreen {
  background-color: #202634;
} */
#dashboard_full.fullscreen .el-table .cell {
  line-height: 40px;
}
#dashboard_full.fullscreen .el-table tr {
  /*background-color:#202634!important;*/
  border-color: #ccc;
  height: 55px;
}
#dashboard_full.fullscreen .el-table th {
  background-color: #3aa3f9 !important;
  font-size: 1.2rem !important;
  color: #fff;
}
#dashboard_full.fullscreen .el-table td,
#dashboard_full.fullscreen .el-table th.is-leaf {
  /*border-bottom-color:#394a73*/
  font-size: 1.2rem;
  font-weight: bold;
}
/* #dashboard_full.fullscreen .el-table--striped .el-table__body tr.el-table__row--striped td{background-color:#2e364b} */
#dashboard_full.fullscreen .form-banner {
  /* background-image: url("../../../public/images/tvBanner.svg"); */
  background-image: url("/public/img/tvBanner.svg");
  background-size: 100% 100px;
  background-repeat: no-repeat;
  background-color: transparent; /*color:#2d81c4;*/
  color: #000;
  height: 100px;
  line-height: 100px;
  font-weight: bolder;
  font-size: 2.2rem;
}
#dashboard_full.fullscreen tr.highlight,
#dashboard_full.fullscreen tr.highlight:hover,
#dashboard_full.fullscreen tr.highlight:hover > td {
  background-color: #fff !important;
  color: #3aa3f9;
}
#dashboard_full.fullscreen tr:hover,
#dashboard_full.fullscreen tr:hover > td {
  background-color: #3aa3f9 !important;
}
#dashboard_full.fullscreen .tb {
  position: absolute;
  color: #39a1f6;
  font-size: 2rem;
  margin-left: 10px;
}
#dashboard_full.fullscreen .controlb {
  margin-top: 6px;
  font-size: 2rem;
}
#dashboard_full.fullscreen .el-input__inner {
  /* background-color:#3aa3f9; */
  color: #000;
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
}
#dashboard_full.fullscreen .el-table {
  color: #000;
}
#dashboard_full.fullscreen .font25 .cell {
  font-size: 25px;
}
#dashboard_full.fullscreen .font20 .cell {
  font-size: 19px;
}

.mainTable .low {
  background-color: rgb(255, 97, 97);
}
.mainTable .reach {
  background-color: rgb(98, 255, 98);
}
.mainTable .high {
  background-color: rgb(255, 166, 0);
}

:not(.fullscreen) .form-banner {
  height: 50px;
  line-height: 50px;
  font-size: 2rem;
}
</style>

<style scoped>
.equipment-monitoring-dashboard {
  padding: 0 20px;
}
.mt-4 {
  margin-top: 16px;
}

.dashboard-grid {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(3, minmax(1fr, 100px));
  grid-template-areas:
    "card-status-pie card-station-status"
    "card-alert card-station-status"
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
  /* max-height: 500px; */
  /* overflow-y: scroll; */
}
</style>
