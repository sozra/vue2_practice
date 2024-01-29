<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="app2">
    <div
      style="display:flex; justify-content: center;flex-direction:column; height:300px;"
    >
      <div id="radio-group-color">
        <div class="radio-white">
          <input type="radio" id="white" value="white" v-model="colorPicked" />
          <label for="white">white</label>
        </div>
        <div class="radio-rgb">
          <input type="radio" id="rgb" value="rgb" v-model="colorPicked" />
          <label for="rgb">multiple colors</label>
        </div>
        <!-- <span>colorPicked: {{ colorPicked }}</span> -->
      </div>

      <div id="radio-group-inset">
        <div class="radio-inset">
          <input type="radio" id="inset" value="inset" v-model="insetPicked" />
          <label for="inset">inset</label>
        </div>
        <div class="radio-outside">
          <input
            type="radio"
            id="outside"
            value="outside"
            v-model="insetPicked"
          />
          <label for="outside">outside</label>
        </div>
        <!-- <span>insetPicked: {{ insetPicked }}</span> -->
      </div>

      <div id="radio-group-hover">
        <div class="radio-normal">
          <input
            type="radio"
            id="normal"
            value="normal"
            v-model="insidePicked"
          />
          <label for="normal">normal</label>
        </div>
        <div class="radio-hover">
          <input type="radio" id="hover" value="hover" v-model="insidePicked" />
          <!-- <label for="hover">hover effect</label> -->
          <label for="hover">inside hover</label>
        </div>
        <div class="radio-none">
          <input type="radio" id="none" value="none" v-model="insidePicked" />
          <!-- <label for="none">no effect</label> -->
          <label for="none">only border</label>
        </div>
        <!-- <span>insidePicked: {{ insidePicked }}</span> -->
      </div>
    </div>

    <div style="color:white;">
      <div>x:{{ x }}</div>
      <div>y:{{ y }}</div>
    </div>
    <div class="card-grid" :class="alphaClass">
      <div
        v-for="(item, index) in 6"
        :key="index"
        class="box-outer "
        :class="outerClass(index)"
        :style="{
          '--x': coordinateList[index].x,
          '--y': coordinateList[index].y,
          '--glow-color': selectedColorList[index],
        }"
      >
        <div class="box-inner " :class="'inner' + index"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isUpdating: false,
      boxX_1: 0,
      boxY_1: 0,
      coordinateList: [],
      colorPicked: "white",
      insetPicked: "inset",
      insidePicked: "normal",
      x: 0,
      y: 0,
      colorListRGB: ["red", "green", "blue", "yellow", "pink", "orange"],
      colorListWhite: new Array(6).fill("white"),
      message: "Welcome to Vue!",
    };
  },
  created() {
    this.coordinateList = new Array(6).fill({ x: 0, y: 0 });
  },
  mounted() {
    // const box_outer_1 = document.querySelector(".outer1");
    // const bounding_box_1 = box_outer_1.getBoundingClientRect();
    // this.boxX_1 = bounding_box_1.left;
    // this.boxY_1 = bounding_box_1.top;
    // this.$nextTick(()=>{

    for (let i = 0; i < 6; i++) {
      const box_outer = document.querySelector(".outer" + i);
      const bounding_box = box_outer.getBoundingClientRect();
      this.coordinateList[i] = { x: bounding_box.left, y: bounding_box.top };
    }
    // })
    document.addEventListener("mousemove", this.updateMousePosition)
    // document.addEventListener("mousemove", (e) => {
      //   console.log(e);
      // document.documentElement.style.setProperty("--x", e.offsetX + "px");
      // document.documentElement.style.setProperty("--y", e.offsetY + "px");
      //   this.x = e.clientX - this.boxX_1 + "px";
      //   this.y = e.clientY - this.boxY_1 + "px";
      //   this.x = e.clientX;
      //   this.y = e.clientY;
      //   this.coordinateList.forEach((coordinate, index) => {
      //     const box_outer = document.querySelector(".outer" + index);
      //     const bounding_box = box_outer.getBoundingClientRect();
      //     this.coordinateList[index] = {
      //       x: e.clientX - bounding_box.left + "px",
      //       y: e.clientY - bounding_box.top + "px",
      //     };
      //   });
      
    // });
  },
  computed: {
    selectedColorList() {
      if (this.colorPicked == "white") {
        return this.colorListWhite;
      } else {
        return this.colorListRGB;
      }
    },
    alphaClass() {
      if (this.insidePicked == "normal") {
        return "alpha-normal";
      } else if (this.insidePicked == "hover") {
        return "alpha-hover";
      } else {
        return "alpha-none";
      }
    },
  },
  methods: {
    outerClass(index) {
      let classObj = {};
      if (this.insetPicked == "inset") {
        classObj["inset"] = true;
      }
      classObj["outer" + index] = true;
      return classObj;
    },
    /**
     * Updates the mouse position.
     * @param {MouseEvent} e - The mouse event object.
     */
    updateMousePosition(e) {
        // 更新鼠标位置
        //   this.mousePosition = { x: e.clientX, y: e.clientY };
        this.x = e.clientX;
        this.y = e.clientY;

        // 如果没有正在更新，则调用更新函数
        if (!this.isUpdating) {
            this.isUpdating = true;
            requestAnimationFrame(this.applyMouseMoveEffects);
        }
    },
    /**
     * Applies mouse move effects to the component.
     * This function updates the DOM based on the mouse coordinates.
     */
    applyMouseMoveEffects() {
        // const x = this.x;
        // const y = this.y;
        // 在这里执行实际的DOM更新
        // 例如：this.coordinateList[index] = { x: e.clientX - bounding_box.left, y: e.clientY - bounding_box.top };

        this.coordinateList.forEach((coordinate, index) => {
            const box_outer = document.querySelector(".outer" + index);
            const bounding_box = box_outer.getBoundingClientRect();
            this.coordinateList[index] = {
                x: this.x - bounding_box.left + "px",
                y: this.y - bounding_box.top + "px",
            };
        });
        // 更新完成后，设置标志为false
        this.isUpdating = false;
    },
  },
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
body {
  background-color: var(--bg-color);
}
:root {
  --bg-color: rgb(29, 30, 34);
  --card-bg-color: darkslategray;
}
#app2 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  padding-left: 20px;
  /* background-color: rgb(29, 30, 34); */
  display: grid;
  grid-template-columns: 200px 100px 1fr;
}

#radio-group-color,
#radio-group-inset,
#radio-group-hover {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: first baseline;
  width: 150px;
  margin: auto;
  border-color: white;
  border-style: solid;
  border-width: 1px;
  position: relative;
  padding: 5px;
  border-radius: 10px;
}

#radio-group-color::before,
#radio-group-inset::before,
#radio-group-hover::before {
  /* position: relative; */
  position: absolute;
  content: "Color";
  top: -15px;
  left: 5px;
  background-color: var(--bg-color);
}

#radio-group-inset::before {
  content: "Inset";
}

#radio-group-hover::before {
  content: "Card Hover";
}

.card-grid {
  margin: auto auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-gap: 1em; */
  /* margin: 1em; */
  /* grid-gap: 30px; */
  width: 1000px;
  row-gap: 30px;
}

.box-outer {
  /* margin: 30px auto; */
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
  padding: 3px;
  box-sizing: border-box;
  position: relative;
  /* border-radius: 15px; */
  background-color: none;
}

.box-outer.inset {
  height: 398px;
  width: 298px;
  /* border-color: #2c3e50; */
  border-color: var(--bg-color);
  border-width: 1px;
  border-style: solid;
  background-color: var(--card-bg-color);
  /* background-color: white; */
  box-sizing: border-box;
}

/* .box-outer.outer1::before {
    background: radial-gradient(
    250px circle at var(--x) var(--y),
    yellow 0,
    transparent 100%
  );
} */
.box-outer::before {
  content: "sozra";
  background: radial-gradient(
    250px circle at var(--x) var(--y),
    var(--glow-color) 0,
    transparent 100%
  );
  will-change: radial-gradient;
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  inset: 0;
  box-sizing: border-box;
  /* border-radius: 15px; */
  /* border-width: 1px; */
  /* border-style: none; */
  /* border-color: white; */
}

.alpha-normal {
  --alpha: 0.8;
  --alpha-hover: 0.8;
}

.alpha-hover {
  --alpha: 1;
  --alpha-hover: 0.8;
}

.alpha-none {
  --alpha: 1;
  --alpha-hover: 1;
}

.box-inner {
  /* --alpha: 1; */
  /* background-color: rgba(0, 0, 0, 0); */
  /* background-color: rgba(173, 216, 230, var(--alpha)); */
  /* background-color: cyan; */
  background-color: var(--card-bg-color);
  opacity: var(--alpha);
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
  /* border-radius: 15px; */
  transition: background-color 0.3s, opacity 0.5s;
}
.box-inner:hover {
  /* --alpha: 0.8; */
  /* background-color: rgba(173, 216, 230, var(--alpha-hover)); */
  background-color: var(--card-bg-color);
  opacity: var(--alpha);
  opacity: var(--alpha-hover);
  transition: background-color 0.3s, opacity 0.5s;
}
</style>
