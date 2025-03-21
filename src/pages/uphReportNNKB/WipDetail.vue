<template>
    <div class="WipDetail" :class="{fullWipDetail:fullscreen}">
        <div class="WipDetail-title">产线当前生产状态</div>
        <el-table :data="tableData" style="width: 100%;" height="100%">
           <!-- 工单 下达 已投 未投 wip -->
           <el-table-column align="center" show-overflow-tooltip prop="shoporder" label="工单" min-width="120" />
           <el-table-column align="center" show-overflow-tooltip prop="shoporderQty" label="下达" width="50" />
           <el-table-column align="center" show-overflow-tooltip prop="inputQty" label="已投" width="50" />
           <el-table-column align="center" show-overflow-tooltip prop="withoutQty" label="未投" width="50" />
           <el-table-column align="center" show-overflow-tooltip prop="wip" label="wip" width="50" />
        </el-table>
    </div>
  </template>
  
  <script>
  // import * as echarts from "echarts";
  // import _ from "lodash";
  // import moment from "moment";
  export default {
    name: "WipDetail",
    components: {
    },
    props: {
    tableData: {
        type: Array,
        default: () => {
          return [];
        },
      },
      fullscreen: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
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
    //   computed: {
    //     pageType() {
    //       return this.$store.state.pageType;
    //     },
    //   },
    created() {},
    mounted() {
      window.kk = this;
    },
    methods: {},
  };
  </script>

<style scoped>
.WipDetail{
    width: 100%;
    height: 100%;
    /* background-color: #983dff; */
}
.fullWipDetail{
    background-color: #002A80;
    color: #fff;
}
.WipDetail-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    flex-shrink: 0;
}
.fullWipDetail .WipDetail-title{
  background: #224EC1;
  padding: 20px;
}
.fullWipDetail :deep( .el-table__body-wrapper) {
  scrollbar-color: lightblue #002A80;
}

.fullWipDetail{background-color:#002A80}
.fullWipDetail .el-table .cell{line-height: 20px;}
.fullWipDetail .el-table,.fullWipDetail .el-table--border::after,.fullWipDetail .el-table--group::after,.fullWipDetail .el-table::before{background-color:#202634;/*border-color:#394a73*/;font-size:1.5rem;}
.fullWipDetail .el-table tr{/*background-color:#202634!important;*/border-color:#ccc;height:55px}
.fullWipDetail .el-table th{background-color:#224EC1!important;font-size:12px !important;color:#fff}
.fullWipDetail .el-table td,.fullWipDetail .el-table th.is-leaf{/*border-bottom-color:#394a73*/font-size:12px !important;font-weight: bold;}
/* .fullWipDetail .el-table--striped .el-table__body tr.el-table__row--striped td{background-color:#2e364b} */
.fullWipDetail .form-banner{background-image:url("/flames-web/images/tvBanner.svg");background-size:100% 100px;background-repeat: no-repeat;background-color:transparent;/*color:#2d81c4;*/color:#fff;height:100px;line-height:100px;font-weight: bolder;font-size:2.12px !important}
/* .fullWipDetail tr.highlight,.fullWipDetail tr.highlight:hover,.fullWipDetail tr.highlight:hover>td{background-color:#fff!important;color:#224EC1} */
/* .fullWipDetail tr:hover,.fullWipDetail tr:hover>td{background-color:#224EC1!important} */
.fullWipDetail .tb{position: absolute;
    color: #39a1f6;
    font-size: 12px !important;
    margin-left: 10px;}
.fullWipDetail .controlb{margin-top:6px;font-size:12px !important}
.fullWipDetail .el-input__inner{
    /* background-color:#224EC1; */
    color:#000;
    font-weight:bold;
    text-align:center;
    font-size:12px !important}
.fullWipDetail .el-table{color:#000}
.fullWipDetail .font25 .cell{font-size:25px}
.fullWipDetail .font20 .cell{font-size:19px}





</style>