<template>
  <div class="PersonCard">
    <div class="processName">{{ person.processName }}</div>
    <div class="status">
      <div class="greenStatus statusWrap">
        <div class="statusColor"></div>
        <div class="statusText">{{ person.regularCount }}x</div>
      </div>
      <div class="yellowStatus statusWrap">
        <div class="statusColor"></div>
        <div class="statusText">{{ person.practiceCount }}x</div>
      </div>
    </div>
    <div id="cardPie" class="cardPie"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "PersonCard",
  props: {
    person: {
      type: Object,
      // required: true,
      // default: () => ({}),
      default: () => ({
        regularCount: 3,
        employeeList: [
          {
            workNo: "TEST-ZX-1",
            grade: 0,
            productRate: 0.33,
            workName: "张三",
            productCount: 4,
          },
          {
            workNo: "474140",
            grade: 1,
            productRate: 0.33,
            workName: "李四",
            productCount: 4,
          },
          {
            workNo: "3958492",
            grade: 0,
            productRate: 0.33,
            workName: "王五",
            productCount: 6,
          },
        ],
        processName: "ZD-MPK200-WT",
        practiceCount: 0,
      }),
    },
  },
  data() {
    return {
      pieOption: {
        title: {
          text: "",
          // subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: false,
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["30%", "35%"],
            data: [
              { value: 1048, name: "上岗-张三" },
              { value: 735, name: "实习-李四" },
              { value: 580, name: "上岗-王五" },
              { value: 484, name: "实习-赵六" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              formatter: "{b} \n{@2012} ({d}%)",
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.renderChart();
    });
  },
  methods: {
    renderChart() {
      let seriesData = this.person.employeeList.map((item) => {
        return {
          value: item.productCount,
          name: `${parseInt(item.grade)==1?'上岗':'实习'}-${item.workName}`,
        };
      });
      seriesData.sort((a, b) => b.value - a.value);
      this.pieOption.series[0].data = seriesData;
      const cardPie = echarts.init(document.getElementById("cardPie"));
      cardPie.setOption(this.pieOption);
    },
  },
};
</script>


<style scoped>
.PersonCard {
  width: 400px;
  height: 400px;
  /* background-color: #f0f0f0; */
  /* border-radius: 20px; */
  /* padding: 20px; */
  margin: 20px;
  padding-bottom: 40px;
  border: 2px solid #f0f0f0;
}
.processName {
  text-align: center;
  background-color: hsl(0, 0%, 85%);
  height: 40px;
  line-height: 40px;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 1.3rem;
}
.cardPie {
  width: 400px;
  height: 300px;
}

.statusWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 60px;
  /* margin-left: 100px; */
}
.status {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

.statusColor {
  width: 100px;
  height: 50px;
  
  /* border-radius: 50%; */
  border-radius: 20px;
  margin-right: 5px;
}
.greenStatus .statusColor{
  background-color: green;
}
.yellowStatus .statusColor{
  background-color: yellow;
}

</style>