<!-- src/views/process-route/components/CopyStationDialog.vue - 复制工站弹窗 -->
<template>
    <form-dialog
      title="复制工站"
      :visible.sync="visible"
      :form-data="formData"
      :rules="formRules"
      :loading="formLoading"
      @submit="handleSubmit"
      @cancel="close"
      @closed="close"
    >
      <template #form-items="{ formData }">
        <el-form-item label="项目" prop="projectName">
          <el-select
            v-model="formData.projectName"
            placeholder="请选择项目"
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
        
        <el-form-item label="旧工艺路线" prop="oldRouteId">
          <el-select
            v-model="formData.oldRouteId"
            placeholder="请选择旧工艺路线"
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
        
        <el-form-item label="新工艺路线" prop="newRouteName">
          <el-input v-model="formData.newRouteName" placeholder="新工艺路线名称" disabled></el-input>
        </el-form-item>
      </template>
    </form-dialog>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import FormDialog from '@/components/common/FormDialog.vue'
  import dialogFormMixin from '@/mixins/dialog-form'
  
  export default {
    name: 'CopyStationDialog',
    components: {
      FormDialog
    },
    mixins: [dialogFormMixin],
    data() {
      return {
        formRules: {
          projectName: [
            { required: true, message: '请选择项目', trigger: 'change' }
          ],
          productCode: [
            { required: true, message: '请选择产品(定制料号)', trigger: 'change' }
          ],
          oldRouteId: [
            { required: true, message: '请选择旧工艺路线', trigger: 'change' }
          ]
        },
        projectOptions: [],
        productOptions: [],
        routeOptions: []
      }
    },
    watch: {
      'formData.oldRouteId': {
        handler(val) {
          if (val) {
            // 根据选择的旧工艺路线获取名称并设置新工艺路线名称
            const selectedRoute = this.routeOptions.find(item => item.value === val)
            if (selectedRoute) {
              this.formData.newRouteName = selectedRoute.label + ' - 复制'
            }
          } else {
            this.formData.newRouteName = ''
          }
        }
      }
    },
    created() {
      // 这里应该调用API获取各种下拉选项数据
      this.fetchOptions()
    },
    methods: {
      ...mapActions('processRoute', ['copyStation']),
      
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
        
        this.routeOptions = [
          { value: 'route1', label: '工艺路线1' },
          { value: 'route2', label: '工艺路线2' }
        ]
      },
      
      submitForm() {
        return this.copyStation(this.formData)
      }
    }
  }
  </script>