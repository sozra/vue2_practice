<template>
  <div class="CertificateBoard">
    <div id="CertificateBoardReportBox">
      <div class="form-banner center">
        人员资质看板
        <span><i class="el-icon-full-screen" @click="toggle"></i></span>
        <!-- <div class="timers">
          <el-statistic
            ref="statistic"
            :value="deadline"
            time-indices
            title=""
            format="ss"
            @finish="onCountdownFinish"
          >
          </el-statistic>
        </div> -->
      </div>
      <el-form
        v-show="!fullscreen"
        :inline="true"
        :model="form"
        style="padding: 0 20px; margin-top: 16px"
      >
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="工序名称">
          <el-input
            v-model="form.processName"
            placeholder="请输入工序名称"
            clearable
          ></el-input>
        </el-form-item>
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

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="card-container" >
        <CertificateTable
          v-for="(person, index) in personList"
          :key="person.processName + index"
          :id="person.processName + index"
          :person="person"
          @rendered="onCardRendered"
          :fullscreen="fullscreen ? 'y' : 'n'"
          :fontColor="fullscreen ? 'white' : 'black'"
        />
      </div>
      <!-- <div class="card-container-fullscreen" v-else>

        <div
          class="card-columns"
          v-for="(idx, colIndex) in Math.ceil(personList.length / 2)"
          :key="idx"
        >
          <CertificateTable
            v-for="(person, index) in personList.slice(
              colIndex * 2,
              colIndex * 2 + 2
            )"
            :key="'col' + colIndex + '-' + person.processName + index"
            :id="'col' + colIndex + '-' + person.processName + index"
            :person="person"
            @rendered="onCardRendered"
            :fullscreen="fullscreen ? 'y' : 'n'"
            :fontColor="fullscreen ? 'white' : 'black'"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import _ from "lodash";
// import * as echarts from "echarts";
// import CertificateCard from "./CertificateCard.vue";
// import axios from "axios";
import mockData from "./CertificateBoard.json";
export default {
  name: "CertificateBoard",
  components: {
    CertificateTable: () => import("./CertificateTable"),
  },
  data() {
    return {
      form: {
        // startTime: "",
        // endTime: "",
        startTime: "2024-06-20 00:00:00",
        endTime: "2024-06-20 12:00:00",
        processName: "",
        lineName: "",
      },
      lineNameOptions: [],
      fullscreen: false,
      personList: [],
      scollInterval: null,
      refreshInterval: null,
      renderedCards: 0,
      refreshTime: 30 * 1000,
      containerScrollWidth: 0,
      containerClientWidth: 0,
    };
  },
  created() {},
  mounted() {
    window.kk = this;
    // this.getLineNameOptions();
    // this.getData();
    this.personList = mockData.DATA;
  },
  beforeDestroy() {
    if (this.scollInterval) clearInterval(this.scollInterval);
    if (this.refreshInterval) clearInterval(this.refreshInterval);
  },
  methods: {
    search() {
      const startTime = new Date(this.form.startTime).getTime();
      const endTime = new Date(this.form.endTime).getTime();
      if (endTime - startTime > 12 * 60 * 60 * 1000) {
        this.$message.error("开始时间和结束时间不能超过12小时");
        return;
      }
      this.getData();
    },
    reset() {
      this.form = {
        startTime: "",
        endTime: "",
        processName: "",
        lineName: "",
      };
      if (this.scollInterval) {
        clearInterval(this.scollInterval);
      }
      this.renderedCards = 0;
      this.personList = [];
    },
    getLineNameOptions() {
      this.$http.axios
        .post("mes/api/mesLine/getList", {})
        // .post("http://10.12.7.111:6003/aldev/mes/api/mesLine/getList", {})
      // this.$http.getMockFile("personGetList.json")
      .then((res) => {
        // console.log(res);
        this.lineNameOptions = _.uniq(res.DATA.map((item) => item.name));
      });
    },
    getData() {
      this.$http.axios
      // axios
        .post(
          // "http://127.0.0.1:4523/m1/3456640-0-default/aldev/ms/api/mesCertificate/certificateProcessProductReport",
          "ms/api/mesCertificate/certificateProcessProductReport",
          this.form
        )
        // this.$http.getMockFile("CertificateBoard.json")
        .then((res) => {
          // console.log(res);
          this.personList = res.DATA;
          if (this.scollInterval) {
            clearInterval(this.scollInterval);
          }
          this.renderedCards = 0;
          // this.autoScrollByPixel();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    autoScroll() {
      this.$nextTick(() => {
        const container = document.querySelector(
          this.fullscreen ? ".card-container-fullscreen" : ".card-container"
        );
        // const cardWidth = container.children[0].offsetWidth;
        const cardWidth = 442;
        // const scrollWidth = container.scrollWidth;
        this.containerScrollWidth = cardWidth * this.personList.length;
        this.containerClientWidth = container.clientWidth;
        // console.log(scrollWidth, clientWidth);
        let scrollLeft = 0;
        this.scollInterval = setInterval(() => {
          if (
            scrollLeft >=
            this.containerScrollWidth - this.containerClientWidth
          ) {
            scrollLeft = 0;
            // console.log("reset");
          } else {
            scrollLeft += cardWidth;
            // console.log("scroll");
          }
          container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          });
        }, 2000);
      });
    },
    updateContainerWidth() {
      const container = document.querySelector(
        this.fullscreen ? ".card-container-fullscreen" : ".card-container"
      );
      const cardWidth = container.children[0].offsetWidth;
      this.containerScrollWidth = cardWidth * this.personList.length;
      this.containerClientWidth = container.clientWidth;
    },
    onCardRendered(id) {
      // if (this.fullscreen&&!id.startsWith('cardPie-col')) return;
      // console.log(`onCardRendered: ${id}`);
      // console.log("onCardRendered");
      // console.log(this.renderedCards, this.personList.length);
      this.renderedCards++;
      if (this.renderedCards === this.personList.length) {
        console.log("all rendered");
        // this.autoScrollByPixel();
      }
    },
    autoScrollByPixel() {
      console.log("autoScrollByPixel");
      // setTimeout(()=>{
      const container = document.querySelector(
        this.fullscreen ? ".card-container-fullscreen" : ".card-container"
      );
      if (!container) return;
      // const cardWidth = 442;
      const scrollWidth = container.scrollWidth;
      // const scrollWidth = cardWidth * this.personList.length;
      const clientWidth = container.clientWidth;
      // let scrollLeft = 0;
      this.scollInterval = setInterval(() => {
        // console.log('-----------------')
        // console.log(`container.scrollLeft: ${container.scrollLeft}`)
        // console.log(`scrollWidth: ${scrollWidth}`)
        // console.log(`clientWidth: ${clientWidth}`)
        // console.log(`scrollWidth - clientWidth: ${scrollWidth - clientWidth}`)
        // console.log(`${container.scrollLeft >= scrollWidth - clientWidth?'>=':'<'}`)
        if (container.scrollLeft >= scrollWidth - clientWidth) {
          container.scrollLeft = 0;
          // console.log("reset");
        } else {
          container.scrollLeft += 1;
          // console.log("scroll");
        }
        // container.scrollTo({
        //   left: scrollLeft,
        //   behavior: "smooth",
        // });
      }, 50);

      // },500)
    },
    toggle() {
      let self = this;
      this.$fullscreen.toggle(document.getElementById("CertificateBoardReportBox"), {
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
              }, this.refreshTime);
            }
          } else {
            self.rowHeight = 23;
            if (this.refreshInterval) {
              clearInterval(this.refreshInterval);
            }
          }
          self.$nextTick(() => {
            if (this.scollInterval) {
              clearInterval(this.scollInterval); 
            }
            // this.autoScrollByPixel();
          });
        },
      });
    },
  },
};
</script>

<style scoped>
#CertificateBoardReportBox {
  background-color: #ffffff;
}
#CertificateBoardReportBox .controlb {
  color: #fff;
  font-size: 24px; /*position:absolute;right:10px*/
  float: right;
}
#CertificateBoardReportBox .tb {
  /*position: absolute;*/
  float: left;
  color: #606266;
  margin-top: 6px;
  font-size: 14px;
  margin-left: 10px;
}
#CertificateBoardReportBox.fullscreen {
  background-color: #202634;
}
#CertificateBoardReportBox.fullscreen .el-table .cell {
  line-height: 40px;
}
#CertificateBoardReportBox.fullscreen .el-table,
#CertificateBoardReportBox.fullscreen .el-table--border::after,
#CertificateBoardReportBox.fullscreen .el-table--group::after,
#CertificateBoardReportBox.fullscreen .el-table::before {
  background-color: #202634; /*border-color:#394a73*/
  font-size: 1.5rem;
}
#CertificateBoardReportBox.fullscreen .el-table tr {
  /*background-color:#202634!important;*/
  border-color: #ccc;
  height: 55px;
}
#CertificateBoardReportBox.fullscreen .el-table th {
  background-color: #3aa3f9 !important;
  font-size: 1.2rem !important;
  color: #fff;
}
#CertificateBoardReportBox.fullscreen .el-table td,
#CertificateBoardReportBox.fullscreen .el-table th.is-leaf {
  /*border-bottom-color:#394a73*/
  font-size: 1.2rem;
  font-weight: bold;
}
/* #CertificateBoardReportBox.fullscreen .el-table--striped .el-table__body tr.el-table__row--striped td{background-color:#2e364b} */
#CertificateBoardReportBox.fullscreen .form-banner {
  background-image: url("./tvBanner.svg");
  background-size: 100% 100px;
  background-repeat: no-repeat;
  background-color: transparent; /*color:#2d81c4;*/
  color: #fff;
  height: 100px;
  line-height: 100px;
  font-weight: bolder;
  font-size: 2.2rem;
}
#CertificateBoardReportBox.fullscreen tr.highlight,
#CertificateBoardReportBox.fullscreen tr.highlight:hover,
#CertificateBoardReportBox.fullscreen tr.highlight:hover > td {
  background-color: #fff !important;
  color: #3aa3f9;
}
#CertificateBoardReportBox.fullscreen tr:hover,
#CertificateBoardReportBox.fullscreen tr:hover > td {
  background-color: #3aa3f9 !important;
}
#CertificateBoardReportBox.fullscreen .tb {
  position: absolute;
  color: #39a1f6;
  font-size: 2rem;
  margin-left: 10px;
}
#CertificateBoardReportBox.fullscreen .controlb {
  margin-top: 6px;
  font-size: 2rem;
}
#CertificateBoardReportBox.fullscreen .el-input__inner {
  /* background-color:#3aa3f9; */
  color: #000;
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
}
#CertificateBoardReportBox.fullscreen .el-table {
  color: #000;
}
#CertificateBoardReportBox.fullscreen .font25 .cell {
  font-size: 25px;
}
#CertificateBoardReportBox.fullscreen .font20 .cell {
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
::v-deep .card-container::-webkit-scrollbar {
  display: none;
}
.card-container {
  display: flex;
  /* flex-wrap: wrap; */
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  flex-wrap: wrap;
}
::v-deep .fullscreen .el-form-item__label,
.fullscreen .statusText {
  color: white;
}

.card-container-fullscreen {
  display: flex;
  /* flex-direction: column; */
  /* flex-wrap: wrap; */
  overflow-x: scroll;
  /* overflow-y: hidden; */
  scrollbar-width: none;
}
::v-deep .fullscreen th.el-table__cell {
  color: white !important;
}
</style>
