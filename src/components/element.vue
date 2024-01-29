<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        v-for="item in column"
        :label="item"
        :prop="item"
        :key="item"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "element",
  data() {
    return {
      tableData: [],
      column: [],
    };
  },
  mounted() {
    // 模拟接口数据
    const response = {
      DATA: [
        {
          shoporder: "TEST-GSA230830001",
          matNo: "13375450-00",
          custMatNo: null,
          modelNo: "CELL",
          color: "SPACE GRAY",
          memory: "64GB",
          gbMatno: null,
          name: null,
          actualStartTime: null,
          timeOver: null,
          qty: 10000000,
          inQty: 1,
          invested: 9999999,
          map: {
            A: 1,
            "ASSY-MLB": 2,
          },
          gbWip: null,
          fgWip: null,
          status: null,
          startTime: null,
          endTime: null,
          currentPageNo: 0,
          pageSize: 0,
        },
        {
          shoporder: "维修-6882",
          matNo: "13375450-00",
          custMatNo: "MK663LL/A",
          modelNo: "CELL",
          color: "SPACE GRAY",
          memory: "64GB",
          gbMatno: null,
          name: null,
          actualStartTime: null,
          timeOver: null,
          qty: 500,
          inQty: 1,
          invested: 499,
          map: {
            A: 3,
            "ASSY-MLB": 4,
          },
          gbWip: null,
          fgWip: null,
          status: null,
          startTime: null,
          endTime: null,
          currentPageNo: 0,
          pageSize: 0,
        },
      ],
      RESULT: "PASS",
    };
    // 表格数据
    // [{"A":0,"ASSY-MLB":0},{"A":0,"ASSY-MLB":0}]
    this.tableData = response.DATA.map((el) => el.map);
    // 表格列
    // ["A","ASSY-MLB"]
    this.column = Object.keys(this.tableData[0]);
  },
};
</script>
