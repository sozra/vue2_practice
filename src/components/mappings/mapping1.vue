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
      <!-- <div id="FC02" class="FC02 ">
        <button @click="onProcessClick('FC02')">
          <div class="code">FC02</div>
          <div class="qty">{{ processData.FC02 }}</div>
        </button>
      </div> -->



      <div id="TM01" class="TM01 inner top right top-left">
        <button @click="onProcessClick('TM01')">
          <div class="code">TM01</div>
          <div class="qty">{{ processData.TM01 }}</div>
        </button>
      </div>
      <div id="TM02" class="TM02 inner top center top-mid">
        <button @click="onProcessClick('TM02')">
          <div class="code">TM02</div>
          <div class="qty">{{ processData.TM02 }}</div>
        </button>
      </div>
      <div id="TM03" class="TM03 inner top left top-right">
        <button @click="onProcessClick('TM03')">
          <div class="code">TM03</div>
          <div class="qty">{{ processData.TM03 }}</div>
        </button>
      </div>
      <div id="TM04" class="TM04 inner mid right mid-left">
        <button @click="onProcessClick('TM04')">
          <div class="code">TM04</div>
          <div class="qty">{{ processData.TM04 }}</div>
        </button>
      </div>
      <div id="TM05" class="TM05 inner mid center mid-center">
        <button @click="onProcessClick('TM05')">
          <div class="code">TM05</div>
          <div class="qty">{{ processData.TM05 }}</div>
        </button>
      </div>
      <div id="TM06" class="TM06 inner mid left mid-right">
        <button @click="onProcessClick('TM06')">
          <div class="code">TM06</div>
          <div class="qty">{{ processData.TM06 }}</div>
        </button>
      </div>
      <div id="TM07" class="TM07 inner bottom right bottom-left">
        <button @click="onProcessClick('TM07')">
          <div class="code">TM07</div>
          <div class="qty">{{ processData.TM07 }}</div>
        </button>
      </div>
      <!-- <div id="round" class="round inner bottom center bottom-center">
        <div id="FC02" class="FC02 roundBtn">
          <button @click="onProcessClick('FC02')">
            <div class="code">FC02</div>
            <div class="qty">{{ processData.FC02 }}</div>
          </button>
        </div>
        <div id="TM08" class="TM08 roundBtn">
          <button @click="onProcessClick('TM08')">
            <div class="code">TM08</div>
            <div class="qty">{{ processData.TM08 }}</div>
          </button>
        </div>
      </div> -->
      <div id="TM08" class="TM08 inner bottom center bottom-center">
          <button @click="onProcessClick('TM08')">
            <div class="code">TM08</div>
            <div class="qty">{{ processData.TM08 }}</div>
          </button>
        </div>
      <div id="TM09" class="TM09 inner bottom left bottom-right">
        <button @click="onProcessClick('TM09')">
          <div class="code">TM09</div>
          <div class="qty">{{ processData.TM09 }}</div>
        </button>
      </div>

      <div id="IN01" class="IN01 outer top right top-left">
        <button @click="onProcessClick('IN01')">
          <div class="code">IN01</div>
          <div class="qty">{{ processData.IN01 }}</div>
        </button>
      </div>
      <!-- <div id="IN02" class="IN02 outer top center top-mid">
        <button @click="onProcessClick('IN02')">
          <div class="code">IN02</div>
          <div class="qty">{{ processData.IN02 }}</div>
        </button>
      </div> -->

      
      <div id="round" class="round outer top center top-mid">
        <div id="FC02" class="FC02 roundBtn">
          <button @click="onProcessClick('FC02')">
            <div class="code">FC02</div>
            <div class="qty">{{ processData.FC02 }}</div>
          </button>
        </div>
        <div id="IN02" class="IN02 roundBtn">
          <button @click="onProcessClick('IN02')">
            <div class="code">IN02</div>
            <div class="qty">{{ processData.IN02 }}</div>
          </button>
        </div>
      </div>
      
      
      <div id="IN03" class="IN03 outer top left top-right">
        <button @click="onProcessClick('IN03')">
          <div class="code">IN03</div>
          <div class="qty">{{ processData.IN03 }}</div>
        </button>
      </div>
      <div id="IN04" class="IN04 outer mid right mid-left">
        <button @click="onProcessClick('IN04')">
          <div class="code">IN04</div>
          <div class="qty">{{ processData.IN04 }}</div>
        </button>
      </div>
      <!-- <div id="IN05" class="IN05 outer mid center mid-center">
          <button @click="onProcessClick('IN05')">
            <div class="code">IN05</div>
            <div class="qty">{{ processData.IN05 }}</div>
          </button>
        </div> -->
      <div id="IN06" class="IN06 outer mid left mid-right">
        <button @click="onProcessClick('IN06')">
          <div class="code">IN06</div>
          <div class="qty">{{ processData.IN06 }}</div>
        </button>
      </div>
      <div id="IN07" class="IN07 outer bottom right bottom-left">
        <button @click="onProcessClick('IN07')">
          <div class="code">IN07</div>
          <div class="qty">{{ processData.IN07 }}</div>
        </button>
      </div>
      <div id="IN08" class="IN08 outer bottom center bottom-center">
        <button @click="onProcessClick('IN08')">
          <div class="code">IN08</div>
          <div class="qty">{{ processData.IN08 }}</div>
        </button>
      </div>
      <div id="IN09" class="IN09 outer bottom left bottom-right">
        <button @click="onProcessClick('IN09')">
          <div class="code">IN09</div>
          <div class="qty">{{ processData.IN09 }}</div>
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
        TM01: 0,
        TM02: 0,
        TM03: 0,
        TM04: 0,
        TM05: 0,
        TM06: 0,
        TM07: 0,
        TM08: 0,
        TM09: 0,
        IN01: 0,
        IN02: 0,
        IN03: 0,
        IN04: 0,
        IN05: 0,
        IN06: 0,
        IN07: 0,
        IN08: 0,
        IN09: 0,

        FC02: 0,
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
  /* review */
  --nineGap: 25px;
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
button {
  font-size: 11px;
  font-weight: bold;
  border-style: none;
  border-width: 0;
  background-color: #fff;
  background: transparent;
}
button > .qty {
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
  --radius: 13px;
  height: var(--radius);
  width: var(--radius);
  border: 1px solid black;
  border-radius: 50%;
  bottom: auto;
  top: 5px;
}



div#FC02,
div#IN02 {
  display: inline-grid;
  position: absolute;
    /* left: 50%; */
    transform: translateY(-50%);
    top: 50%;
}

div#FC02 {
  left: -35px;
}
div#IN02 {
  right: -35px;
}
</style>
