<template>
  <div class="processContainer">
    <div class="process-row row1" :class="{'rowsfull':fullscreen}">
      <ProcessOutline :currentIndex="0" :total="rowsLength" />
      <Process
        v-for="process in row1List"
        :key="process.processName + 'a'"
        :process="process"
      />
    </div>
    <div class="process-row row2" :class="{'rowsfull':fullscreen}" v-if="row2List.length > 0">
      <ProcessOutline :currentIndex="1" :total="rowsLength" />
      <Process
        v-for="process in row2List"
        :key="process.processName + 'b'"
        :process="process"
      />
    </div>
    <div class="process-row row3" :class="{'rowsfull':fullscreen}" v-if="row3List.length > 0">
      <ProcessOutline :currentIndex="2" :total="rowsLength" />
      <Process
        v-for="process in row3List"
        :key="process.processName + 'c'"
        :process="process"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProcessGrids",
  components: {
    // ProcessGrids: () => import('./dashProcessGrids.vue'),
    Process: () => import("./process.vue"),
    ProcessOutline: () => import("./outline.vue"),
  },
  computed: {
    row1List() {
      return this.process.slice(0, 15);
    },
    row2List() {
      return this.process.slice(15, 30);
    },
    row3List() {
      return this.process.slice(30, 45);
    },
    rowsLength() {
      return Math.min(Math.ceil(this.process.length / 15), 3);
    },
  },
  props: {
    process: {
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
    return {};
  },
};
</script>

<style scoped>
.process-status {
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
.processContainer {
  position: relative;
}
.process-row {
  /* display: flex; */
  /* justify-content: space-evenly; */
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  position: relative;
  z-index: 15;
  column-gap: 0.3rem;
  padding: 0 10px;
}
.process-row:not(:last-child) {
  /* margin-bottom: 100px; */
  /* margin-bottom: 65px; */
  margin-bottom: 45px;
}
.rowsfull.process-row:not(:last-child) {
  /* margin-bottom: 100px; */
  /* margin-bottom: 65px; */
  margin-bottom: 70px;
}
</style>
