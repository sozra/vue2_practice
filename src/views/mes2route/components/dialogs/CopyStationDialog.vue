<template>
  <el-dialog
    title="复制工站"
    :visible.sync="visible"
    width="500px"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <el-form :model="formData" :rules="rules" ref="form" label-width="120px" size="small">
      <el-form-item label="项目" prop="projectName">
        <el-select v-model="formData.projectName" placeholder="请选择项目" style="width: 100%;" @change="handleProjectChange">
          <el-option
            v-for="item in projectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="产品（定制料号）" prop="productCode">
        <el-select v-model="formData.productCode" placeholder="请选择产品料号" style="width: 100%;" @change="handleProductChange">
          <el-option
            v-for="item in productOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="旧工艺路线" prop="oldRouteName">
        <el-select v-model="formData.oldRouteName" placeholder="请选择旧工艺路线" style="width: 100%;">
          <el-option
            v-for="item in oldRouteOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="新工艺路线" prop="newRouteName">
        <el-input v-model="formData.newRouteName" placeholder="新工艺路线" disabled></el-input>
      </el-form-item>
    </el-form>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CopyStationDialog',
  
  props: {
    // 对话框是否可见
    visible: {
      type: Boolean,
      default: false
    },
    
    // 是否正在加载
    loading: {
      type: Boolean,
      default: false
    },
    
    // 当前工艺路线
    currentRoute: {
      type: Object,
      default: () => ({})
    }
  },
  
  data() {
    return {
      // 表单数据
      formData: {
        projectName: '',
        productCode: '',
        oldRouteName: '',
        newRouteName: ''
      },
      
      // 校验规则
      rules: {
        projectName: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        productCode: [
          { required: true, message: '请选择产品料号', trigger: 'change' }
        ],
        oldRouteName: [
          { required: true, message: '请选择旧工艺路线', trigger: 'change' }
        ]
      },
      
      // 项目选项
      projectOptions: [
        { value: '手机后盖生产', label: '手机后盖生产' },
        { value: '电池组装', label: '电池组装' },
        { value: '屏幕组装', label: '屏幕组装' },
        { value: '主板焊接', label: '主板焊接' },
        { value: '摄像头组装', label: '摄像头组装' }
      ],
      
      // 产品选项 (根据项目动态变化)
      productOptions: [],
      
      // 旧工艺路线选项 (根据项目和产品动态变化)
      oldRouteOptions: []
    };
  },
  
  watch: {
    // 监听对话框显示状态
    visible(val) {
      if (val && Object.keys(this.currentRoute).length > 0) {
        // 打开对话框并且有当前工艺路线数据时，初始化表单
        this.initForm();
      }
      
      if (!val) {
        // 关闭对话框时重置表单
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.resetFields();
        });
      }
    },
    
    // 监听当前工艺路线变化
    currentRoute: {
      handler(val) {
        if (this.visible && Object.keys(val).length > 0) {
          this.initForm();
        }
      },
      deep: true
    }
  },
  
  methods: {
    // 初始化表单
    initForm() {
      this.formData.newRouteName = this.currentRoute.routeName || '';
    },
    
    // 项目变更
    handleProjectChange(val) {
      // 模拟根据项目获取产品选项
      if (val === '手机后盖生产') {
        this.productOptions = [
          { value: 'P20220001', label: 'P20220001' },
          { value: 'P20220006', label: 'P20220006' }
        ];
      } else if (val === '电池组装') {
        this.productOptions = [
          { value: 'P20220002', label: 'P20220002' },
          { value: 'P20220007', label: 'P20220007' }
        ];
      } else {
        this.productOptions = [
          { value: 'P20220003', label: 'P20220003' }
        ];
      }
      
      this.formData.productCode = '';
      this.formData.oldRouteName = '';
      this.oldRouteOptions = [];
    },
    
    // 产品变更
    handleProductChange(val) {
      // 模拟根据项目和产品获取旧工艺路线选项
      if (this.formData.projectName === '手机后盖生产' && val === 'P20220001') {
        this.oldRouteOptions = [
          { value: '后盖组装标准流程', label: '后盖组装标准流程' },
          { value: '后盖组装预处理', label: '后盖组装预处理' }
        ];
      } else if (this.formData.projectName === '电池组装' && val === 'P20220002') {
        this.oldRouteOptions = [
          { value: '电池组装标准流程', label: '电池组装标准流程' }
        ];
      } else {
        this.oldRouteOptions = [
          { value: '屏幕组装标准流程', label: '屏幕组装标准流程' },
          { value: '屏幕预处理', label: '屏幕预处理' }
        ];
      }
      
      this.formData.oldRouteName = '';
    },
    
    // 关闭对话框
    handleClose() {
      this.$emit('update:visible', false);
    },
    
    // 提交表单
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 提交数据
          const data = {...this.formData};
          this.$emit('submit', data);
        } else {
          return false;
        }
      });
    }
  }
};
</script>