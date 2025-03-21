<template>
  <div class="uphHoursReportNNKB">
    <el-form
      :inline="true"
      label-position="right"
      :model="form"
      class="form-bar"
      label-width="110"
    >
      <el-form-item label="lineId">
        <!-- <el-input :clearable="true" v-model="form.lineName" @blur="form.lineName=form.lineName.trim()"></el-input> -->
        <el-select
          v-model="form.lineId"
          clearable
          filterable
          placeholder="pleaseSelect"
          @change="form.segment = ''"
        >
          <el-option
            v-for="item in lineList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="segment">
        <!-- <el-input :clearable="true" v-model="form.lineName" @blur="form.lineName=form.lineName.trim()"></el-input> -->
        <el-select
          v-model="form.segment"
          clearable
          filterable
          placeholder="pleaseSelect"
          @click.native="getSegment"
        >
          <el-option
            v-for="item in segmentList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="结束时间">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
          align="center"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button @click="search" icon="el-icon-search" type="primary">search</el-button>
        <el-button @click="reset" icon="el-icon-refresh-right" type="primary">reset</el-button>
      </el-form-item>
    </el-form>

    <div id="uphHoursReportNNKBbox">
      <div v-show="fullscreen" class="fullscreen-info">
        <div>No.{{($route.path).slice(1)}} </div>
        <div>Copyright@ 电子事业群IT服务管理中心</div>
      </div>
      <!-- <div class="tb">
        <span v-show="fullscreen"><img src="@/assets/byd.png" alt="">&nbsp;&nbsp;</span>
        {{datetime}}
      </div>
      <span class="controlb">
        <label class="mr10">工单：{{shoporder}}&nbsp;&nbsp;&nbsp;&nbsp;{{countdown}}</label>
        <i class="el-icon-full-screen" @click="toggle"></i>
      </span> -->
      <div class="tb"><span v-show="fullscreen"><img src="@/assets/byd.png" alt="">&nbsp;&nbsp;</span>{{datetime}}</div>
      <span class="controlb"><label class="mr10">{{countdown}}</label><i class="el-icon-full-screen" @click="toggle"></i></span>
      <!-- <el-button @click="toggle" icon="el-icon-full-screen" type="primary">toggle</el-button> -->
      <div class="form-banner center">sora-kairi-UPH看板</div>

      <!-- <div class="board-header">
        <div class="board-header-item">
          <span>线体</span>
          <span>{{ lineName }}</span>
        </div>
        <div class="board-header-item">
          <span>段别</span>
          <span>{{ form.segment }}</span>
        </div>
      </div> -->

      <div class="board-grid">
        <WipDetail class="board-item board-item-wip" :tableData="wipTableData" :fullscreen="fullscreen" />
        <DriInfo class="board-item board-item-dri" :fullscreen="fullscreen" />
        <HoursTable 
          class="board-item board-item-hours"
          :tableData="hoursTableList"
          :columnList="columnList" 
          :standardUph="standardUph"
          @change-first="changeFirst"
          :fullscreen="fullscreen"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import * as echarts from "echarts";
// import _ from "lodash";
import moment from "moment";
const refreshsec = 30;
const colMax = 15; // 满屏最大可见列数
import tableMockData from "./tablemock.json";
import wipMockData from "./wipMock.json";
// import VueFullscreen from 'vue-fullscreen'
//   import Vue from 'vue'
//   Vue.use(VueFullscreen)
// import driInfoMockData from "./driInfoMock.json";
import VueFullscreen from 'vue-fullscreen'
export default {
  name: "uphHoursReportNNKB",
  components: {
    WipDetail: () => import("./WipDetail.vue"),
    DriInfo: () => import("./DriInfo.vue"),
    HoursTable: () => import("./HoursTable.vue"),
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    color: {
      type: String,
      default: "cyan",
      required: false,
    },
  },
  data() {
    return {
      form: {
        lineId: "",
        segment: "",
        endTime: "",
      },
      refreshTimer: null,
      wipTableData: wipMockData.DATA,
      hoursTableList: tableMockData.DATA,
      shoporder:"",
      columnList: tableMockData.LABEL,
      lineList: [],
      segmentList: [],
      // showTable: false,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      fullscreen: false,
      standardUph: {},
      datetime: "",
      itvTimer:null,
      // countdown:refreshsec,
      colIndex:0,
      interval:0,
      rowHeight:23,
      countTheLine:1,
      configStartDate: "",
      countdown: refreshsec,
      requestFinished: false,
    };
  },
  //   watch: {
  //     someValue: {
  //       handler: function (newVal, oldVal) {
  //         // this.renderOngoing(newVal);
  //         console.log('someValue changed, new val: ', newVal);
  //       },
  //       deep: true,
  //     },
  //   },
  computed: {
    lineName() {
      let n = "";
      this.lineList.forEach((el) => {
        if (el.id == this.form.lineId) n = el.name;
      });
      return n;
    },
    filterColumnList(){
      if(this.fullscreen){
        return this.columnList.slice(this.colIndex*colMax,(this.colIndex+1)*colMax)
      }else{
        return this.columnList;
      }
    }
  },
  created() {
    // this.getLineList();
    // this.getAuth(this.$route.path);
    // this.getConfigStartDate(); //获取系统参数DATE_START，用于校验查询条件开始日期的时间选项必须在DATE_START日期之后
    // this.startTimer();
  },
  mounted() {
    window.kk = this;
    window.ff = VueFullscreen;  
  },
  beforeRouteLeave(to, from, next) {
    if(this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
    next();
  },
  beforeDestroy() {
    if(this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  },
  methods: {
    rowStyle() {
      let styleJson = {}
      // let pxStr = this.rowHeight.toString() + "px"
      //       styleJson = {'height': pxStr}
       return styleJson  
    },
    getSegment() {
      let formParams = {};
      if (this.form.lineId) {
        formParams.lineId = this.form.lineId;
        this.$http.axios
          .post(`${this.$http.mes_url}keyProcess/getSegmentById`, formParams, {
            headers: {
              showError: false,
            },
          })
          .then(
            (res) => {
              this.segmentList = res.DATA;
            },
            (err) => {
              this.$message.error(err.MESSAGE);
            }
          );
      } else {
        this.$message.warning("请先选择线体");
      }
    },
    format(str) {
      return str.split("-").join("-\n");
    },
    getConfigStartDate(){
      this.$http.getConfigStartDate({currentPageNo:1,pageSize:10,name: "DATE_START"}).then((res) => {
        if(res.DATA.length > 0 && res.DATA[0].value){
          this.configStartDate = res.DATA[0].value;
        }
      });
    },
    search() {
      if (this.configStartDate && this.configStartDate.length > 0) {
        if (this.form.endTime) {
          if (
            Date.parse(this.form.endTime) < Date.parse(this.configStartDate)
          ) {
            this.$message.warning(
              `选择的结束时间必须在系统参数[DATE_START]:` +
                this.$root.timestamp2String(this.configStartDate) +
                `之后！`
            );
          } else {
            this.currentPage = 1;
            this.getUphHours();
            this.getWipTableData();
          }
        } else {
          this.$message.warning(`请选择结束时间！`);
        }
      } else {
        this.currentPage = 1;
        this.getUphHours();
        this.getWipTableData();
      }
    },
    getWipTableData() {
      this.$http.axios.get(`${this.$http.ms_url}mesShoporder/getShoporderWipByLine?lineName=${this.lineName}&startTime=${encodeURIComponent('2024-06-01 00:00:00')}&endTime=${encodeURIComponent(this.form.endTime)}`).then(response=>{
      // this.$http.getMockFile('wipMock.json').then(response => {
        this.wipTableData = response.DATA;
      });
    },
    getUphHours() {
      var formParam = {};
      if (this.form.lineId) {
        formParam.lineId = this.form.lineId;
      } else {
        this.$message.warning("线体不能为空");
        return;
      }
      if (this.form.segment) {
        formParam.segment = this.form.segment;
      }
      if (this.form.endTime) {
        formParam.endTime = this.form.endTime;
      }
      this.standardUph = {};
      this.$http.showLoading = true;
      this.requestFinished = false;
      this.err = "";
      // this.$http.getMockFile('tablemock.json').then(response => {
      this.$http.axios.post(`${this.$http.mes_url}mesSnLog/getUphHours`, formParam, {
        headers: {
          showError: false,
        },
      }).then(response => {
        this.hoursTableList = response.DATA;
        this.columnList = response.LABEL;
        this.getStanardUph(response.LABEL);
        this.countdown = refreshsec;
        if (this.refreshTimer) {
          clearInterval(this.refreshTimer);
        }
        this.refreshTimer = setInterval(() => {
          // this.getUphHours();
          this.countdown--;
          if (this.countdown <= 0) {
            this.countdown = refreshsec;
            // this.getUphHours();
            this.search();
          }
        }, 1000);
      });
    },
    reset() {
      this.form.lineId = "";
      // this.showTable = false;
      this.hoursTableList = [];
      this.wipTableData = [];
      this.standardUph = {};
    },
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },
    getLineList() {
      this.$http.axios
        .post(
          `${this.$http.mes_url}mesLine/getList`,
          {},
          {
            headers: {
              showError: false,
            },
          }
        )
        .then(
          (res) => {
            this.lineList = res.DATA;
          },
          (err) => {
            this.$message.error(err.MESSAGE);
          }
        );
    },
    statDateFormat(row) {
      if (row.STAT_DATE == "A_SUM") {
        return `sum`;
      } else if (row.STAT_DATE == "B_AVG") {
        return "UPH";
      } else if (row.STAT_DATE == "standardUph") {
        return "标准UPH";
      } else {
        return row.STAT_DATE;
      }
    },
    tableRowClassName(scope) {
      if (scope.rowIndex == "12") {
        return "primary";
      } else if (
        scope.row.STAT_DATE &&
        scope.row.STAT_DATE.substr(0, 2) == this.datetime.substr(11, 2)
      ) {
        return "currentRow";
      }
      return "";
    },
    headerRowClassName() {
      return "header1";
    },
    tableCellClassName(scope) {
      if (
        scope.rowIndex != 12 &&
        scope.rowIndex != 14 &&
        scope.columnIndex >= 1
      ) {
        if (
          scope.row[scope.column.label.replace(/\n/g, "")] != 0 &&
          scope.row[scope.column.label.replace(/\n/g, "")] <
            this.standardUph[scope.column.label.replace(/\n/g, "")]
        )
          return "nnkbdanger";
      }
      return "nnkbregular";
    },
    headerCellClassName() {
      // if(scope.columnIndex>1){
      //   console.log(scope)
      // }
      // return 'dangerbg'
    },
    getStanardUph(columnList) {
      var formParam = {};
      if (this.form.lineId) {
        formParam.lineId = this.form.lineId;
      }
      // this.$http.getMockFile("standardUph_getList.json").then(res =>{
      this.$http.axios
        .post(`${this.$http.mes_url}standardUph/getList`, formParam, {
          headers: {
            showError: false,
          },
        })
        .then(
          (res) => {
            var data = res.DATA;
            columnList.forEach((item) => {
              //如果没有值默认赋0
              if (!data[item]) {
                data[item] = 0;
              }
            });
            this.standardUph = data;
            this.hoursTableList.push(this.standardUph);
          },
          (err) => {
            this.$message.error(err.MESSAGE);
          }
        );
    },
    changeFirst(coloum, value) {
      var first = this.columnList[0];
      // console.log(coloum)
      // console.log(first)
      if (coloum == first) {
        this.columnList.forEach((item) => {
          this.standardUph[item] = value;
        });
      }
    },
    startTimer() {
      this.$http.getPV().then(res => {
        this.datetime = res.DATA.time;
        if(this.itvTimer) {
          clearInterval(this.itvTimer);
        }
        this.itvTimer = setInterval(() => {
          this.datetime = moment(this.datetime).add(1,'second').format("YYYY-MM-DD HH:mm:ss")
          // if(!this.form.endTime) {
            // if(this.countdown == 0) {
            //   this.countdown = refreshsec;
            //   this.getUphHours();
            // }
            // this.requestFinished && this.countdown--;
          // }
        }, 1000);
      });
    },
    toggle() {
      this.$fullscreen.toggle(document.getElementById('uphHoursReportNNKBbox'), {
        wrap: false,
        callback: (f) => {
          this.fullscreen = f;
        }
      })
    },
  },
};
</script>


<style scoped>
/* @import "../../../assets/board.css"; */
:deep(.el-table td.el-table__cell){
  background-color: #2a267e;
}
:deep(.el-table th.el-table__cell.is-leaf){
  background-color: #2a267e;
}
:deep(.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell){
  background-color: #39349a;
}
:deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell){
  background-color: #2a267e;
}
.uphHoursReportNNKB{

  /* --board-bg-color: #29257d; */
    width: 100%;
    height: 100%;
    background-color: var(--board-bg-color);
}
.board-grid{
    width: 100%;
    height: 750px;
    display: grid;
    grid-template-columns: 1fr 4fr ;
    grid-template-rows: 3fr 2fr ;
    grid-template-areas: 
    'wip hours'
    'dri hours';
    gap: 10px;
}
.fullscreen .board-grid{
    height: calc(100% - 150px);
}
.board-item{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.board-item-wip{
    /* background-color: #7aff3d; */
    grid-area: wip;
}
.board-item-dri{
    /* background-color: #983dff; */
    grid-area: dri;
}
.board-item-hours{
    /* background-color: #ff3d3d; */
    grid-area: hours;
    min-height: 0;
}
.fullscreen-info>div {
  position: absolute;
  bottom: 10px;
  z-index: 99;
  color: white;
  font-size: 18px;
}

.fullscreen-info>div:first-child {
  left: 20px;
}

.fullscreen-info>div:last-child {
  right: 20px;
}

.tb {
  color: #000000;
  font-weight: bolder;
}

#uphHoursReportNNKBbox.fullscreen .el-table {
  height: auto !important;
}

#uphHoursReportNNKBbox.fullscreen .el-table__body-wrapper {
  height: auto !important;
}
</style>


<style>
#uphHoursReportNNKBbox{background-color:#29257d}
#uphHoursReportNNKBbox .errMsg{color:red;font-size:large}
#uphHoursReportNNKBbox .controlb{color:#fff;font-size:24px;/*position:absolute;right:10px*/float:right}
#uphHoursReportNNKBbox .tb{/*position: absolute;*/float:left;
    color: #606266;
    margin-top: 6px;
    font-size: 14px;
    margin-left: 10px;}
#uphHoursReportNNKBbox.fullscreen{background-color:#002A80}
#uphHoursReportNNKBbox.fullscreen .el-table .cell{line-height: 40px;}
#uphHoursReportNNKBbox.fullscreen .el-table,#uphHoursReportNNKBbox.fullscreen .el-table--border::after,#uphHoursReportNNKBbox.fullscreen .el-table--group::after,#uphHoursReportNNKBbox.fullscreen .el-table::before{background-color:#202634;/*border-color:#394a73*/;font-size:1.5rem;}
#uphHoursReportNNKBbox.fullscreen .el-table tr{/*background-color:#202634!important;*/border-color:#ccc;height:55px}
#uphHoursReportNNKBbox.fullscreen .el-table th{background-color:#224EC1!important;font-size:2rem!important;color:#fff}
#uphHoursReportNNKBbox.fullscreen .el-table td,#uphHoursReportNNKBbox.fullscreen .el-table th.is-leaf{/*border-bottom-color:#394a73*/font-size:2rem;font-weight: bold;}
/* #uphHoursReportNNKBbox.fullscreen .el-table--striped .el-table__body tr.el-table__row--striped td{background-color:#2e364b} */
#uphHoursReportNNKBbox.fullscreen .form-banner{background-image:url("/flames-web/images/tvBanner.svg");background-size:100% 100px;background-repeat: no-repeat;background-color:transparent;/*color:#2d81c4;*/color:#fff;height:100px;line-height:100px;font-weight: bolder;font-size:2.2rem}
/* #uphHoursReportNNKBbox.fullscreen tr.highlight,#uphHoursReportNNKBbox.fullscreen tr.highlight:hover,#uphHoursReportNNKBbox.fullscreen tr.highlight:hover>td{background-color:#fff!important;color:#224EC1} */
/* #uphHoursReportNNKBbox.fullscreen tr:hover,#uphHoursReportNNKBbox.fullscreen tr:hover>td{background-color:#224EC1!important} */
#uphHoursReportNNKBbox.fullscreen .tb{position: absolute;
    color: #39a1f6;
    font-size: 2rem;
    margin-left: 10px;}
#uphHoursReportNNKBbox.fullscreen .controlb{margin-top:6px;font-size:2rem}
#uphHoursReportNNKBbox.fullscreen .el-input__inner{
    /* background-color:#224EC1; */
    color:#000;
    font-weight:bold;
    text-align:center;
    font-size:2rem}
#uphHoursReportNNKBbox.fullscreen .el-table{color:#000}
#uphHoursReportNNKBbox.fullscreen .font25 .cell{font-size:25px}
#uphHoursReportNNKBbox.fullscreen .font20 .cell{font-size:19px}



#uphHoursReportNNKBbox.fullscreen td.el-table__cell {
  background-color:#002A80;
  color:#fff;
  /* border-width: 0; */
}
#uphHoursReportNNKBbox.fullscreen .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
  background-color:#224EC1;
  color:#fff;
  /* border-width: 0; */
}
#uphHoursReportNNKBbox.fullscreen .el-table--border, .el-table--group{
  border-width: 0;
}

#uphHoursReportNNKBbox.fullscreen .fullWipDetail .el-table td, #uphHoursReportNNKBbox.fullscreen .fullWipDetail .el-table th.is-leaf {
  font-size: 12px !important;
}

body{
  --board-bg-color: #29257d;
  background-color: var(--board-bg-color);
}
.el-input__inner{
  background-color: #29257d;
  color: #fff;
}
.el-select-dropdown{
  background-color: #29257d;
  color: #fff;
}
</style>