<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <!-- <div id="app"> -->
    <div class="ninesquare">
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
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      message: "Welcome to Vue!",
    };
  },
  methods: {
    doSomething() {
      alert("Hello!");
    },
  },
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

body {
  /* color: #fcbe24;
  padding: 0 24px;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.ninesquare {
  width: 300px;
  height: 300px;
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
/*
  .cell:nth-child(1) {
    border-top-left-radius: 50px;
  }
  .cell:nth-child(-n + 3) {
    border-top-width: 0;
  }
    .cell:nth-child(3n+1) {
    border-left-width: 0;
  }
    .cell:nth-child(3n+3) {
    border-right-width: 0;
  }
    .cell:nth-child(n+7):nth-child(-n+9) {
    border-bottom-width: 0;
     
  }
  */
.cell:nth-child(n + 4):nth-child(-n + 6) {
  border-top-width: 1px;
  border-bottom-width: 1px;
}
.cell:nth-child(3n + 2) {
  border-left-width: 1px;
  border-right-width: 1px;
}
</style>
