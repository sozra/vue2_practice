<template>
  <div class="testParent">
    <testChild v-model="testChildValue" />
    <div>
      on parent, testChildValue:
      <br />
      {{ testChildValue }}
    </div>
  </div>
</template>

<script>
// import * as echarts from "echarts";
// import _ from "lodash";
// import moment from "moment";
export default {
  name: "testParent",
  components: {
    testChild: () => import("./testChild.vue"),
  },
  data() {
    return {
      testChildValue: "roxas",
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
  //   computed: {
  //     pageType() {
  //       return this.$store.state.pageType;
  //     },
  //   },
  created() {},
  mounted() {
    window.pp = this;
    console.log("on parent, test this.myGlobalMethod: ", this.myGlobalMethod);
  },
  methods: {},
};
</script>
