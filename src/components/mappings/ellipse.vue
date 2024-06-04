<template>
  <div class="oval-container">
    <div class="oval">
      <div class="line horizontal"></div>
      <div class="line vertical"></div>
      <div class="button-container">
        <button class="oval-button" @click="handleButtonClick('top-left')">
          <span>FT01</span>
          <span>1</span>
        </button>
        <button class="oval-button" @click="handleButtonClick('top-right')">
          <span>FT02</span>
          <span>2</span>
        </button>
        <button class="oval-button" @click="handleButtonClick('bottom-left')">
          <span>FT03</span>
          <span>3</span>
        </button>
        <button class="oval-button" @click="handleButtonClick('bottom-right')">
          <span>FT04</span>
          <span>4</span>
        </button>
        <button class="oval-button center" @click="handleButtonClick('center')">
          <span>FT05</span>
          <span>5</span>
        </button>
        <button class="oval-button corner" @click="handleButtonClick('corner')">
          <span>FT06</span>
          <span>6</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleButtonClick(position) {
      console.log(`${position} button clicked`);
      // 在这里可以添加特定的函数事件处理逻辑
    },
  },
};
</script>

<style scoped>
.oval-container {
  --line-width:1px;
  /* display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; */
  width: fit-content;
}

.oval {
  position: relative;
  width: 400px;
  height: 200px;
  background-color: #fff;
  border: var(--line-width) solid #333;
  border-radius: 50%;

  box-sizing: border-box;
  padding: 10px;
}

.line {
  position: absolute;
  /* background-color: #333; */
  z-index: 10;
}

.horizontal {
  width: 100%;
  height: var(--line-width);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border-bottom: 1px black dotted;
}

.vertical {
  width: var(--line-width);
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  border-right: 1px black dotted;
}

.button-container {
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--line-width) black solid;
  box-sizing: border-box;
  border-radius: 50%;
}

.oval-button {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  /* border: var(--line-width) solid #333; */
  border: 0px solid #333;
  border-radius: 25%;
  font-size: 14px;
  cursor: pointer;
}

.oval-button.center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: var(--line-width) solid #333;
}
button.oval-button.center:before {
  --gap: 10px;
  content: " ";
  position: absolute;
  z-index: -1;
  top: var(--gap);
  left: var(--gap);
  right: var(--gap);
  bottom: var(--gap);
  /* border: var(--line-width) solid black; */
  border-radius: 25%;
}
.oval-button.corner {
  left: 0%;
  /* top: 100%; */
bottom: 0;
  /* transform: translate(-50%, -50%); */
}

.oval-button:nth-child(1) {
  top: 35px;
  left: 100px;
}

.oval-button:nth-child(2) {
  top: 35px;
  right: 100px;
}

.oval-button:nth-child(3) {
  bottom: 35px;
  left: 100px;
}

.oval-button:nth-child(4) {
  bottom: 35px;
  right: 100px;
}
</style>
