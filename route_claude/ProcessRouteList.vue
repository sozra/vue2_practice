<!-- src/views/process-route/ProcessRouteList.vue - 工艺路线列表页面 -->
<template>
    <div class="app-container">
      <div class="top-actions">
        <el-button type="primary" @click="handleAddRoute">新工艺路线</el-button>
        <el-button type="primary" @click="handleValidateRoute">工艺路线校验</el-button>
      </div>
      
      <search-form
        :form-data="searchParams"
        :loading="loading.routeList"
        @search="handleSearch"
        @reset="handleReset"
      >
        <template #default="{ formData }">
          <el-form-item label="项目名称">
            <el-input v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          
          <el-form-item label="产品(定制料号)">
            <el-input v-model="formData.productCode" placeholder="请输入产品(定制料号)"></el-input>
          </el-form-item>
          
          <el-form-item label="工段">
            <el-select v-model="formData.section" placeholder="请选择工段" clearable>
              <el-option
                v-for="item in sectionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="工艺路线名称">
            <el-input v-model="formData.routeName" placeholder="请输入工艺路线名称"></el-input>
          </el-form-item>
          
          <el-form-item label="类型">
            <el-select v-model="formData.type" placeholder="请选择类型" clearable>
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="状态">
            <el-select v-model="formData.status" placeholder="请选择状态" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
      </search-form>
      
      <data-table
        :data="routeList"
        :loading="loading.routeList"
        :pagination="tablePagination"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="projectName" label="项目名称" min-width="120" />
        <el-table-column prop="productCode" label="产品(定制料号)" min-width="150" />
        <el-table-column prop="section" label="工段" min-width="100" />
        <el-table-column prop="routeName" label="工艺路线名称" min-width="150" />
        <el-table-column prop="prevRoute" label="上一工艺路线" min-width="150" />
        <el-table-column prop="line" label="线体" min-width="100" />
        <el-table-column prop="type" label="类型" min-width="100" />
        <el-table-column prop="status" label="状态" min-width="100" />
        <el-table-column prop="updateBy" label="修改人" min-width="100" />
        <el-table-column prop="updateTime" label="修改时间" min-width="160" />
        
        <template #operations="{ row }">
          <el-button
            type="text"
            size="small"
            @click="handleEditRoute(row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDeleteRoute(row)"
          >
            删除
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleViewStations(row)"
          >
            查看工站
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleCancelRoute(row)"
          >
            取消
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleCompleteRoute(row)"
          >
            完成设计
          </el-button>
        </template>
      </data-table>
      
      <!-- 新增工艺路线弹窗 -->
      <new-route-dialog ref="newRouteDialog" />
      
      <!-- 编辑工艺路线弹窗 -->
      <edit-route-dialog ref="editRouteDialog" />
    </div>
  </template>
  
  <script>
  import { mapState, mapActions, mapMutations } from 'vuex'
  import SearchForm from '@/components/common/SearchForm.vue'
  import DataTable from '@/components/common/DataTable.vue'
  import NewRouteDialog from './components/NewRouteDialog.vue'
  import EditRouteDialog from './components/EditRouteDialog.vue'
  
  export default {
    name: 'ProcessRouteList',
    components: {
      SearchForm,
      DataTable,
      NewRouteDialog,
      EditRouteDialog
    },
    data() {
      return {
        sectionOptions: [
          { value: 'section1', label: '工段1' },
          { value: 'section2', label: '工段2' }
        ],
        typeOptions: [
          { value: 'normal', label: '普通' },
          { value: 'special', label: '特殊' }
        ],
        statusOptions: [
          { value: 'draft', label: '草稿' },
          { value: 'inProgress', label: '进行中' },
          { value: 'completed', label: '已完成' },
          { value: 'canceled', label: '已取消' }
        ],
        tablePagination: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
          total: 0
        }
      }
    },
    computed: {
      ...mapState('processRoute', [
        'routeList',
        'routeTotal',
        'loading',
        'searchParams'
      ])
    },
    created() {
      this.fetchRouteList()
    },
    methods: {
      ...mapActions('processRoute', [
        'fetchRouteList',
        'deleteRoute',
        'validateRoute',
        'completeRoute',
        'cancelRoute'
      ]),
      ...mapMutations('processRoute', [
        'SET_SEARCH_PARAMS',
        'RESET_SEARCH_PARAMS',
        'SET_CURRENT_ROUTE'
      ]),
      
      handleSearch(params) {
        this.SET_SEARCH_PARAMS({ ...params, page: 1 })
        this.fetchRouteList()
      },
      
      handleReset() {
        this.RESET_SEARCH_PARAMS()
        this.fetchRouteList()
      },
      
      handlePageChange(page) {
        this.SET_SEARCH_PARAMS({ page })
        this.fetchRouteList()
      },
      
      handleSizeChange(pageSize) {
        this.SET_SEARCH_PARAMS({ pageSize, page: 1 })
        this.fetchRouteList()
      },
      
      handleAddRoute() {
        this.$refs.newRouteDialog.open()
      },
      
      handleEditRoute(row) {
        this.$refs.editRouteDialog.open(row)
      },
      
      handleDeleteRoute(row) {
        this.$confirm('确定要删除该工艺路线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRoute(row.id)
        }).catch(() => {
          // 取消删除
        })
      },
      
      handleViewStations(row) {
        this.SET_CURRENT_ROUTE(row)
        this.$router.push({ name: 'StationList', params: { routeId: row.id } })
      },
      
      handleCancelRoute(row) {
        this.$confirm('确定要取消该工艺路线吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cancelRoute(row.id)
        }).catch(() => {
          // 取消操作
        })
      },
      
      handleCompleteRoute(row) {
        this.$confirm('确定完成该工艺路线设计吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.completeRoute(row.id)
        }).catch(() => {
          // 取消操作
        })
      },
      
      handleValidateRoute() {
        // 可能需要先选择一个工艺路线，或者弹出选择框
        this.$prompt('请输入要校验的工艺路线ID', '工艺路线校验', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d+$/,
          inputErrorMessage: '工艺路线ID必须为数字'
        }).then(({ value }) => {
          this.validateRoute(value)
        }).catch(() => {
          // 取消操作
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .app-container {
    padding: 20px;
  }
  
  .top-actions {
    margin-bottom: 20px;
  }
  </style>