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
      <div id="HA01" class="HA01 inner top left top-left">
        <button @click="onProcessClick('HA01')">
          <div class="code">HA01</div>
          <div class="qty">{{ processData.HA01 }}</div>
        </button>
      </div>
      <div id="HA02" class="HA02 inner top center top-mid">
        <button @click="onProcessClick('HA02')">
          <div class="code">HA02</div>
          <div class="qty">{{ processData.HA02 }}</div>
        </button>
      </div>
      <div id="HA03" class="HA03 inner top right top-right">
        <button @click="onProcessClick('HA03')">
          <div class="code">HA03</div>
          <div class="qty">{{ processData.HA03 }}</div>
        </button>
      </div>
      <div id="HA04" class="HA04 inner mid left mid-left">
        <button @click="onProcessClick('HA04')">
          <div class="code">HA04</div>
          <div class="qty">{{ processData.HA04 }}</div>
        </button>
      </div>
      <div id="HA05" class="HA05 inner mid center mid-center">
        <button @click="onProcessClick('HA05')">
          <div class="code">HA05</div>
          <div class="qty">{{ processData.HA05 }}</div>
        </button>
      </div>
      <div id="HA06" class="HA06 inner mid right mid-right">
        <button @click="onProcessClick('HA06')">
          <div class="code">HA06</div>
          <div class="qty">{{ processData.HA06 }}</div>
        </button>
      </div>
      <div id="HA07" class="HA07 inner bottom left bottom-left">
        <button @click="onProcessClick('HA07')">
          <div class="code">HA07</div>
          <div class="qty">{{ processData.HA07 }}</div>
        </button>
      </div>
      <div id="round" class="round inner bottom center bottom-center">
        <div id="HP01" class="HP01 roundBtn">
          <button @click="onProcessClick('HP01')">
            <div class="code">HP01</div>
            <div class="qty">{{ processData.HP01 }}</div>
          </button>
        </div>
        <div id="HA08" class="HA08 roundBtn">
          <button @click="onProcessClick('HA08')">
            <div class="code">HA08</div>
            <div class="qty">{{ processData.HA08 }}</div>
          </button>
        </div>
      </div>
      <div id="HA09" class="HA09 inner bottom right bottom-right">
        <button @click="onProcessClick('HA09')">
          <div class="code">HA09</div>
          <div class="qty">{{ processData.HA09 }}</div>
        </button>
      </div>

      <div id="OE01" class="OE01 outer top left top-left">
        <button @click="onProcessClick('OE01')">
          <div class="code">OE01</div>
          <div class="qty">{{ processData.OE01 }}</div>
        </button>
      </div>
      <div id="OE02" class="OE02 outer top center top-mid">
        <button @click="onProcessClick('OE02')">
          <div class="code">OE02</div>
          <div class="qty">{{ processData.OE02 }}</div>
        </button>
      </div>
      <div id="OE03" class="OE03 outer top right top-right">
        <button @click="onProcessClick('OE03')">
          <div class="code">OE03</div>
          <div class="qty">{{ processData.OE03 }}</div>
        </button>
      </div>
      <div id="OE04" class="OE04 outer mid left mid-left">
        <button @click="onProcessClick('OE04')">
          <div class="code">OE04</div>
          <div class="qty">{{ processData.OE04 }}</div>
        </button>
      </div>
      <!-- <div id="OE05" class="OE05 outer mid center mid-center">
          <button @click="onProcessClick('OE05')">
            <div class="code">OE05</div>
            <div class="qty">{{ processData.OE05 }}</div>
          </button>
        </div> -->
      <div id="OE06" class="OE06 outer mid right mid-right">
        <button @click="onProcessClick('OE06')">
          <div class="code">OE06</div>
          <div class="qty">{{ processData.OE06 }}</div>
        </button>
      </div>
      <div id="OE07" class="OE07 outer bottom left bottom-left">
        <button @click="onProcessClick('OE07')">
          <div class="code">OE07</div>
          <div class="qty">{{ processData.OE07 }}</div>
        </button>
      </div>
      <div id="SH01" class="SH01 outer bottom center bottom-center">
        <button @click="onProcessClick('SH01')">
          <div class="code">SH01</div>
          <div class="qty">{{ processData.SH01 }}</div>
        </button>
      </div>
      <div id="OE09" class="OE09 outer bottom right bottom-right">
        <button @click="onProcessClick('OE09')">
          <div class="code">OE09</div>
          <div class="qty">{{ processData.OE09 }}</div>
        </button>
      </div>

      <!-- <div id="MH01" class="MH01 external left">
        <button @click="onProcessClick('MH01')">
          <div class="code">MH01</div>
          <div class="qty">{{ processData.MH01 }}</div>
        </button>
      </div>
      <div id="MH02" class="MH02 external right">
        <button @click="onProcessClick('MH02')">
          <div class="code">MH02</div>
          <div class="qty">{{ processData.MH02 }}</div>
        </button>
      </div> -->
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
        HA01: 0,
        HA02: 0,
        HA03: 0,
        HA04: 0,
        HA05: 0,
        HA06: 0,
        HA07: 0,
        HA08: 0,
        HA09: 0,
        OE01: 0,
        OE02: 0,
        OE03: 0,
        OE04: 0,
        OE05: 0,
        OE06: 0,
        OE07: 0,
        SH01: 0,
        OE09: 0,

        HP01: 0,
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
  /* margin-top: 60px; */
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
  /* gap: 1px;;  */
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  /* background:black; */
}
.ninesquareGrid:before {
  --nineGap: 10px;
  content: "";
  position: absolute;
  width: calc(100% - var(--nineGap) - var(--nineGap));
  height: calc(100% - var(--nineGap) - var(--nineGap));
  /* background: orange; */
  opacity: 0.4;
  /* margin: 25px; */
  box-sizing: border-box;
  border: 3px blue dotted;
  padding: 20px;
  top: var(--nineGap);
  left: var(--nineGap);
  border-radius: 20%;
  border-style: solid;
  border-color: black;
  border-width: 1px;
}

.grid:before {
  position: absolute;
  content: "";
  --gap: 10px;
  height: calc(100% - var(--gap) - var(--gap));
  width: calc(100% - var(--gap) - var(--gap));
  /* width: 100%; */
  border: black 1px solid;
  box-sizing: border-box;
  /* padding: 60px; */
  left: var(--gap);
  top: var(--gap);
  /* bottom: 30px; */
  border-radius: 20%;
}

.cell {
  /* background-color: yellow; */
  background-color: white;
  border: 0px black solid;
  border-style: solid;
  border-color: black;
  /* border-radius: 20%; */
  box-sizing: border-box;
  background: transparent;
  /* background:white; */
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
  /* font-size: 12px; */
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
  /* background-color: #f0f0f0; */
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
  bottom: 30px;
}

div#HP01,
div#HA08 {
  position: absolute;
  /* top: 50%; */
  left: 50%;
  transform: translateX(-50%);
}

div#HP01 {
  top: -20px;
}
div#HA08 {
  bottom: -15px;
}
</style>
