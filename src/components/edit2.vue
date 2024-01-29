<template>
  <div class="editorTable">
    <el-button @click="addRow">添加</el-button>
    <el-form :model="form">
      <el-table :data="form.tableData" border>
        <el-table-column align="center">
          <template v-slot:header> <i style="color: red">*</i>账号 </template>
          <template v-slot="scoped">
            <el-form-item
              :prop="`tableData.${scoped.$index}.acount`"
              :rules="required"
            >
              <el-input v-model="scoped.row.acount"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div style="white-space: break-spaces;">{{showData}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      required: {
        required: true,
        message: "请输入该必填项",
        trigger: ["change", "blur"],
      },
      form: {
        tableData: [],
      },
    };
  },
    computed: {
        showData() {
        return JSON.stringify(this.form.tableData, null, 4);
        },
    },
  methods: {
    addRow() {
      class TableRow {
        // acount = null;
        acount = Math.floor(Math.random() * 100);
      }
      this.form.tableData.push(new TableRow());
    },
  },
};
</script>

<style scoped>
.editorTable ::v-deep .el-table__row > td {
  padding: 5px;
}
.editorTable ::v-deep .cell {
  padding: 0 !important;
}
.editorTable .el-form-item {
  margin-bottom: 0px;
}
.editorTable ::v-deep .el-form-item__error {
  top: calc(50% - 10px);
  left: 16px;
}
.editorTable ::v-deep .el-form-item__content {
  margin: 0 !important;
}
</style>