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
      <div id="IS01" class="IS01 inner top right top-left">
        <button @click="onProcessClick('IS01')">
          <div class="code">IS01</div>
          <div class="qty">{{ processData.IS01 }}</div>
        </button>
      </div>
      <div id="IS02" class="IS02 inner top center top-mid">
        <button @click="onProcessClick('IS02')">
          <div class="code">IS02</div>
          <div class="qty">{{ processData.IS02 }}</div>
        </button>
      </div>
      <div id="IS03" class="IS03 inner top left top-right">
        <button @click="onProcessClick('IS03')">
          <div class="code">IS03</div>
          <div class="qty">{{ processData.IS03 }}</div>
        </button>
      </div>
      <div id="IS04" class="IS04 inner mid right mid-left">
        <button @click="onProcessClick('IS04')">
          <div class="code">IS04</div>
          <div class="qty">{{ processData.IS04 }}</div>
        </button>
      </div>
      <div id="IS05" class="IS05 inner mid center mid-center">
        <button @click="onProcessClick('IS05')">
          <div class="code">IS05</div>
          <div class="qty">{{ processData.IS05 }}</div>
        </button>
      </div>
      <div id="IS06" class="IS06 inner mid left mid-right">
        <button @click="onProcessClick('IS06')">
          <div class="code">IS06</div>
          <div class="qty">{{ processData.IS06 }}</div>
        </button>
      </div>
      <div id="IS07" class="IS07 inner bottom right bottom-left">
        <button @click="onProcessClick('IS07')">
          <div class="code">IS07</div>
          <div class="qty">{{ processData.IS07 }}</div>
        </button>
      </div>
      <div id="IS08" class="IS08 inner bottom center bottom-center">
        <button @click="onProcessClick('IS08')">
          <div class="code">IS08</div>
          <div class="qty">{{ processData.IS08 }}</div>
        </button>
      </div>
      <div id="IS09" class="IS09 inner bottom left bottom-right">
        <button @click="onProcessClick('IS09')">
          <div class="code">IS09</div>
          <div class="qty">{{ processData.IS09 }}</div>
        </button>
      </div>

      <div id="DM01" class="DM01 outer top right top-left">
        <button @click="onProcessClick('DM01')">
          <div class="code">DM01</div>
          <div class="qty">{{ processData.DM01 }}</div>
        </button>
      </div>
      <div id="DM02" class="DM02 outer top center top-mid">
        <button @click="onProcessClick('DM02')">
          <div class="code">DM02</div>
          <div class="qty">{{ processData.DM02 }}</div>
        </button>
      </div>
      <div id="DM03" class="DM03 outer top left top-right">
        <button @click="onProcessClick('DM03')">
          <div class="code">DM03</div>
          <div class="qty">{{ processData.DM03 }}</div>
        </button>
      </div>
      <div id="DM04" class="DM04 outer mid right mid-left">
        <button @click="onProcessClick('DM04')">
          <div class="code">DM04</div>
          <div class="qty">{{ processData.DM04 }}</div>
        </button>
      </div>
      <!-- <div id="DM05" class="DM05 outer mid center mid-center">
          <button @click="onProcessClick('DM05')">
            <div class="code">DM05</div>
            <div class="qty">{{ processData.DM05 }}</div>
          </button>
        </div> -->
      <div id="DM06" class="DM06 outer mid left mid-right">
        <button @click="onProcessClick('DM06')">
          <div class="code">DM06</div>
          <div class="qty">{{ processData.DM06 }}</div>
        </button>
      </div>
      <div id="DM07" class="DM07 outer bottom right bottom-left">
        <button @click="onProcessClick('DM07')">
          <div class="code">DM07</div>
          <div class="qty">{{ processData.DM07 }}</div>
        </button>
      </div>
      <div id="DM08" class="DM08 outer bottom center bottom-center">
        <button @click="onProcessClick('DM08')">
          <div class="code">DM08</div>
          <div class="qty">{{ processData.DM08 }}</div>
        </button>
      </div>
      <div id="DM09" class="DM09 outer bottom left bottom-right">
        <button @click="onProcessClick('DM09')">
          <div class="code">DM09</div>
          <div class="qty">{{ processData.DM09 }}</div>
        </button>
      </div>

      <div id="MH01" class="MH01 external left">
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
      </div>



      <div id="HP02" class="HP02">
        <button @click="onProcessClick('HP02')">
          <div class="code">HP02</div>
          <div class="qty">{{ processData.HP02 }}</div>
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
      required: true,
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
button {
  font-size: 11px;
  font-weight: bold;
  border-style: none;
  border-width: 0;
  background-color: #fff;
  background: transparent;
}
:is(.inner, .outer, .external) > button > .qty {
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
  --outer-distance: -5px;
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

.external {
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
}

.HP02#HP02 {
  /* --HP02-distance: 0px; */
  position: absolute;
  /* top: 0; */
  bottom: 60px;
  /* margin: auto; */
  left: 50%;
  right: auto;
  height: fit-content;
  transform: translateX(-50%);
}
</style>
