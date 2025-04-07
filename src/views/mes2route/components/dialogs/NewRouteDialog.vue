<template>
  <el-dialog
    title="新增工艺路线"
    :visible.sync="visible"
    width="600px"
    :close-on-click-modal="false"
    :before-close="handleClose">
    <el-form :model="formData" :rules="rules" ref="form" label-width="120px" size="small">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      
      <el-form-item label="产品（定制料号）" prop="productCode">
        <el-input v-model="formData.productCode" placeholder="请输入产品料号"></el-input>
      </el-form-item>
      
      <el-form-item label="工段" prop="section">
        <el-select v-model="formData.section" placeholder="请选择工段" style="width: 100%;">
          <el-option
            v-for="item in sectionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="工艺路线名称" prop="routeName">
        <el-input v-model="formData.routeName" placeholder="请输入工艺路线名称"></el-input>
      </el-form-item>
      
      <el-form-item label="上一工艺路线" prop="prevRouteName">
        <el-input v-model="formData.prevRouteName" placeholder="请输入上一工艺路线"></el-input>
      </el-form-item>
      
      <el-form-item label="线体" prop="productLine">
        <el-select v-model="formData.productLine" placeholder="请选择线体" style="width: 100%;">
          <el-option
            v-for="item in productLineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择类型" style="width: 100%;">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
  name: 'NewRouteDialog',
  
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
    }
  },
  
  data() {
    return {
      // 表单数据
      formData: {
        projectName: '',
        productCode: '',
        section: '',
        routeName: '',
        prevRouteName: '',
        productLine: '',
        type: '标准'
      },
      
      // 校验规则
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        productCode: [
          { required: true, message: '请输入产品料号', trigger: 'blur' }
        ],
        section: [
          { required: true, message: '请选择工段', trigger: 'change' }
        ],
        routeName: [
          { required: true, message: '请输入工艺路线名称', trigger: 'blur' }
        ],
        productLine: [
          { required: true, message: '请选择线体', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ]
      },
      
      // 工段选项
      sectionOptions: [
        { value: '组装', label: '组装' },
        { value: '焊接', label: '焊接' },
        { value: '电池', label: '电池' },
        { value: '包装', label: '包装' }
      ],
      
      // 线体选项
      productLineOptions: [
        { value: 'A线体', label: 'A线体' },
        { value: 'B线体', label: 'B线体' },
        { value: 'C线体', label: 'C线体' },
        { value: 'D线体', label: 'D线体' }
      ],
      
      // 类型选项
      typeOptions: [
        { value: '标准', label: '标准' },
        { value: '定制', label: '定制' }
      ]
    };
  },
  
  watch: {
    // 监听对话框显示状态
    visible(val) {
      if (!val) {
        // 关闭对话框时重置表单
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.resetFields();
        });
      }
    }
  },
  
  methods: {
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
    },
    
    // 重置表单
    resetForm() {
      this.formData = {
        projectName: '',
        productCode: '',
        section: '',
        routeName: '',
        prevRouteName: '',
        productLine: '',
        type: '标准'
      };
      this.$refs.form && this.$refs.form.resetFields();
    }
  }
};
</script> 