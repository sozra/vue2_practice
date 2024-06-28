<template>
  <!-- <el-col :span="3" > -->
    <div class="station-status">
      <p class="status-name">{{ station }}</p>
      <div class="status-indicator"></div>
      <el-row :gutter="5">
        <el-col :span="12" v-for="i in 8" :key="i">
          <div class="sub-status"></div>
        </el-col>
      </el-row>
    </div>
  <!-- </el-col> -->
</template>

<script>
export default {
  name: "Station",
  props: {
    station: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {};
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
}
.sub-status {
  width: 100%;
  height: 16px;
  background-color: #81c784;
  margin-bottom: 4px;
}
.stationContainer {
  position: relative;
}
</style>
