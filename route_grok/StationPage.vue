<template>
    <div class="station-page">
      <div class="top-buttons">
        <el-button @click="goBack">返回工艺路线</el-button>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="openCopyModal">复制工站</el-button>
        <!-- 其他按钮如模块导入、新工站等可类似添加 -->
      </div>
      <el-table :data="stationData" border>
        <el-table-column prop="stationId" label="工站ID">
          <template slot-scope="scope">
            <el-select v-model="scope.row.stationId">
              <el-option v-for="item in stationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="stationName" label="工站名称">
          <template slot-scope="scope">
            <el-select v-model="scope.row.stationName">
              <el-option v-for="item in stationNameOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <!-- 其他下拉框列类似 -->
        <el-table-column prop="sortOrder" label="排序号">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.sortOrder" :min="1"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="small" @click="editStation(scope.row)">修改</el-button>
            <el-button size="small" @click="deleteStation(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <ModalForm
        v-if="copyModalVisible"
        :visible.sync="copyModalVisible"
        :formData="copyFormData"
        :type="'copy'"
        @submit="handleCopySubmit"
      />
    </div>
  </template>
  
  <script>
  import ModalForm from '@/components/ModalForm.vue';
  import { getStationData, saveStationData, copyStation } from '@/api';
  
  export default {
    components: {
      ModalForm,
    },
    data() {
      return {
        stationData: [],
        copyModalVisible: false,
        copyFormData: {},
        stationOptions: [{ value: '1', label: '工站1' }], // 示例数据
        stationNameOptions: [{ value: 'A', label: '工站A' }], // 示例数据
      };
    },
    created() {
      const id = this.$route.params.id;
      getStationData(id).then((res) => {
        this.stationData = res.data;
      });
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      save() {
        saveStationData(this.stationData).then(() => {
          this.$message.success('保存成功');
        });
      },
      editStation(row) {
        // 修改逻辑（可直接在表格编辑，或弹出弹窗）
      },
      deleteStation(row) {
        // 删除逻辑
        this.stationData = this.stationData.filter((item) => item.stationId !== row.stationId);
      },
      openCopyModal() {
        this.copyFormData = {
          project: '',
          product: '',
          oldRoute: '',
          newRoute: '自动生成', // 只读
        };
        this.copyModalVisible = true;
      },
      handleCopySubmit(form) {
        copyStation(form).then(() => {
          this.copyModalVisible = false;
          this.$message.success('复制成功');
        });
      },
    },
  };
  </script>