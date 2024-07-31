<template>
  <div class="CertificateCard">
    <div class="processName">{{ person.processName }}</div>
    <div class="status">
      <div class="greenStatus statusWrap">
        <div class="statusColor"></div>
        <div class="statusText">{{ person.regularCount }} x</div>
      </div>
      <div class="yellowStatus statusWrap">
        <div class="statusColor"></div>
        <div class="statusText">{{ person.practiceCount }} x</div>
      </div>
    </div>
    <!-- <div :id="'cardPie-'+id" class="cardPie"></div> -->
     <el-table ref="cardTable" :height="54*5" :data="scrollTableData" :header-row-style="{background:'transparent',backgroundcolor:'rgba(0,0,0,0)'}" :header-cell-style="{background:'transparent',backgroundcolor:'rgba(0,0,0,0)'}" :row-style="{ height: '20px',background:'transparent' }" :cell-style="cellStyle">
      <el-table-column
        prop="workName"
        label="姓名"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="productCount"
        label="产出"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="productRate"
        label="占比"
        align="center"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
        {{ toPercentage(scope.row.productRate) }}
      </template>
      </el-table-column>
     </el-table>
  </div>
</template>

<script>
// import * as echarts from "echarts";
export default {
  name: "CertificateCard",
  props: {
    person: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    id: {
      type: String,
      required: true,
      default: "cardPie",
    },
    fullscreen: {
      type: String,
      default: 'n',
    },
    fontColor: {
      type: String,
      default: 'black',
    },
  },
  watch: {
    // fullscreen: function (val) {
    //   console.log(val);
    //   if (val == 'y') {
    //     this.$nextTick(() => {
    //     this.pieInstance.setOption({series: [{label: {color: 'white'}}]});
    //     });
    //   } else {
    //     this.$nextTick(() => {
    //       this.pieInstance.setOption({series: [{label: {color: 'black'}}]});
    //     });
    //   }
    // },
    // fontColor: function (val) {
    //   console.log(val);
    //   if (val == 'white') {
    //     this.$nextTick(() => {
    //     this.pieInstance.setOption({series: [{label: {color: 'white'}}]});
    //     });
    //   } else {
    //     this.$nextTick(() => {
    //       this.pieInstance.setOption({series: [{label: {color: 'black'}}]});
    //     });
    //   }
    // },
  },
  computed: {
    scrollTableData() {
      if (this.person.employeeList instanceof Array && this.person.employeeList.length>4) {
        const tmp =  this.person.employeeList.concat(this.person.employeeList.slice(0, 4));
        console.log("scrollTableData", tmp)
        return tmp;
      } else {
        return this.person.employeeList?this.person.employeeList:[];
      }
    },
  },
  data() {
    return {
      scrolltimer: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('rendered', this.id);
      if ((this.person.employeeList instanceof Array) && this.person.employeeList.length>4) {
        this.autoScrollByPixel();
      }
    });
  },
  beforeDestroy() {
    this.autoScrollByPixel(true);
  },
  methods: {
    autoScrollByPixel(stop = false) {
      console.log("child autoScrollByPixel");
      // setTimeout(()=>{
      // const divData = this.$refs.cardTable.$el.querySelector(".el-table__body-wrapper");
      const divData = this.$refs.cardTable.$refs.bodyWrapper;
      console.log(divData);
      if (!divData) return;
      if (stop) {
        window.clearInterval(this.scrolltimer);
      } else {
        this.scrolltimer = window.setInterval(() => {
          divData.scrollTop += 1;
          if (
            divData.clientHeight + divData.scrollTop ==
            divData.scrollHeight
          ) {
            divData.scrollTop = 0;
          }
        }, 50); // 滚动速度
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (this.fullscreen=='n') {
        return { color: "black" };
      }
      if (row.grade == 1) {
        return { color: "lightgreen", background: "transparent" };
      } else {
        return { color: "yellow", background: "transparent" };
      }
    },
    toPercentage(num) {
      const parsed = parseFloat(num);
      if (isNaN(parsed) || parsed == 0) return "0%";
      return parseFloat((parsed * 100).toFixed(2)) + "%";
    },
  },
};
</script>


<style scoped>
.CertificateCard {
  width: 250px;
  height: 448px;
  /* background-color: #f0f0f0; */
  /* border-radius: 20px; */
  /* padding: 20px; */
  margin: 5px;
  padding-bottom: 60px;
  border: 2px solid #f0f0f0;
}
.processName {
  text-align: center;
  background-color: hsl(0, 0%, 85%);
  height: 40px;
  line-height: 40px;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 1.3rem;
}
.cardPie {
  width: 400px;
  height: 300px;
}

.statusWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
  /* margin-left: 100px; */
}
.status {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin-bottom: 30px;
}

.statusColor {
  width: 80px;
  height: 35px;
  
  /* border-radius: 50%; */
  border-radius: 10px;
  margin-right: 5px;
}
.greenStatus .statusColor{
  background-color: lightgreen;
}
.yellowStatus .statusColor{
  background-color: yellow;
}
.statusText {
  font-size: 1.2rem;
  width: 50px;
}
.fullscreen .statusText {
color: white;
}
.fullscreen .card-container {
  display: flex;
  flex-wrap: wrap;
  overflow-x: scroll;
}
.fullscreen .CertificateCard {
  /* flex: 1 0 45%; */
  margin: 10px;
  background-color: hsl(206deg 55% 34% / 80%);
  margin-bottom: 20px;
}
::v-deep .el-table .el-table__cell {
  padding: 15px 0;
  /* height: 20px; */
}
::v-deep .el-table {
  background: transparent;
}
::v-deep .el-table th .cell {
  background-color: transparent ;
}
::v-deep  th.el-table__cell,
::v-deep  .el-table {
  background: transparent !important;
  background-color: rgba(0, 0, 0, 0) !important;
}

::v-deep .el-table__body-wrapper {
    scrollbar-width: none !important;
}

::v-deep .el-table th.gutter,
::v-deep .el-table__cell gutter{
  display: none !important;
  width:0 !important;
}
::v-deep .el-table colgroup col[name='gutter']{
  display: none !important;
  width: 0 !important;
}

::v-deep .el-table__body{
  width: 100% !important;
}
::v-deep .el-table .cell.el-tooltip {
  width: unset !important;
}

::v-deep #reportBox.fullscreen .el-table td, ::v-deep #reportBox.fullscreen .el-table th.is-leaf {
  padding: 6px !important;
}

::v-deep .fullscreen th.el-table__cell {
  color: white !important;
}
</style>