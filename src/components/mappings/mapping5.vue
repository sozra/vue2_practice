<template>
  <!-- <div id="app"> -->
  <div class="rect5">
    <div class="rect5Grid">
      <div class="cell BA01">
        <button @click="onProcessClick('BA01')">
          <div class="code">BA01</div>
          <div class="qty">{{ processData.BA01 }}</div>
        </button>
      </div>
      <div class="cell BA02">
        <button @click="onProcessClick('BA02')">
          <div class="code">BA02</div>
          <div class="qty">{{ processData.BA02 }}</div>
        </button>
      </div>
      <div class="cell BA05">
        <button @click="onProcessClick('BA05')">
          <div class="code">BA05</div>
          <div class="qty">{{ processData.BA05 }}</div>
        </button>
      </div>
      <div class="cell BA06">
        <button @click="onProcessClick('BA06')">
          <div class="code">BA06</div>
          <div class="qty">{{ processData.BA06 }}</div>
        </button>
      </div>
      <div class="cell BA09">
        <button @click="onProcessClick('BA09')">
          <div class="code">BA09</div>
          <div class="qty">{{ processData.BA09 }}</div>
        </button>
      </div>
      <div class="cell BA10">
        <button @click="onProcessClick('BA10')">
          <div class="code">BA10</div>
          <div class="qty">{{ processData.BA10 }}</div>
        </button>
      </div>
      <div class="cell BA13">
        <button @click="onProcessClick('BA13')">
          <div class="code">BA13</div>
          <div class="qty">{{ processData.BA13 }}</div>
        </button>
      </div>
      <div class="cell BA14">
        <button @click="onProcessClick('BA14')">
          <div class="code">BA14</div>
          <div class="qty">{{ processData.BA14 }}</div>
        </button>
      </div>
      <!-- <div class="cell a9"></div> -->
    </div>
    <div class="rect"></div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    processData: {
      type: Object,
      // required: true,
      default: () => ({
        BA01: 0,
        BA02: 0,
        BA03: 0,
        BA04: 0,
        BA05: 0,
        BA06: 0,
        BA07: 0,
        BA08: 0,
        BA09: 0,
        BA10: 0,
        BA11: 0,
        BA12: 0,
        BA13: 0,
        BA14: 0,
        BA15: 0,
        BA16: 0,
        BA17: 0,
        BA18: 0,
        BA19: 0,
        BA20: 0,
      }),
    },
  },
  data() {
    return {};
  },
  methods: {
    onProcessClick(process) {
      // console.log(`mapping5 ${process} button clicked`);
      this.$emit("onProcessClick", process);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  margin-left: 60px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.rect5 {
  position: relative;
  width: 200px;
  height: 300px;
}

.rect5Grid {
  width: 100%;
  height: 100%;
  border: #fcbe24 1px solid;
  border-color: black;
  border-radius: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr) minmax(35px, 0.25fr);
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

.rect {
  position: absolute;
  left: 50%;
  bottom: 50px;
  width: 35px;
  height: 15px;
  border: 1px solid black;
  transform: translateX(-50%);
}

.cell {
  background-color: white;
  border: 0px black solid;
  border-style: dotted;
  border-color: black;
  box-sizing: border-box;
  background: transparent;
  position: relative;
}

/* .cell:nth-child(n + 4):nth-child(-n + 6) {
  border-top-width: 1px;
  border-bottom-width: 1px;
}
.cell:nth-child(3n + 2) {
  border-left-width: 1px;
  border-right-width: 1px;
} */
.cell:nth-child(2n + 1) {
  /* border-left-width: 1px; */
  border-right-width: 1px;
}
.cell:nth-child(2n + 1),
.cell:nth-child(2n + 2) {
  /* border-left-width: 1px; */
  border-top-width: 1px;
}

.btn-group {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

button {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 50px;
  height: 50px;
  font-size: 11px;
  font-weight: bold;
  border-style: none;
  border-width: 0;
  background-color: #fff;
  background: transparent;
}
button > .qty {
  color: blue;
}
button:hover {
  color: blue;
  cursor: pointer;
}
</style>
