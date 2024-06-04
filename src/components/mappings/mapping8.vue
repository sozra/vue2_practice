<template>
  <div class="spec-container">
    <div class="spec">
      <div class="top">
        <div class="round1 round"></div>
        <div class="round2 round"></div>
        <div class="round3 round"></div>
        <div class="round4 round"></div>
        <div class="bar1 rect"></div>
        <div class="bar2 rect"></div>
        <div class="bar-center rect-vert"></div>
      </div>
      <button class="spec-btn hc01" @click="doSomething('hc01')">
        <div class="code">HC01</div>
        <div class="qty">{{ processData.HC01 }}</div>
      </button>
      <div class="cross-vert">
        <button class="spec-btn hc02" @click="doSomething('hc02')">
          <div class="code">HC02</div>
          <div class="qty">{{ processData.HC02 }}</div>
        </button>
      </div>
    </div>
  </div>
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
    doSomething(process) {
      // console.log(`child ${process} button clicked`);
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

.spec-container {
  position: relative;
  --line-width: 1px;
  /* width: 250px;
  height: 300px; */
  width: 150px;
    height: 200px;
}

.spec {
  position: relative;
  height: 100%;
  width: 100%;
  border: var(--line-width) solid black;
  border-radius: 10%;
}
.spec-btn {
  font-size: 11px;
  font-weight: bold;
  border-style: none;
  border-width: 0;
  background-color: #fff;
  background: transparent;
}
.spec-btn:hover {
  color: blue;
  cursor: pointer;
}
.spec-btn:active {
  color: red;
}
.qty {
  /* font-size: 20px; */
  /* font-weight: bold; */
  color: blue;
}
.hc01 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  /* border: var(--line-width) solid #333; */
  /* border-radius: 50%; */
}
.hc02 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  /* border: var(--line-width) solid #333; */
  /* border-radius: 50%; */
}
.top {
  position: relative;
  height: 30%;
  /* height: 120px; */
  width: 100%;
  border-bottom: calc(var(--line-width) + var(--line-width)) dotted black;
  display: grid;
  grid-template-columns: 2fr 1fr 0.5fr 1fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    ". round1 . round2 ."
    "bar1 . barCenter . bar2"
    ". round3 . round4 .";
}
.round {
  /* width: 100%; */
  height: 100%;
  border-radius: 50%;
  /* background-color: black; */
  border: var(--line-width) solid black;
  /* aspect-ratio: 1/1; */
}
.round1 {
  grid-area: round1;
}
.round2 {
  grid-area: round2;
}
.round3 {
  grid-area: round3;
}
.round4 {
  grid-area: round4;
}
.rect {
  width: 100%;
  height: 100%;
  /* background-color: black; */
  border: var(--line-width) solid black;
}
.bar1 {
  grid-area: bar1;
}
.bar2 {
  grid-area: bar2;
}
.rect-vert {
  width: 100%;
  height: 100%;
  /* background-color: black; */
  border: var(--line-width) solid black;
  border-radius: 5px;
}
.bar-center {
  grid-area: barCenter;
}

.cross-vert {
  position: absolute;
  /*! width: var(--line-width); */
  /* height: 150px; */
  height: 40%;
  left: 50%;
  /* top: 85%; */
  top: 90%;
  transform: translateX(-50%);
  border: 1px black solid;
  /* width: 100px; */
  width: 30%;
}
</style>
