<template>
  <div class="station-status">
    <p class="status-name">{{ process.processName }}</p>
    <div class="status-indicator"></div>
    <div class="station-grid">
      <div
        v-for="item in currentList"
        :key="process.processName + '-' + item.stationNo"
        class="station-cell sub-status"
        :class="statusColor(item)"
      >
        {{ item.stationNo }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Process",
  props: {
    process: {
      type: Object,
      required: true,
      default: () => {
        return {
          processName: "",
          stationList: [],
          showProcessName: "",
          processNo: 0,
        };
      },
    },
  },
  data() {
    return {
      currentPage: 1,
      nextInterval: null,
      nextTime: 5000,
    };
  },
  computed: {
    currentList() {
      return this.process.stationList.slice(
        (this.currentPage - 1) * 8,
        this.currentPage * 8
      );
    },
    listPages() {
      return Math.ceil(this.process.stationList.length / 8);
    },
  },
  mounted() {
    this.nextInterval = setInterval(() => {
      this.currentPage =
        this.currentPage + 1 > this.listPages ? 1 : this.currentPage + 1;
      // console.log(this.currentPage);
    }, this.nextTime);
  },
  beforeDestroy() {
    clearInterval(this.nextInterval);
  },
  methods: {
    statusColor(item) {
      return {
        "status-error": item.status === "error",
        "status-stop": item.status === "stop",
        "status-normal": item.status === "normal",
      };
    },
  },
};
</script>

<style scoped>
.station-status {
  text-align: center;
}
.status-indicator {
  width: 24px;
  height: 24px;
  background-color: #4caf50;
  border-radius: 50%;
  position: relative;
  /* margin: 0 auto 4px; */
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
}
.status-name {
  position: relative;
  font-weight: bold;
  margin-bottom: 5px;
}
.sub-status {
  /* width: 100%; */
  /* height: 16px; */
  background-color: #81c784;
  margin-bottom: 4px;
}
.stationContainer {
  position: relative;
}
.station-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 5px;
  padding: 0 5px;
  /* margin-top: 10px; */
  border: 2px solid skyblue;
  padding: 2px;
  box-sizing: border-box;
}
.station-cell {
  color: white;
  height: 30px;
  line-height: 30px;
}
.status-error {
  background-color: yellow;
  color: blueviolet;
}
.status-stop {
  background-color: hsl(0, 100%, 50%);
}
.status-normal {
  background-color: #4CAF50;
}
.rowsfull .station-cell {
  height: 40px;
  line-height: 40px;
}
</style>
