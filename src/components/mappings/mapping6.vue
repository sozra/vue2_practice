<template>
  <!-- <div id="app"> -->
  <div class="rect6">
    <div class="rect6Grid">
      <div class="cell BA03">
        <button @click="onProcessClick('BA03')">
          <div class="code">BA03</div>
          <div class="qty">{{ processData.BA03 }}</div>
        </button>
      </div>
      <div class="cell BA04">
        <button @click="onProcessClick('BA04')">
          <div class="code">BA04</div>
          <div class="qty">{{ processData.BA04 }}</div>
        </button>
        <div class="round">
          <div class="rect"></div>
        </div>
      </div>
      <div class="cell BA07">
        <button @click="onProcessClick('BA07')">
          <div class="code">BA07</div>
          <div class="qty">{{ processData.BA07 }}</div>
        </button>
      </div>
      <div class="cell BA08">
        <button @click="onProcessClick('BA08')">
          <div class="code">BA08</div>
          <div class="qty">{{ processData.BA08 }}</div>
        </button>
      </div>
      <div class="cell BA11">
        <button @click="onProcessClick('BA11')">
          <div class="code">BA11</div>
          <div class="qty">{{ processData.BA11 }}</div>
        </button>
      </div>
      <div class="cell BA12">
        <button @click="onProcessClick('BA12')">
          <div class="code">BA12</div>
          <div class="qty">{{ processData.BA12 }}</div>
        </button>
      </div>
      <div class="cell BA15">
        <button @click="onProcessClick('BA15')">
          <div class="code">BA15</div>
          <div class="qty">{{ processData.BA15 }}</div>
        </button>
      </div>
      <div class="cell BA16">
        <button @click="onProcessClick('BA16')">
          <div class="code">BA16</div>
          <div class="qty">{{ processData.BA16 }}</div>
        </button>
      </div>
      <!-- <div class="cell a9"></div> -->
    </div>
    <!-- <div class="round">
      <div class="rect"></div>
    </div> -->
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
        BA03: 0,
        BA04: 0,
        BA03: 0,
        BA04: 0,
        BA07: 0,
        BA08: 0,
        BA07: 0,
        BA08: 0,
        BA11: 0,
        BA12: 0,
        BA11: 0,
        BA12: 0,
        BA15: 0,
        BA16: 0,
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
      // console.log(`mapping6 ${process} button clicked`);
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

.rect6 {
  position: relative;
  width: 200px;
  height: 300px;
}

.rect6Grid {
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

.round {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  right: 100%;
  top: 100%;
  transform: translateX(50%) translateY(-50%);
  /* transform: translateY(-50%); */
  border-radius: 50%;
}
.rect {
  position: absolute;
  left: 50%;
  bottom: 50%;
  width: 22px;
  height: 8px;
  border: 1px solid black;
  transform: translateX(-50%) translateY(50%);
  border-radius: 40px;
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
