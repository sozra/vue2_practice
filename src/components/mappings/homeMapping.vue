<template>
  <div class="homeMapping">
    <!-- <Oval />
    <br>
    <NineSquare />
    <NineSquare /> -->
    <Map1
      class="map1"
      :processData="processLists"
      @onProcessClick="handleButtonClick"
    />
    <Map2
      class="map2"
      :processData="processLists"
      @onProcessClick="handleButtonClick"
    />
    <Map3
      class="map3"
      :processData="processLists"
      @onProcessClick="handleButtonClick"
    />
    <Map4
      class="map4"
      :processData="processLists"
      @onProcessClick="handleButtonClick"
    />
    <Map5
      class="map5"
      :processData="processLists"
      @onProcessClick="handleButtonClick"
    />
    <Map6
      class="map6"
      :processData="processLists"
      @onProcessClick="handleButtonClick"
    />
    <Map7
      class="map7"
      :processData="processLists"
      @onProcessClick="handleButtonClick"
    />
    <Map8
      class="map8"
      :processData="processLists"
      @onProcessClick="handleButtonClick"
    />
  </div>
</template>

<script>
export default {
  name: "homeMapping",
  components: {
    // Oval: () => import("./ellipse.vue"),
    // NineSquare: () => import("./NineSquare.vue"),
    Map1: () => import("./mapping1.vue"),
    Map2: () => import("./mapping2.vue"),
    Map3: () => import("./mapping3.vue"),
    Map4: () => import("./mapping4.vue"),
    Map5: () => import("./mapping5.vue"),
    Map6: () => import("./mapping6.vue"),
    Map7: () => import("./mapping7.vue"),
    Map8: () => import("./mapping8.vue"),
  },
  data() {
    return {
      // message: "Welcome to Vue!",
      processLists: {
        HC01: 0,
        HC02: 0,

        IS01: 0,
        IS02: 0,
        IS03: 0,
        IS04: 0,
        IS05: 0,
        IS06: 0,
        IS07: 0,
        IS08: 0,
        IS09: 0,

        DM01: 0,
        DM02: 0,
        DM03: 0,
        DM04: 0,
        DM05: 0,
        DM06: 0,
        DM07: 0,
        DM08: 0,
        DM09: 0,

        MH01: 0,
        MH02: 0,

        HP02: 0,

        FT01: 0,
        FT02: 0,
        FT03: 0,
        FT04: 0,
        FT05: 0,
        FT06: 0,

        BA01: 0,
        BA02: 0,
        BA03: 0,
        BA04: 0,
        BA05: 0,
        BA06: 0,
        BA07: 0,
        BA08: 0,
        BA09: 0,
        BA10: 0,
        BA11: 0,
        BA12: 0,
        BA13: 0,
        BA14: 0,
        BA15: 0,
        BA16: 0,

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
        // OE08: 0,
        SH01: 0,
        OE09: 0,
        HP01: 0,

        CG01: 0,
        CG02: 0,
        CG03: 0,
        CG04: 0,
        CG05: 0,
        CG06: 0,
        CG07: 0,
        CG08: 0,
        CG09: 0,
        FC01: 0,

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
      },
    };
  },
  mounted() {
    console.log("Home Mapping mounted");
    window.kk = this;
  },
  methods: {
    handleButtonClick(process) {
      console.log(`${process} button clicked`);
      // 在这里可以添加特定的函数事件处理逻辑
    },
  },
};
</script>

<style scoped>
.homeMapping {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "map1 map2 map3  map4"
    "map5 map6 map7  map8";
  justify-items: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 50px;
  min-height: 800px;
  min-width: 1200px;
}

/* .homeMapping>* {
  border: 2px  dotted  cyan;
} */

.map1 {
  grid-area: map1;
}
.map2 {
  grid-area: map2;
}
.map3 {
  grid-area: map3;
}
.map4 {
  grid-area: map4;
}
.map5 {
  grid-area: map5;
}
.map6 {
  grid-area: map6;
}
.map7 {
  grid-area: map7;
}
.map8 {
  grid-area: map8;
}
</style>
