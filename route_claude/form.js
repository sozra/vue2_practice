// src/mixins/dialog-form.js - 表单弹窗的通用功能混入
export default {
    data() {
      return {
        visible: false,
        formLoading: false,
        formData: {},
        formRules: {},
        initialFormData: {}
      }
    },
    methods: {
      open(data = {}) {
        this.initialFormData = JSON.parse(JSON.stringify(data))
        this.formData = JSON.parse(JSON.stringify(data))
        this.visible = true
        
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        })
      },
      close() {
        this.visible = false
        this.formData = {}
        if (this.$refs.form) {
          this.$refs.form.resetFields()
        }
      },
      resetForm() {
        this.formData = JSON.parse(JSON.stringify(this.initialFormData))
        if (this.$refs.form) {
          this.$refs.form.resetFields()
        }
      },
      handleSubmit() {
        if (!this.$refs.form) return
        
        this.$refs.form.validate(valid => {
          if (!valid) return
          
          this.formLoading = true
          this.submitForm()
            .then(() => {
              this.close()
            })
            .finally(() => {
              this.formLoading = false
            })
        })
      },
      submitForm() {
        // 由子组件实现具体提交逻辑
        return Promise.resolve()
      }
    }
  }