<!-- src/views/process-route/components/EditRouteDialog.vue - 编辑工艺路线弹窗 -->
<template>
    <form-dialog
      title="编辑工艺路线"
      :visible.sync="visible"
      :form-data="formData"
      :rules="formRules"
      :loading="formLoading"
      @submit="handleSubmit"
      @cancel="close"
      @closed="close"
    >
      <template #form-items="{ formData }">
        <el-form-item label="项目名称" prop="projectName">
          <el-select
            v-model="formData.projectName"
            placeholder="请选择项目名称"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="产品(定制料号)" prop="productCode">
          <el-select
            v-model="formData.productCode"
            placeholder="请选择产品(定制料号)"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in productOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="工段" prop="section">
          <el-select
            v-model="formData.section"
            placeholder="请选择工段"
            style="width: 100%"
          >
            <el-option
              v-for="item in sectionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="工艺路线名称" prop="routeName">
          <el-input v-model="formData.routeName" placeholder="请输入工艺路线名称"></el-input>
        </el-form-item>
        
        <el-form-item label="上一工艺路线" prop="prevRoute">
          <el-select
            v-model="formData.prevRoute"
            placeholder="请选择上一工艺路线"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in routeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="线体" prop="line">
          <el-select
            v-model="formData.line"
            placeholder="请选择线体"
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in lineOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="formData.type"
            placeholder="请选择类型"
            style="width: 100%"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </template>
    </form-dialog>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import FormDialog from '@/components/common/FormDialog.vue'
  import dialogFormMixin from '@/mixins/dialog-form'
  
  export default {
    name: 'EditRouteDialog',
    components: {
      FormDialog
    },
    mixins: [dialogFormMixin],
    data() {
      return {
        formRules: {
          projectName: [
            { required: true, message: '请选择项目名称', trigger: 'change' }
          ],
          productCode: [
            { required: true, message: '请选择产品(定制料号)', trigger: 'change' }
          ],
          section: [
            { required: true, message: '请选择工段', trigger: 'change' }
          ],
          routeName: [
            { required: true, message: '请输入工艺路线名称', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ]
        },
        projectOptions: [],
        productOptions: [],
        sectionOptions: [],
        routeOptions: [],
        lineOptions: [],
        typeOptions: [
          { value: 'normal', label: '普通' },
          { value: 'special', label: '特殊' }
        ]
      }
    },
    created() {
      // 这里应该调用API获取各种下拉选项数据
      this.fetchOptions()
    },
    methods: {
      ...mapActions('processRoute', ['updateRoute']),
      
      fetchOptions() {
        // 模拟获取下拉选项数据
        this.projectOptions = [
          { value: 'project1', label: '项目1' },
          { value: 'project2', label: '项目2' }
        ]
        
        this.productOptions = [
          { value: 'product1', label: '产品1' },
          { value: 'product2', label: '产品2' }
        ]
        
        this.sectionOptions = [
          { value: 'section1', label: '工段1' },
          { value: 'section2', label: '工段2' }
        ]
        
        this.routeOptions = [
          { value: 'route1', label: '工艺路线1' },
          { value: 'route2', label: '工艺路线2' }
        ]
        
        this.lineOptions = [
          { value: 'line1', label: '线体1' },
          { value: 'line2', label: '线体2' }
        ]
      },
      
      submitForm() {
        return this.updateRoute({
          id: this.formData.id,
          data: this.formData
        })
      }
    }
  }
  </script>