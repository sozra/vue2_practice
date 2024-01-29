<template>
  <div class="hoverLight">
    <div class="point"></div>
    <div class="card"></div>
  </div>
</template>

<script>
export default {
  name: "hoverLight",
  mounted() {
    window.kk = this;
    document.addEventListener("mousemove", (e) => {
      document.documentElement.style.setProperty("--x", e.offsetX + "px");
      document.documentElement.style.setProperty("--y", e.offsetY + "px");
    });
  },
};
</script>

<style scoped>
:root {
  --x: 10px;
  --y: 10px;
}

.hoverLight {
    width: 100vw;
    height: 100vh;
  background: lightcyan;
  /*   overflow:hidden; */
  /*   z-index: 3; */
}
.point {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: lightblue;
  background: lightblue;
  /*   right: var(--x); */
  /*   bottom: var(--y); */
  /*   width: 1000px; */
  /*   height: 1000px; */
  width: 100%;
  height: 100%;
  mask: radial-gradient(
    25rem 25rem at var(--x) var(--y),
    #000 1%,
    transparent 50%
  );
  transition: 400ms mask ease;
  /*   z-index: 1; */
}

.point:has(+ .card:hover) {
  mask: radial-gradient(
    15rem 15rem at var(--x) var(--y),
    #000 10%,
    transparent 50%
  );
}

.card {
  width: 200px;
  height: 200px;
  background-color: lightgreen;
}
</style>
