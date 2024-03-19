<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        label="a"
        prop="a"
      ></el-table-column>
      <el-table-column
        label="json"
      >
      <template scope="scope">
        <el-button @click="showJson(scope.row.json)">json</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-dialog title="json" :visible.sync="dialogVisible">
      <div style="white-space: break-spaces;">{{dialogData}}</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "element2",
  data() {
    return {
      tableData: [
        {
            "a":123,
            "json":{a:1,b:2}
        },
        {
            "a":456,
            "json":{a:3,b:4}
        }
      ],
      column: [],
      dialogVisible: false,
      dialogData: "",
    };
  },
  mounted() {
  },
  methods: {
    showJson(data) {
        this.dialogData = JSON.stringify((data), null, 2);
        this.dialogVisible = true;
    },
  },
};
</script>
