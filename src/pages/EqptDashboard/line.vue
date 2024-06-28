<template>
  <div class="rows-container">
    <div class="rows" :class="{ last: isLast }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "StationLine",
  props: {
    currentIndex: Number,
    total: Number,
  },
  data() {
    return {};
  },
  computed: {
    isLast() {
      return this.currentIndex + 1 >= this.total;
    },
  },
};
</script>

<style scoped>
.rows-container {
  position: absolute;
  background-color: lightcyan;
  width: 100%;
  z-index: 0;
}
.rows {
  --row-gap: 115px;
  --border-width: 4px;
  --rows-top: 62px;
  width: 100%;
  height: 150px;
  border: var(--border-width) dashed orange;
  border-top-style: solid;
  border-top-width: calc(var(--border-width));

  border-left-width: 0;
  margin-bottom: var(--row-gap);
  position: absolute;
  top: var(--rows-top);
}
:not(.last).rows::before {
  content: "";
  border-left: var(--border-width) dashed orange;
  height: var(--row-gap);
  position: absolute;
  top: 100%;
}
.last.rows {
  border-left-width: 0;
  border-bottom-width: 0;
  border-right-width: 0;
}
.last.rows::after {
  --size: 10px;
  box-sizing: border-box;
  border: var(--size) solid orange;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-right-color: transparent;
  content: "";
  position: absolute;
  /*
  width:var(--size);
  height: var(--size);
  */
  /*background:red;*/
  left: 100%;
  /* top: calc(0% - var(--size) + (var(--border-width) / 2) - (var(--rows-top)/2)); */
  top: calc(0% - var(--border-width) / 2);
  transform: translateY(-50%);
}
</style>
