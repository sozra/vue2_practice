<!-- src/components/common/FormDialog.vue - 通用表单弹窗组件 -->
<template>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :width="width"
      :close-on-click-modal="false"
      @closed="$emit('closed')"
    >
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        :label-width="formLabelWidth"
        v-loading="loading"
      >
        <slot name="form-items" :form-data="formData"></slot>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <slot name="footer">
          <el-button @click="$emit('cancel')">取 消</el-button>
          <el-button type="primary" @click="$emit('submit')" :loading="loading">
            确 定
          </el-button>
        </slot>
      </div>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: 'FormDialog',
    props: {
      title: {
        type: String,
        default: '表单'
      },
      visible: {
        type: Boolean,
        required: true
      },
      formData: {
        type: Object,
        required: true
      },
      rules: {
        type: Object,
        default: () => ({})
      },
      loading: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '50%'
      },
      formLabelWidth: {
        type: String,
        default: '120px'
      }
    }
  }
  </script>