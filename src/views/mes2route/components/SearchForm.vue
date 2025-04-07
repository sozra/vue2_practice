<template>
  <div class="search-form">
    <el-form :model="formData" :inline="true" size="small" @submit.native.prevent>
      <el-form-item label="项目名称">
        <el-input v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      
      <el-form-item label="产品（定制料号）">
        <el-input v-model="formData.productCode" placeholder="请输入产品料号"></el-input>
      </el-form-item>
      
      <el-form-item label="工段">
        <el-select v-model="formData.section" placeholder="请选择工段" clearable>
          <el-option
            v-for="item in sectionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="工艺路线名称">
        <el-input v-model="formData.routeName" placeholder="请输入工艺路线名称"></el-input>
      </el-form-item>
      
      <el-form-item label="上一工艺路线">
        <el-input v-model="formData.prevRouteName" placeholder="请输入上一工艺路线"></el-input>
      </el-form-item>
      
      <el-form-item label="线体">
        <el-select v-model="formData.productLine" placeholder="请选择线体" clearable>
          <el-option
            v-for="item in productLineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="类型">
        <el-select v-model="formData.type" placeholder="请选择类型" clearable>
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="状态">
        <el-select v-model="formData.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  
  props: {
    // 默认查询条件
    defaultFormData: {
      type: Object,
      default: () => ({})
    }
  },
  
  data() {
    return {
      formData: {
        projectName: '',
        productCode: '',
        section: '',
        routeName: '',
        prevRouteName: '',
        productLine: '',
        type: '',
        status: ''
      },
      
      // 下拉选项
      sectionOptions: [
        { value: '组装', label: '组装' },
        { value: '焊接', label: '焊接' },
        { value: '电池', label: '电池' },
        { value: '包装', label: '包装' }
      ],
      
      productLineOptions: [
        { value: 'A线体', label: 'A线体' },
        { value: 'B线体', label: 'B线体' },
        { value: 'C线体', label: 'C线体' },
        { value: 'D线体', label: 'D线体' }
      ],
      
      typeOptions: [
        { value: '标准', label: '标准' },
        { value: '定制', label: '定制' }
      ],
      
      statusOptions: [
        { value: '设计中', label: '设计中' },
        { value: '审核中', label: '审核中' },
        { value: '已完成', label: '已完成' }
      ]
    };
  },
  
  created() {
    // 合并默认查询条件
    this.formData = {
      ...this.formData,
      ...this.defaultFormData
    };
  },
  
  methods: {
    // 查询
    handleSearch() {
      this.$emit('search', this.formData);
    },
    
    // 重置
    handleReset() {
      this.formData = {
        projectName: '',
        productCode: '',
        section: '',
        routeName: '',
        prevRouteName: '',
        productLine: '',
        type: '',
        status: ''
      };
      this.$emit('reset');
    },
    
    // 获取表单数据
    getFormData() {
      return { ...this.formData };
    }
  }
};
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}
</style> 