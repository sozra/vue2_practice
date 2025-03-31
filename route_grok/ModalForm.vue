<template>
    <el-dialog :visible.sync="visible" :title="type === 'add' ? '新增工艺路线' : '编辑工艺路线'">
      <el-form :model="form" label-width="120px">
        <el-form-item label="项目名称">
          <el-input v-model="form.projectName"></el-input>
        </el-form-item>
        <el-form-item label="产品">
          <el-input v-model="form.product"></el-input>
        </el-form-item>
        <!-- 根据实际需求动态添加更多字段 -->
      </el-form>
      <div slot="footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </template>
  
  <script>
  export default {
    props: {
      visible: Boolean,
      formData: Object,
      type: String, // 'add' 或 'edit'
    },
    data() {
      return {
        form: { ...this.formData },
      };
    },
    watch: {
      formData(newVal) {
        this.form = { ...newVal };
      },
    },
    methods: {
      submit() {
        this.$emit('submit', this.form);
      },
    },
  };
  </script>