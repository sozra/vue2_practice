<template>
    <div class="main-page">
      <div class="top-buttons">
        <el-button type="primary" @click="openNewRouteModal">新工艺路线</el-button>
        <el-button @click="validateRoute">工艺路线校验</el-button>
      </div>
      <FormQuery @search="handleSearch" @reset="handleReset" />
      <DataTable :data="tableData" @edit="openEditModal" @viewStation="goToStationPage" />
      <ModalForm
        v-if="modalVisible"
        :visible.sync="modalVisible"
        :formData="formData"
        :type="modalType"
        @submit="handleSubmit"
      />
    </div>
  </template>
  
  <script>
  import FormQuery from '@/components/FormQuery.vue';
  import DataTable from '@/components/DataTable.vue';
  import ModalForm from '@/components/ModalForm.vue';
  import { getTableData, addRoute, updateRoute, validateRoute } from '@/api';
  
  export default {
    components: {
      FormQuery,
      DataTable,
      ModalForm,
    },
    data() {
      return {
        tableData: [],
        modalVisible: false,
        formData: {},
        modalType: '', // 'add' 或 'edit'
      };
    },
    methods: {
      // 查询数据
      handleSearch(query) {
        getTableData(query).then((res) => {
          this.tableData = res.data;
        });
      },
      // 重置表单
      handleReset() {
        this.handleSearch({});
      },
      // 打开新增弹窗
      openNewRouteModal() {
        this.modalType = 'add';
        this.formData = {};
        this.modalVisible = true;
      },
      // 打开编辑弹窗
      openEditModal(row) {
        this.modalType = 'edit';
        this.formData = { ...row };
        this.modalVisible = true;
      },
      // 提交表单
      handleSubmit(form) {
        const api = this.modalType === 'add' ? addRoute : updateRoute;
        api(form).then(() => {
          this.modalVisible = false;
          this.handleSearch({});
        });
      },
      // 工艺路线校验
      validateRoute() {
        validateRoute().then((res) => {
          this.$message.success(res.message || '校验成功');
        });
      },
      // 跳转到工站页面
      goToStationPage(row) {
        this.$router.push({ name: 'StationPage', params: { id: row.id } });
      },
    },
  };
  </script>
  
  <style scoped>
  .top-buttons {
    margin-bottom: 20px;
  }
  </style>