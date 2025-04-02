<template>
    <el-dialog
      :title="isEdit ? '编辑工艺路线' : '新增工艺路线'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="600px"
      @close="handleClose"
    >
      <el-form
        ref="routeForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        v-loading="loading"
      >
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="产品(定制料号)" prop="productCode">
          <el-input v-model="form.productCode" placeholder="请输入产品料号"></el-input>
        </el-form-item>
        <el-form-item label="工段" prop="section">
          <el-input v-model="form.section" placeholder="请输入工段"></el-input>
        </el-form-item>
         <el-form-item label="工艺路线名称" prop="routeName">
          <el-input v-model="form.routeName" placeholder="请输入工艺路线名称"></el-input>
        </el-form-item>
        <el-form-item label="上一工艺路线" prop="prevRouteName">
          <el-input v-model="form.prevRouteName" placeholder="请输入上一工艺路线"></el-input>
        </el-form-item>
         <el-form-item label="线体" prop="line">
          <el-input v-model="form.line" placeholder="请输入线体"></el-input>
        </el-form-item>
         <el-form-item label="类型" prop="type">
           <el-select v-model="form.type" placeholder="请选择类型" style="width: 100%;">
             <el-option label="主路线" value="主路线"></el-option>
             <el-option label="子路线" value="子路线"></el-option>
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
  import * as api from '@/api'; // 引入所有 API
  
  export default {
    name: 'RouteFormModal',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      // 使用 initialData 而不是直接绑定外部对象, 避免双向绑定问题
      initialData: {
        type: Object,
        default: () => ({}),
      },
      isEdit: {
          type: Boolean,
          default: false
      }
    },
    data() {
      return {
        loading: false,
        form: {
          // 初始化表单结构
          id: null,
          projectName: '',
          productCode: '',
          section: '',
          routeName: '',
          prevRouteName: '',
          line: '',
          type: '',
          // ... 其他字段
        },
        rules: {
          // 定义校验规则
          projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
          ],
          productCode: [
            { required: true, message: '请输入产品料号', trigger: 'blur' },
          ],
           routeName: [
            { required: true, message: '请输入工艺路线名称', trigger: 'blur' },
          ],
          type: [
              { required: true, message: '请选择类型', trigger: 'change' },
          ]
          // ... 其他规则
        },
      };
    },
    computed: {
      // 使用 computed 属性同步 prop 和内部状态
      dialogVisible: {
        get() {
          return this.visible;
        },
        set(val) {
          // 只触发事件, 不直接修改 prop
          this.$emit('update:visible', val);
        },
      },
    },
    watch: {
      // 监听 visible 变化, 在弹窗打开时处理数据
      visible(newVal) {
        if (newVal) {
          this.resetForm(); // 先重置表单和校验
          if (this.isEdit && this.initialData && this.initialData.id) {
              // 编辑模式: 深拷贝传入的数据到 form
              this.form = JSON.parse(JSON.stringify(this.initialData));
          } else {
              // 新增模式: 确保 form 是初始状态
              this.form = {
                  id: null,
                  projectName: '',
                  productCode: '',
                  section: '',
                  routeName: '',
                  prevRouteName: '',
                  line: '',
                  type: '',
              };
          }
        }
      },
    },
    methods: {
      resetForm() {
          // 重置表单数据和校验状态
          if (this.$refs.routeForm) {
               this.$refs.routeForm.resetFields();
          }
          // 对于非el-form-item管理的字段，手动重置
           this.form = {
              id: null,
              projectName: '',
              productCode: '',
              section: '',
              routeName: '',
              prevRouteName: '',
              line: '',
              type: '',
           };
      },
      handleClose() {
        // 关闭弹窗时重置表单是个好习惯
        this.resetForm();
        this.dialogVisible = false; // 触发 update:visible
      },
      handleSubmit() {
        this.$refs.routeForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            const apiCall = this.isEdit
              ? api.updateRoute(this.form.id, this.form)
              : api.createRoute(this.form);
  
            apiCall
              .then((res) => {
                this.$message.success(this.isEdit ? '更新成功' : '新增成功');
                // 触发成功事件，并传递回数据（可选）
                this.$emit('submit-success', res.data);
                this.handleClose();
              })
              .catch((err) => {
                // API 封装中已处理通用错误提示，这里可以不加，或加特定提示
                console.error('Submit failed:', err);
                 // this.$message.error('操作失败'); // 可选
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            console.log('Form validation failed');
            return false;
          }
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* 可选的样式 */
  .dialog-footer {
    text-align: right;
  }
  </style>