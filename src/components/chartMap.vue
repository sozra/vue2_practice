<template>
  <div class="chartMap">
    <div class="map"></div>
  </div>
</template>

<script>
const mapJson = require("../json/china.json");
import * as echarts from "echarts";
export default {
  name: "chartMap省",
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
    // this.initMap()
  },
  methods: {
    initMap() {
      let myChart = echarts.init(document.querySelector(".map"));
      echarts.registerMap("china", mapJson, {
    //     '江西省': {
    //   left: -5,
    //   top: 25,
    //   width: 15
    // }
      });
      let option = {
        tooltip: {
          trigger: "item",
          // formatter: '{b}<br/>{c} (p / km2)'
        },
        // visualMap: {
        //     min: 800,
        //     max: 50000,
        //     text: ['High', 'Low'],
        //     realtime: false,
        //     calculable: true,
        //     inRange: {
        //         color: ['lightskyblue', 'yellow', 'orangered']
        //     }
        // },
        visualMap: {
          left: "right",
          min: 500000,
          max: 38000000,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
          text: ["High", "Low"],
          calculable: true,
        },
        series: [
          {
            name: "中国",
            type: "map",
            map: "china",
            roam: false,
            // label: {
            //   show: true,
            //   color: "rgba(0,0,0,0.4)",
            // },
            emphasis: {
              show: true,
            },
            data: [
              { name: "北京市", value: 28752677 },
              { name: "天津市", value: 26832957 },
              { name: "上海省", value: 3103224 },
              { name: "重庆省", value: 9312753 },
              { name: "河北省", value: 2008488 },
              { name: "河南省", value: 9742995 },
              { name: "云南省", value: 8964300 },
              { name: "辽宁省", value: 11642393 },
              { name: "黑龙江省", value: 12389048 },
              { name: "湖南省", value: 24696747 },
              { name: "安徽省", value: 20030328 },
              { name: "山东省", value: 25792692 },
              { name: "新疆维吾尔自治区", value: 14742651 },
              { name: "江苏省", value: 22973122 },
              { name: "浙江省", value: 1991580 },
              { name: "江西省", value: 33166267 },
              { name: "湖北省", value: 18915567 },
              { name: "广西壮族自治区", value: 25865507 },
              { name: "甘肃省", value: 1998048 },
              { name: "山西省", value: 34383171 },
              { name: "内蒙古自治区", value: 30981934 },
              { name: "陕西省", value: 32590569 },
              { name: "吉林省", value: 5471980 },
              { name: "福建省", value: 29986874 },
              { name: "贵州省", value: 24003863 },
              { name: "广东省", value: 34692825 },
              { name: "青海省", value: 8865892 },
              { name: "西藏自治区", value: 35367868 },
              { name: "四川省", value: 23672789 },
              { name: "宁夏回族自治区", value: 20785184 },
              { name: "海南省", value: 1515542 },
              { name: "台湾省", value: 23032205 },
              { name: "香港特别行政区", value: 32777476 },
              { name: "澳门特别行政区", value: 18648998 },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.map {
  height: 900px;
  width: 1440px;
}
</style>
