<template>
  <div class="hours-table-container" :class="{fullHoursTable:fullscreen}">
    <div style="position: absolute; top: 0; left: 0; z-index: 1000;color: #fff">{{ headerTooltip }}</div>
    <el-table 
      stripe 
      border
      :data="tableData" 
      :loading="loading"
      class="hours-table"
      height="100%"
      ref="table"
      :row-style="rowStyle"
      :row-class-name="tableRowClassName"
      :header-row-class-name="headerRowClassName"
      :cell-class-name="tableCellClassName"
    >
      <el-table-column 
        v-if="false"
        show-overflow-tooltip 
        type="index" 
        label="id" 
        align="center" 
        width="70"
        :index="indexMethod"
      />
      
      <el-table-column 
        align="center" 
        prop="STAT_DATE" 
        label="statDate" 
        width="200"
        :formatter="statDateFormat"
      />

      <el-table-column 
        v-for="item in filterColumnList" 
        :key="item.$index"
        :label="(item)"
        align="center"
        :width="fullscreen ? '60px' : '60px'"
      >
      <template slot="header">
        <el-tooltip 
          :content="item" 
          placement="top" 
          :popper-append-to-body="false"
          popper-class="custom-tooltip"
          :append-to="() => document.getElementById('uphHoursReportNNKBbox')"
          
        >
          <span @mouseenter="handleMouseEnter(item)"
          @mouseleave="handleMouseLeave">{{item}}</span>
        </el-tooltip>
      </template>
        <template slot-scope="scope">
          <span>{{scope.row[item]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const refreshsec = 30;
const colMax = 15;

export default {
  name: "HoursTable",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    columnList: {
      type: Array,
      default: () => []
    },
    standardUph: {
      type: Object,
      default: () => ({})
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {
      headerTooltip: "",
      loading: false,
    //   fullscreen: false,
      interval: 0,
      colIndex: 0,
      rowHeight: 23,
      datetime: "",
    };
  },

  computed: {
    filterColumnList() {
      if(this.fullscreen) {
        return this.columnList.slice(this.colIndex*colMax,(this.colIndex+1)*colMax)
      }
      return this.columnList;
    }
  },

  methods: {
    handleMouseEnter(item) {
      console.log("handleMouseEnter", item);
      this.headerTooltip = item;
    },
    handleMouseLeave() {
      console.log("handleMouseLeave");
      this.headerTooltip = "";
    },
    format(str) {
      return str.split("-").join("-\n");
    },

    statDateFormat(row) {
      if (row.STAT_DATE == "A_SUM") {
        return `sum`;
      } else if (row.STAT_DATE == "B_AVG") {
        return "UPH";
      } else if (row.STAT_DATE == "standardUph") {
        return "标准UPH";
      }
      return row.STAT_DATE;
    },

    changeFirst(column, value) {
      this.$emit('change-first', column, value);
    },

    // 其他表格相关方法
    rowStyle() {
      return {};
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
  }
};
</script>

<style scoped>
.hours-table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 添加表格样式 */
:deep(.el-table .currentRow > td) {
  background-color: rgb(238, 255, 0) !important;
}

:deep(.header1 th) {
  background-color: rgb(121, 187, 255) !important;
  border-color: rgb(199, 191, 191);
  color: #000000;
  line-height: 2;
  padding-left: 0;
  font-weight: bold;
  border-bottom-color: rgb(199, 191, 191) !important;
  /* 不换行 */
  white-space: nowrap;
}

:deep(.nnkbregular) {
  border-color: rgb(199, 191, 191);
  background-color: aliceblue;
  border-bottom-color: rgb(199, 191, 191) !important;
  font-weight: bold;
}

:deep(.el-table__cell) {
  padding: 8px 0;
}

:deep(.nnkbdanger) {
  color: red;
  border-color: rgb(199, 191, 191);
  background-color: aliceblue;
  border-bottom-color: rgb(199, 191, 191) !important;
  font-weight: bold;
  padding: 8px 0;
}
.fullHoursTable :deep( .el-table__body-wrapper) {
  scrollbar-color: lightblue #002A80;
}

.fullHoursTable{background-color:#002A80}
.fullHoursTable .el-table .cell{line-height: 40px;}
.fullHoursTable .el-table,.fullHoursTable .el-table--border::after,.fullHoursTable .el-table--group::after,.fullHoursTable .el-table::before{background-color:#202634;/*border-color:#394a73*/;font-size:1.5rem;}
.fullHoursTable .el-table tr{/*background-color:#202634!important;*/border-color:#ccc;height:55px}
.fullHoursTable .el-table th{background-color:#224EC1!important;font-size:2rem!important;color:#fff}
.fullHoursTable .el-table td,.fullHoursTable .el-table th.is-leaf{/*border-bottom-color:#394a73*/font-size:2rem;font-weight: bold;}
/* .fullHoursTable .el-table--striped .el-table__body tr.el-table__row--striped td{background-color:#2e364b} */
.fullHoursTable .form-banner{background-image:url("/flames-web/images/tvBanner.svg");background-size:100% 100px;background-repeat: no-repeat;background-color:transparent;/*color:#2d81c4;*/color:#fff;height:100px;line-height:100px;font-weight: bolder;font-size:2.2rem}
/* .fullHoursTable tr.highlight,.fullHoursTable tr.highlight:hover,.fullHoursTable tr.highlight:hover>td{background-color:#fff!important;color:#224EC1} */
/* .fullHoursTable tr:hover,.fullHoursTable tr:hover>td{background-color:#224EC1!important} */
.fullHoursTable .tb{position: absolute;
    color: #39a1f6;
    font-size: 2rem;
    margin-left: 10px;}
.fullHoursTable .controlb{margin-top:6px;font-size:2rem}
.fullHoursTable .el-input__inner{
    /* background-color:#224EC1; */
    color:#000;
    font-weight:bold;
    text-align:center;
    font-size:2rem}
.fullHoursTable .el-table{color:#000}
.fullHoursTable .font25 .cell{font-size:25px}
.fullHoursTable .font20 .cell{font-size:19px}
:deep(.el-table__body){
  background-color: #2a267e;
}
:deep(.el-table__body-wrapper){
  background-color: #2a267e;
}
</style>