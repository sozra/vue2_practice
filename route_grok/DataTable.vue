<template>
    <el-table :data="data" border>
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="product" label="产品（定制料号）"></el-table-column>
      <el-table-column prop="section" label="工段"></el-table-column>
      <el-table-column prop="routeName" label="工艺路线名称"></el-table-column>
      <el-table-column prop="prevRoute" label="上一工艺路线"></el-table-column>
      <el-table-column prop="line" label="线体"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="modifier" label="修改人"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button size="small" @click="viewStation(scope.row)">查看工站</el-button>
          <!-- 其他操作如删除、取消、完成设计可类似添加 -->
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      edit(row) {
        this.$emit('edit', row);
      },
      viewStation(row) {
        this.$emit('viewStation', row);
      },
    },
  };
  </script>