<template>
    <el-form :model="query" label-width="100px" inline>
      <el-form-item label="项目名称">
        <el-input v-model="query.projectName"></el-input>
      </el-form-item>
      <el-form-item label="产品">
        <el-input v-model="query.product"></el-input>
      </el-form-item>
      <!-- 其他输入框根据需求添加 -->
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        query: {
          projectName: '',
          product: '',
        },
      };
    },
    methods: {
      search() {
        this.$emit('search', { ...this.query });
      },
      reset() {
        this.query = { projectName: '', product: '' };
        this.$emit('reset');
      },
    },
  };
  </script>