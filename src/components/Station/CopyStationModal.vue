<template>
    <el-dialog
      title="复制工站"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="500px"
      @close="handleClose"
    >
      <el-form
        ref="copyForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        v-loading="loading || optionsLoading"
      >
        <el-form-item label="项目" prop="projectId">
           <el-select v-model="form.projectId" placeholder="请选择项目" style="width: 100%;" filterable @change="handleProjectChange">
             <el-option
               v-for="item in options.projects"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
        </el-form-item>
         <el-form-item label="产品(定制料号)" prop="productCode">
           <el-select v-model="form.productCode" placeholder="请选择产品" style="width: 100%;" filterable @change="handleProductChange">
              <el-option
               v-for="item in options.products"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
        </el-form-item>
         <el-form-item label="旧工艺路线" prop="oldRouteId">
           <el-select v-model="form.oldRouteId" placeholder="请选择旧工艺路线" style="width: 100%;" filterable>
              <el-option
               v-for="item in options.routes"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
           </el-select>
        </el-form-item>
        <el-form-item label="新工艺路线" prop="newRouteName">
          <el-input v-model="newRouteNameDisplay" placeholder="当前工艺路线" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </template>
  
  <script>
  import * as api from '@/api';
  
  export default {
    name: 'CopyStationModal',
    props: {
      visible: { type: Boolean, default: false },
      // 将当前工艺路线信息传入
      currentRoute: { type: Object, required: true }
    },
    data() {
      return {
        loading: false,
        optionsLoading: false,
        form: {
          projectId: null,
          productCode: null,
          oldRouteId: null,
          newRouteId: null, // 提交时使用
        },
        options: {
          projects: [],
          products: [],
          routes: [],
        },
        rules: {
          projectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
          productCode: [{ required: true, message: '请选择产品', trigger: 'change' }],
          oldRouteId: [{ required: true, message: '请选择旧工艺路线', trigger: 'change' }],
        },
      };
    },
    computed: {
      dialogVisible: {
        get() { return this.visible; },
        set(val) { this.$emit('update:visible', val); }
      },
      newRouteNameDisplay() {
        return this.currentRoute ? this.currentRoute.routeName : '';
      }
    },
    watch: {
      visible(newVal) {
        if (newVal) {
          this.resetForm();
          this.loadOptions();
          // 设置新工艺路线ID
          this.form.newRouteId = this.currentRoute ? this.currentRoute.id : null;
        }
      }
    },
    methods: {
      resetForm() {
        if (this.$refs.copyForm) {
          this.$refs.copyForm.resetFields();
        }
        this.form = { projectId: null, productCode: null, oldRouteId: null, newRouteId: null };
      },
      loadOptions() {
          this.optionsLoading = true;
          api.getCopySourceOptions()
              .then(res => {
                  this.options = res.data; // 假设返回 { projects: [], products: [], routes: [] }
              })
              .catch(err => {
                  console.error("Failed to load copy options:", err);
                  this.$message.error('加载复制选项失败');
              })
              .finally(() => {
                  this.optionsLoading = false;
              });
      },
      // 可选: 如果选项之间有关联，可以添加 change 事件处理
      handleProjectChange(value) {
        console.log('Project changed:', value);
        // 可能需要根据项目重新加载产品或工艺路线选项
      },
      handleProductChange(value) {
          console.log('Product changed:', value);
          // 可能需要根据产品重新加载工艺路线选项
      },
      handleClose() {
        this.resetForm();
        this.dialogVisible = false;
      },
      handleSubmit() {
        this.$refs.copyForm.validate((valid) => {
          if (valid) {
            if (!this.form.newRouteId) {
                this.$message.warning('无法获取当前工艺路线信息');
                return;
            }
            this.loading = true;
            api.copyStations(this.form)
              .then((res) => {
                this.$message.success(`成功复制 ${res.data.copiedCount || '若干'} 个工站`);
                this.$emit('submit-success'); // 通知父组件操作成功
                this.handleClose();
              })
              .catch(err => console.error('Copy failed:', err))
              .finally(() => { this.loading = false; });
          }
        });
      }
    }
  };
  </script>