<template>
  <div>
    <el-button v-on:[eventString]="testFn1(111,$event)"  type="primary">soZra</el-button>
  </div>
</template>

<script>
// import * as echarts from "echarts";
// import _ from "lodash";
// import moment from "moment";
export default {
  name: "testbind",
  components: {
    // LineChart: () => import("./lineCharts.vue"),
  },

  data() {
    return {
      eventString: "click",
    };
  },

  created() {},
  mounted() {
    window.kk = this;
  },
  methods: {
    testFn1(_, event) {
      console.log("testFn1, event: ",event);
    },
    testFn2() {
      console.log("testFn1");
    },
  },
};
</script>
