<!-- src/components/common/SearchForm.vue - 搜索表单组件 -->
<template>
    <el-form
      ref="form"
      :model="formModel"
      :inline="inline"
      :label-width="labelWidth"
      class="search-form"
    >
      <slot :form-data="formModel"></slot>
      
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
          :loading="loading"
        >
          {{ searchButtonText }}
        </el-button>
        <el-button @click="handleReset">{{ resetButtonText }}</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    name: 'SearchForm',
    props: {
      formData: {
        type: Object,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      inline: {
        type: Boolean,
        default: true
      },
      labelWidth: {
        type: String,
        default: '100px'
      },
      searchButtonText: {
        type: String,
        default: '搜索'
      },
      resetButtonText: {
        type: String,
        default: '重置'
      }
    },
    data() {
      return {
        formModel: { ...this.formData }
      }
    },
    watch: {
      formData: {
        handler(val) {
          this.formModel = { ...val }
        },
        deep: true
      }
    },
    methods: {
      handleSearch() {
        this.$emit('search', { ...this.formModel })
      },
      handleReset() {
        this.$refs.form.resetFields()
        this.$emit('reset')
      }
    }
  }
  </script>
  
  <style scoped>
  .search-form {
    margin-bottom: 20px;
  }
  </style>