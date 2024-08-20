<template>
  <div class="TaskDashboard">
    <div class="form-section">
      <el-form inline :model="baseForm" style='background-color: rgb(18, 29, 67); margin-bottom: 5px; padding: 10px 20px;'>
        <!-- 
        3.工厂：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
4.项目：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
5.楼栋：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
6.线体：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
7.段落：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
8.班别：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
9.处理人：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
10.任务来源：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
11.任务状态：下拉选择+手动输入模糊查询；单个搜索框支持清除（任务系统数据维护表数据）
12.时间：查询截止时间（默认查询一个月）
        -->
        <el-form-item label="工厂">
          <el-select
            v-model="baseForm.factory"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.factorys"
              :key="item.factory"
              :label="item.factory"
              :value="item.factory"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目">
          <el-select
            v-model="baseForm.project"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.projects"
              :key="item.project"
              :label="item.project"
              :value="item.project"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼栋">
          <el-select
            v-model="baseForm.building"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.buildings"
              :key="item.building"
              :label="item.building"
              :value="item.building"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="线体">
          <el-select
            v-model="baseForm.line"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.lines"
              :key="item.line"
              :label="item.line"
              :value="item.line"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="段落">
          <el-select
            v-model="baseForm.section"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.sections"
              :key="item.section"
              :label="item.section"
              :value="item.section"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班别">
          <el-select
            v-model="baseForm.classes"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.classesList"
              :key="item.classes"
              :label="item.classes"
              :value="item.classes"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处理人">
          <el-select
            v-model="baseForm.handlerName"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.handlerNames"
              :key="item.handlerName"
              :label="item.handlerName"
              :value="item.handlerName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务来源">
          <el-select
            v-model="baseForm.sourceSystem"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.sourceSystems"
              :key="item.sourceSystem"
              :label="item.sourceSystem"
              :value="item.sourceSystem"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select
            v-model="baseForm.states"
            placeholder="请选择"
            clearable
            filterable
          >
            <el-option
              v-for="item in selectOptions.statesList"
              :key="item.states"
              :label="item.states"
              :value="item.states"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="baseForm.queryStartTime"
            type="date"
            placeholder="开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          ></el-date-picker>
          <el-date-picker
            v-model="baseForm.queryEndTime"
            type="date"
            placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="matchRate-section">
      <el-card id="matchRate-section-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">符合率</div>
        <!-- <SomeChild /> -->
        <MatchRate style="height: 250px" :lineTrendData="matchRateData" />
      </el-card>
    </div>
    <div class="row-two task-row">
      <el-card id="factory-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">工厂</div>
        <!-- <SomeChild /> -->
      </el-card>
      <el-card id="project-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">项目</div>
        <!-- <SomeChild /> -->
      </el-card>
      <el-card id="classTask-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">当班任务</div>
        <!-- <SomeChild /> -->
        <!-- <CurrentTask :tableData="selectOptions.handlerNames" /> -->
        <CurrentTask  />
      </el-card>
      <el-card id="classTask-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">异常类别</div>
        <!-- <SomeChild /> -->
        <CurrentTask  />
      </el-card>
    </div>
    <div class="row-three task-row">
      <el-card id="classTask-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">任务状态</div>
        <!-- <SomeChild /> -->
        <TaskStatus />
      </el-card>
      <el-card id="classTask-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">任务来源</div>
        <!-- <SomeChild /> -->
      </el-card>
    </div>
    <div class="row-four task-row">
      <el-card id="classTask-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">处理趋势</div>
        <!-- <SomeChild /> -->
      </el-card>
      <el-card id="classTask-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">线体</div>
        <!-- <SomeChild /> -->
      </el-card>
    </div>
    <div class="taskDetail-section">
      <el-card id="taskDetail-section-card" class="after-chart">
        <div slot="header" class="elcard-header" :class="{}">任务明细表</div>
        <!-- <SomeChild /> -->
      </el-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// import { ref, onMounted  } from "vue";
// import MatchRate from "./MatchRate.vue";
import MatchRateMockData from "./MatchRate_mock.json";

export default {
  name: "AfterSalesProcess",
  components: {
    MatchRate: () => import("./MatchRate"),
    CurrentTask: () => import("./CurrentTask"),
    TaskStatus: () => import("./TaskStatus"),
  },
  data() {
    return {
      baseForm: {
        factory: "",
        project: "",
        building: "",
        section: "",
        line: "",
        classes: "",
        states: "",
        sourceSystem: "",
        handlerName: "",
        queryStartTime: "",
        queryEndTime: "",
      },
      matchRateData: {},
      selectOptions: {
        factorys: [],
        projects: [],
        floors: [],
        classesList: [],
        buildings: [],
        statesList: [],
        issueIds: [],
        lines: [],
        handlerNames: [],
        RESULT: [],
        sourceSystems: [],
        sections: [],
      },
    };
  },
  mounted() {
    window.kk = this;
    this.matchRateData = MatchRateMockData;
    console.log("matchRateData", this.matchRateData);
    // this.getHandleStatesTrend();
    this.search();
    this.getSelectOptions();
    this.setDefaultDate();
  },
  methods: {
    setDefaultDate() {
      // 设置默认时间 "yyyy-MM-dd HH:mm:ss"格式
      this.baseForm.queryStartTime = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss');
      this.baseForm.queryEndTime = moment().format('YYYY-MM-DD HH:mm:ss');
    },
    search() {
      console.log("search", this.baseForm);
      this.getHandleStatesTrend();
      this.getCoincidenceRate();
      this.getOtherChartsData();
    },
    // 任务处理状态趋势图
    async getHandleStatesTrend() {
      const trendData = await this.getData(
        "quality/api/taskSystem/getHandleStatesTrend",
        this.baseForm
      );
      console.log("trendData", trendData);
    },
    // 符合率
    async getCoincidenceRate() {
      const coincidenceRate = await this.getData(
        "quality/api/taskSystem/getCoincidenceRate",
        this.baseForm
      );
      console.log("coincidenceRate", coincidenceRate);
    },
    async getOtherChartsData() {
      const otherChartsData = await this.getData(
        "quality/api/taskSystem/getCharts",
        this.baseForm
      );
      console.log("otherChartsData", otherChartsData);
    },
    getData(url, params) {
      // 一个通用的请求方法，返回一个promise，如果请求失败或者没有数据，会返回一个空数组
      return this.$http.axios
        .post(url, params)
        .then((res) => {
          if (res.RESULT == "PASS") {
            return res.DATA;
          } else {
            return [];
          }
        })
        .catch((err) => {
          console.error(err);
          return [];
        });
    },
    getSelectOptions() {
      // 获取下拉框的选项
      this.$http.axios
        .get("quality/api/taskSystem/getSelectList")
        .then((res) => {
          if (res.RESULT == "PASS") {
            // this.selectOptions = res.DATA;
            console.log("selectOptions", res);
            Object.keys(this.selectOptions).forEach((key) => {
              if (key in res) {
                this.$set(this.selectOptions, key, res[key]);
              }
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.TaskDashboard {
  background-color: rgb(3, 7, 37);
  /* padding: 20px; */
}
/* .form-section {
  height: 200px;
} */
.task-row {
  display: flex;
  column-gap: 5px;
}

.el-card {
  min-height: 150px;
  background: rgb(18, 29, 67);
  background-color: rgb(18, 29, 67);
  position: relative;
  border-width: 0;
}
.row-two > .el-card {
  width: 25%;
  /* flex-grow: 1; */
  /* flex-shrink: 1; */
}
.row-three > .el-card,
.row-four > .el-card {
  width: 50%;
  /* flex-grow: 1;
  flex-shrink: 1; */
}
::v-deep .el-card__header {
  padding: 9px 10px;
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom-width: 0px;
  border-bottom-style: none;
  position: absolute;
  background: rgb(18, 29, 67);
  background-color: rgb(18, 29, 67);
  color: white;
}

::v-deep .el-card__body {
  background: rgb(18, 29, 67);
  background-color: rgb(18, 29, 67);
}

::v-deep .el-input__inner {
  background: rgb(42, 52, 86);
  background-color: rgb(42, 52, 86);
  border-width: 0;
  color: white;
}
::v-deep .el-form-item__label {
  color: white;
}
</style>
