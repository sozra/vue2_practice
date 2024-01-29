<template>
    <div id="tableCellMerge">
<el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="bpn"
        label="bpn"
        width="180">
      </el-table-column>
      <el-table-column
        prop="project"
        label="project"
        width="180">
      </el-table-column>
      <el-table-column
        prop="stock"
        label="stock"
        width="180">
      </el-table-column>
    </el-table>

    </div>
</template>

<script>
import  response from "./tableCellMergeData.json";
// import totalData from "./getProjectTaskBoard.json";
export default {
    name: 'tableCellMerge',
    data() {
        return {
            tableData: response.DATA,
            // tableData: response.DATA.toSorted((a, b) => a.bpn - b.bpn),
        }
    },
    mounted() {
        window.kk = this;
        console.log(this.tableData);
    },
    methods: {
        /**
         * Determines the span method for merging cells in a table.
         * @param {Object} row - The current row object.
         * @param {Object} column - The current column object.
         * @param {number} rowIndex - The index of the current row.
         * @param {number} columnIndex - The index of the current column.
         * @returns {Object} - An object specifying the rowspan and colspan for the cell.
         */
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                // Determine the colspan for the cell.
                // 如果当前行的 bpn 与上一行的 bpn 相同，则不需要渲染当前单元格。
                if (rowIndex > 0 && row.bpn === this.tableData[rowIndex - 1].bpn) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
                else {
                    // Determine the rowspan for the cell.
                    // 从当前行开始，向下遍历，直到遇到不同的 bpn，或者到达表格底部。
                    let rowspan = 1;
                    for (let i = rowIndex + 1; i < this.tableData.length; i++) {
                        if (row.bpn === this.tableData[i].bpn) {
                            rowspan++;
                        }
                        else {
                            break;
                        }
                    }
                    return {
                        rowspan: rowspan,
                        colspan: 1
                    };
                }
            }
            else {
                // 如果不是第一列，则不需要渲染当前单元格。
                return {
                    rowspan: 1,
                    colspan: 1
                };
            }
        }
    },
}
</script>