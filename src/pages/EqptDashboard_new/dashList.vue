<template>
  <div class="error-list" :class="{'listfull':fullscreen}">
    <div class="error-list-title">异常报警</div>
    <div class="list-container">
      <div
        class="error-station"
        v-for="item in errorList"
        :key="item.processName + '_' + item.stationName"
      >
        {{ item.processName }} 工站{{ item.stationName }}机台异常
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashList",
  props: {
    errorList: {
      type: Array,
      required: true,
      default: () => [],
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      nextInterval: null,
      nextTime: 5000,
      scollInterval: null,
    };
  },
  watch: {
    errorList: {
      handler() {
        // this.autoScrollByPixel();
        setTimeout(() => {
          this.autoScrollByPixel();
        }, 100);
      },
      deep: true,
      // immediate: true,
    },
  },
  computed: {},
  mounted() {
    window.list = this;
    // setTimeout(() => {
    //   this.autoScrollByPixel();
    // }, 500);
  },
  beforeDestroy() {
    clearInterval(this.nextInterval);
    clearInterval(this.scollInterval);
  },
  methods: {
    autoScrollByPixel() {
      if (this.scollInterval) {
        clearInterval(this.scollInterval);
      }
      // console.log("autoScrollByPixel");
      const container = document.querySelector(".list-container");
      if (!container) return;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      this.scollInterval = setInterval(() => {
        if (container.scrollTop >= scrollHeight - clientHeight) {
          container.scrollTop = 0;
        } else {
          container.scrollTop += 1;
        }
      }, 50);
    },
  },
};
</script>

<style scoped>
.error-list {
  border: 1px solid #ebeef5;
  border-radius: 20px;
}
.error-list-title {
  /* background-color: #f5f7fa; */
  padding: 10px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}
.list-container {
  max-height: 400px;
  overflow-y: scroll;
}
.listfull .list-container {
  max-height: 500px;
}
.error-station {
  padding: 10px 20px;
  /* border-bottom: 1px solid #ebeef5; */
  text-align: center;
  color: red;
  font-weight: bold;
}
</style>
