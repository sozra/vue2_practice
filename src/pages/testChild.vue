<template>
  <div class="TestChild">
    <div></div>

    <input type="text" :value="value" v-on:input="onInput" />
    <!-- <el-button @click="customInput">Emit</el-button> -->
  </div>
</template>

<script>
// import * as echarts from "echarts";
// import _ from "lodash";
// import moment from "moment";
export default {
  name: "TestChild",
  components: {},
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tmpValue: "",
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
    window.kk = this;
  },
  methods: {
    onInput(event) {
      console.log("child input, value: ", event);
      this.tmpValue = event.target.value;
      console.log("this.tmpValue: ", this.tmpValue);
      this.$emit("input", this.tmpValue);
    },
    customInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
