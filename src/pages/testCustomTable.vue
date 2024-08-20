<template>
  <div class="testCustomTable">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column
        v-for="column in customTableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :formatter="column.formatter?column.formatter:null"
        >
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "TestCustomTable",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          judgeType: 1,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          judgeType: 2,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          judgeType: 3,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          judgeType: 4,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          judgeType: 5,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          judgeType: 6,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          judgeType: 7,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          judgeType: 1,
        },
      ],
      customTableColumns: [
        {
          prop: "judgeType",
          label: "判定结果",
          width: "180",
          formatter: (row, column, cellValue, index) => {
            // 1：返工 2：返修 3：报废 4：让步接收 5：挑选使用  6：料废 7：工废
            let result = "";
            switch (cellValue) {
              case 1:
                result = "返工";
                break;
              case 2:
                result = "返修";
                break;
              case 3:
                result = "报废";
                break;
              case 4:
                result = "让步接收";
                break;
              case 5:
                result = "挑选使用";
                break;
              case 6:
                result = "料废";
                break;
              case 7:
                result = "工废";
                break;
              default:
                result = "";
                break;
            }
            return result;
          },
        },
      ],
    };
  },
  mounted() {
    window.kk = this;
    console.log("this.tableData", this.tableData);
  },
};
</script>
