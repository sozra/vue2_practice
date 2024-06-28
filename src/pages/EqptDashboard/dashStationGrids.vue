<template>
  <div class="stationContainer">
    
    <!-- <el-row :gutter="10"> -->
      <!-- <el-col :span="3" v-for="station in stations" :key="station">
        <div class="station-status">
          <div class="status-indicator"></div>
          <p>{{ station }}</p>
          <el-row :gutter="5">
            <el-col :span="12" v-for="i in 8" :key="i">
              <div class="sub-status"></div>
            </el-col>
          </el-row>
        </div>
      </el-col> -->
      <div class="station-row row1">
        <!-- <div class="line"></div> -->
         <StationLine :currentIndex="0" :total="3" />
        <Station v-for="station in stations" :key="station+'a'" :station="station" />
      </div>
      <div class="station-row row2">
        <!-- <div class="line"></div> -->
        <StationLine :currentIndex="1" :total="3" />
        <Station v-for="station in stations" :key="station+'b'" :station="station" />
      </div>
      <div class="station-row row3">
        <!-- <div class="line"></div> -->
        <StationLine :currentIndex="2" :total="3" />
        <Station v-for="station in stations" :key="station+'c'" :station="station" />
      </div>
    <!-- </el-row> -->
  </div>
</template>

<script>
export default {
  name: "StationGrids",
  components: {
    // StationGrids: () => import('./dashStationGrids.vue'),
    Station: () => import('./station.vue'),
    StationLine: () => import('./line.vue'),
  },
  props: {
    stations: {
      type: Array,
      required: true,
      default: () => [],
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
  margin: 0 auto 4px;
  position: relative;
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
.station-row {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    z-index: 15;
    
}
.station-row:not(:last-child) {
  margin-bottom: 100px;
}
</style>
