<template>
  <div class="CurrentTask">
    <el-table
      :data="props.tableData"
      style="width: 100%;background-color: rgb(18, 29, 67) !important;"
      :cell-style="cellStyle"
    >
      <el-table-column
        type="index"
        label="排序"
        width="45"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="handlerNames"
        label="处理人"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="qty" label="" align="center">
        <template slot-scope="scope">
          <!-- <div class="table-progress-bar"> -->
          <el-progress
            :text-inside="true"
            :show-text="false"
            :stroke-width="12"
            color="linear-gradient(45deg, rgb(102, 123, 171), rgb(60, 80, 131))"
            define-back-color="#353f5f"
            text-color="black"
            :percentage="qtyPercent(scope.row.qty)"
          ></el-progress>

          <!-- <div class="progress-date progress-date-table">
                    <span :class="{ timeNull: !scope.row.miniLinePlanTime }" :style="tableProgressDateTextColor(scope.row).planColor">
                      {{scope.row.miniLinePlanTime ? scope.row.miniLinePlanTime : "."}}
                    </span>
                    <span :style="tableProgressDateTextColor(scope.row).cpColor">{{ scope.row.minilineCPtime }}</span>
                  </div> -->
          <!-- </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="qty" label="数量" width="60" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  tableData: {
    type: Array,
    default: () => [
      {
        handlerNames: "张三",
        qty: 50,
      },
      {
        handlerNames: "李四",
        qty: 30,
      },
      {
        handlerNames: "王五",
        qty: 20,
      },
    ],
  },
  //   highlighted: {
  //     type: String,
  //     default: '',
  //   },
});
const highestQty = computed(() => {
  if (props.tableData.length === 0) return null;
  return props.tableData.reduce((acc, cur) => {
    return acc.qty > cur.qty ? acc : cur;
  });
});
const qtyPercent = (qty) => {
  if (!highestQty.value) return 0;
  else if (!qty || qty === 0) return 0;
  else return (qty / highestQty.value.qty) * 100;
};
const cellStyle = ({ row, column, rowIndex, columnIndex }) => {
  let style = {
    "background-color": "rgb(18, 29, 67)",
  };
  if (columnIndex === 2) {
    style["padding"] = "0";
  }
  return style;
};
</script>

<style scoped>
.CurrentTask {
  padding-top: 10px;
  margin-left: -16px;
  margin-right: -16px;
  background-color: rgb(18, 29, 67) !important;
}
::v-deep .el-progress-bar {
  padding-right: 0;
  margin-right: 0;
}

::v-deep .el-progress-bar__outer,
::v-deep .el-progress-bar__inner {
  border-radius: 0;
}

::v-deep .el-progress-bar__inner {
  /* background: linear-gradient(to bottom left, rgb(102, 123, 171), rgb(60, 80, 131)); */
  background: linear-gradient(to right, #728ab4, #53629c);
}

::v-deep .el-progress__text {
  display: none;
}
::v-deep .el-table td,
::v-deep .el-table th {
  border-width: 0;
  background-color: rgb(18, 29, 67) !important;
}

::v-deep .el-table::before {
  height: 0px;
}
::v-deep .el-table__row > td {
  border: none;
}
::v-deep .el-table th>.cell {
  color: #babcc3;
}

::v-deep .el-table .cell {
  color: white;
  font-size: 11px;
}
::v-deep .el-table__row {
  height: 30px;
}
</style>
