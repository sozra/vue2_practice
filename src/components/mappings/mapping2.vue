<template>
  <!-- <div id="app"> -->
  <div class="ninesquare">
    <div class="ninesquareGrid">
      <div class="cell a1"></div>
      <div class="cell a2"></div>
      <div class="cell a3"></div>
      <div class="cell a4"></div>
      <div class="cell a5"></div>
      <div class="cell a6"></div>
      <div class="cell a7"></div>
      <div class="cell a8"></div>
      <div class="cell a9"></div>
    </div>
    <div class="btn-group">
      <div id="CG01" class="CG01 inner top left top-left">
        <button @click="onProcessClick('CG01')">
          <div class="code">CG01</div>
          <div class="qty">{{ processData.CG01 }}</div>
        </button>
      </div>
      <div id="round" class="round inner top center top-mid">
        <div id="FC01" class="FC01 roundBtn">
          <button @click="onProcessClick('FC01')">
            <div class="code">FC01</div>
            <div class="qty">{{ processData.FC01 }}</div>
          </button>
        </div>
        <div id="CG02" class="CG02 roundBtn">
          <button @click="onProcessClick('CG02')">
            <div class="code">CG02</div>
            <div class="qty">{{ processData.CG02 }}</div>
          </button>
        </div>
      </div>
      <!-- <div id="CG02" class="CG02 inner top center top-mid">
        <button @click="onProcessClick('CG02')">
          <div class="code">CG02</div>
          <div class="qty">{{ processData.CG02 }}</div>
        </button>
      </div> -->
      <div id="CG03" class="CG03 inner top right top-right">
        <button @click="onProcessClick('CG03')">
          <div class="code">CG03</div>
          <div class="qty">{{ processData.CG03 }}</div>
        </button>
      </div>
      <div id="CG04" class="CG04 inner mid left mid-left">
        <button @click="onProcessClick('CG04')">
          <div class="code">CG04</div>
          <div class="qty">{{ processData.CG04 }}</div>
        </button>
      </div>
      <div id="CG05" class="CG05 inner mid center mid-center">
        <button @click="onProcessClick('CG05')">
          <div class="code">CG05</div>
          <div class="qty">{{ processData.CG05 }}</div>
        </button>
      </div>
      <div id="CG06" class="CG06 inner mid right mid-right">
        <button @click="onProcessClick('CG06')">
          <div class="code">CG06</div>
          <div class="qty">{{ processData.CG06 }}</div>
        </button>
      </div>
      <div id="CG07" class="CG07 inner bottom left bottom-left">
        <button @click="onProcessClick('CG07')">
          <div class="code">CG07</div>
          <div class="qty">{{ processData.CG07 }}</div>
        </button>
      </div>
      <div id="CG08" class="CG08 inner bottom center bottom-center">
        <button @click="onProcessClick('CG08')">
          <div class="code">CG08</div>
          <div class="qty">{{ processData.CG08 }}</div>
        </button>
      </div>
      <!-- <div id="round" class="round inner bottom center bottom-center">
        <div id="FC01" class="FC01 roundBtn">
          <button @click="onProcessClick('FC01')">
            <div class="code">FC01</div>
            <div class="qty">{{ processData.FC01 }}</div>
          </button>
        </div>
        <div id="CG08" class="CG08 roundBtn">
          <button @click="onProcessClick('CG08')">
            <div class="code">CG08</div>
            <div class="qty">{{ processData.CG08 }}</div>
          </button>
        </div>
      </div> -->
      <div id="CG09" class="CG09 inner bottom right bottom-right">
        <button @click="onProcessClick('CG09')">
          <div class="code">CG09</div>
          <div class="qty">{{ processData.CG09 }}</div>
        </button>
      </div>

    </div>
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
        CG01: 0,
        CG02: 0,
        CG03: 0,
        CG04: 0,
        CG05: 0,
        CG06: 0,
        CG07: 0,
        CG08: 0,
        CG09: 0,

        FC01: 0,
        // MH01: 0,
        // MH02: 0,
      }),
    },
  },
  data() {
    return {};
  },
  methods: {
    onProcessClick(process) {
      // console.log(`mapping4 ${process} button clicked`);
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
  
  margin-left: 60px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.ninesquare {
  position: relative;
  width: 250px;
  height: 250px;
}

.ninesquareGrid {
  /* width: 300px;
  height: 300px; */
  width: 100%;
  height: 100%;
  border: #fcbe24 1px solid;
  border-color: black;
  border-radius: 20%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  
}
/* .ninesquareGrid:before {
  --nineGap: 10px;
  content: "";
  position: absolute;
  width: calc(100% - var(--nineGap) - var(--nineGap));
  height: calc(100% - var(--nineGap) - var(--nineGap));
  
  opacity: 0.4;
  
  box-sizing: border-box;
  border: 3px blue dotted;
  padding: 20px;
  top: var(--nineGap);
  left: var(--nineGap);
  border-radius: 20%;
  border-style: solid;
  border-color: black;
  border-width: 1px;
} */

.grid:before {
  position: absolute;
  content: "";
  --gap: 10px;
  height: calc(100% - var(--gap) - var(--gap));
  width: calc(100% - var(--gap) - var(--gap));
  
  border: black 1px solid;
  box-sizing: border-box;
  
  left: var(--gap);
  top: var(--gap);
  
  border-radius: 20%;
}

.cell {
  
  background-color: white;
  border: 0px black solid;
  border-style: solid;
  border-color: black;
  
  box-sizing: border-box;
  background: transparent;
  
}

.cell:nth-child(n + 4):nth-child(-n + 6) {
  border-top-width: 1px;
  border-bottom-width: 1px;
}
.cell:nth-child(3n + 2) {
  border-left-width: 1px;
  border-right-width: 1px;
}

.btn-group {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.inner {
  --inner-distance: 35px;
  position: absolute;
}
.inner > button,
.outer > button,
.external > button,
.roundBtn > button {
  font-size: 11px;
  font-weight: bold;
  border-style: none;
  border-width: 0;
  background-color: #fff;
  background: transparent;
}
:is(.inner, .outer, .external, .roundBtn) > button > .qty {
  
  color: blue;
}

.inner.center,
.inner.mid,
.outer.center,
.outer.mid {
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
}
.inner.left {
  left: var(--inner-distance);
  right: auto;
}
.inner.right {
  right: var(--inner-distance);
  left: auto;
}
.inner.top {
  top: var(--inner-distance);
  bottom: auto;
}
.inner.bottom {
  bottom: var(--inner-distance);
  top: auto;
}

.outer {
  --outer-distance: -12px;
  position: absolute;
}

button:hover {
  
  color: blue;
  cursor: pointer;
}

.outer.left {
  left: var(--outer-distance);
  right: auto;
}
.outer.right {
  right: var(--outer-distance);
  left: auto;
}
.outer.top {
  top: var(--outer-distance);
  bottom: auto;
}
.outer.bottom {
  bottom: var(--outer-distance);
  top: auto;
}

/* .external {
  --external-distance: -50px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: fit-content;
}
.external.left {
  left: var(--external-distance);
  right: auto;
}
.external.right {
  right: var(--external-distance);
  left: auto;
} */

.round#round {
  --radius: 35px;
  height: var(--radius);
  width: var(--radius);
  border: 1px solid black;
  border-radius: 50%;
  bottom: auto;
  top: 0;
}

div#FC01,
div#CG02 {
  position: absolute;
  
  left: 50%;
  transform: translateX(-50%);
}

div#FC01 {
  top: -20px;
}
div#CG02 {
  bottom: -25px;
}
</style>
