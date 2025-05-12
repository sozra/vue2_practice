<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
      <!-- 其他表单项 -->
      
      <el-form-item label="Cron表达式" prop="cronExpression">
        <el-input v-model="formData.cronExpression" placeholder="请输入Cron表达式">
          <el-button slot="append" @click="openCronDialog">生成</el-button>
        </el-input>
      </el-form-item>
      
      <!-- 其他表单项 -->
    </el-form>
    
    <!-- Cron表达式生成器组件 -->
    <cron-expression-generator
      v-model="formData.cronExpression"
      :visible.sync="cronDialogVisible"
      @close="cronDialogVisible = false"
    />
  </div>
</template>

<script>
import CronExpressionGenerator from './CronExpressionGenerator.vue'

export default {
  components: {
    CronExpressionGenerator
  },
  data() {
    return {
      formData: {
        cronExpression: '* * * * * ? *',
        // 其他表单数据
      },
      rules: {
        cronExpression: [
          { required: true, message: '请输入Cron表达式', trigger: 'blur' }
        ],
        // 其他表单验证规则
      },
      cronDialogVisible: false
    }
  },
  methods: {
    openCronDialog() {
      this.cronDialogVisible = true
    }
  }
}
</script>