<template>
  <div id="editableTable" class="editableTable">
    <el-table :data="tableData" stripe border >
      <el-table-column label="id">
        <template slot-scope="scope">
          <el-input v-model="scope.row.id" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="name" >
        <template slot-scope="scope">
          <el-select v-model="scope.row.name" size="mini" placeholder="请选择">
            <el-option
              v-for="item in nameOptions[scope.$index]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
        <el-table-column label="isSelected" >
            <template slot-scope="scope">
            <el-select v-model="scope.row.isSelected" size="mini" placeholder="请选择">
                <el-option
                v-for="item in isSelected"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>
            </el-select>
            </template>
        </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- display tableData -->
    <div style="background-color: white;">{{queryData}}</div>
    <div style="white-space: break-spaces; margin-left:100px; margin-top:50px; background-color: white;">{{showData}}</div>

  </div>
</template>

<script>
export default {
  name: "editableTable",
  data() {
    return {
      queryData: {},
      tableData: [
        {
          id: 1,
          name: "naruto",
          isSelected: true,
        },
        {
          id: 2,
          name: "sasuke",
          isSelected: false,
        },
        {
          id: 3,
          name: "sakura",
          isSelected: true,
        },
      ],
      nameOptions: [
        [
          {
            value: "kakashi",
            label: "kakashi",
          },
          {
            value: "guy",
            label: "guy",
          },
          {
            value: "jiraiya",
            label: "jiraiya",
          },
        ],
        [
          {
            value: "itachi",
            label: "itachi",
          },
          {
            value: "madara",
            label: "madara",
          },
          {
            value: "obito",
            label: "obito",
          },
        ],
        [
          {
            value: "hashirama",
            label: "hashirama",
          },
          {
            value: "tobirama",
            label: "tobirama",
          },
          {
            value: "hiruzen",
            label: "hiruzen",
          },
        ],
      ],
      isSelected:[
        {
            value: true,
            label: "true",
        },
        {
            value: false,
            label: "false",
        },
      ]
    };
  },
  computed: {
    showData() {
      return JSON.stringify(this.tableData, null, 4);
    },
  },
  mounted() {
    window.kk = this;
    // this.initTable();
    this.queryData = this.$route.query;
  },
  methods: {},
};
</script>

<style scoped>
.editableTable  {
  background-color: aliceblue;
  background: white;
  /* color: white; */
}
</style>