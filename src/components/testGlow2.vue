<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="app" :style="{ '--x': x, '--y': y }">
    <h1>{{ message }}</h1>

    <p>
      Learn more with the
      <a href="https://vuejs.org/" target="_blank" rel="noopener"
        >Vue Docs &amp; Resources</a
      >.
    </p>

    <button @click="doSomething">Say hello.</button>
    <div class="box-outer">
      <div class="box-inner"></div>
    </div>
    <div>x:{{ x }}</div>
    <div>y:{{ y }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxX: 0,
      boxY: 0,
      x: 0,
      y: 0,
      message: "Welcome to Vue!",
    };
  },
  mounted() {
    const box_outer = document.querySelector(".box-outer");
    const bounding_box = box_outer.getBoundingClientRect();
    this.boxX = bounding_box.left;
    this.boxY = bounding_box.top;
    document.addEventListener("mousemove", (e) => {
    //   console.log(e);
      // document.documentElement.style.setProperty("--x", e.offsetX + "px");
      // document.documentElement.style.setProperty("--y", e.offsetY + "px");
      this.x = e.clientX - this.boxX + "px";
      this.y = e.clientY - this.boxY + "px";
    });
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
  margin-top: 60px;
  background-color: lightblue;
}

a,
button {
  color: #4fc08d;
}

button {
  background: none;
  border: solid 1px;
  border-radius: 2em;
  font: inherit;
  padding: 0.75em 2em;
}
.box-outer {
  margin: 30px auto;
  height: 400px;
  width: 300px;
  /* border-color: lightblue; */
  /* border-width: 2px; */
  /* border-style: solid; */
  /* background: rgba(0, 0, 0, 0);
  background: radial-gradient(
    250px circle at var(--x) var(--y),
    #ff0000 0,
    transparent 100%
  ); */
  will-change: radial-gradient;
  padding: 2px;
  box-sizing: border-box;
}
.box-outer::before {
    content: "sozra";
  background: radial-gradient(
    250px circle at var(--x) var(--y),
    #ff0000 0,
    transparent 100%
  );
}
.box-inner {
  /* background-color: rgba(0, 0, 0, 0); */
  background-color: rgba(255,255,255,1);
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
</style>
