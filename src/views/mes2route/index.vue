<template>
  <div class="route-page">
    <div class="route-header">
      <el-button type="primary" @click="handleNewRoute">新工艺路线</el-button>
      <el-button type="warning" @click="handleValidateRoute">工艺路线校验</el-button>
    </div>
    
    <search-form
      ref="searchForm"
      @search="handleSearch"
      @reset="handleReset">
    </search-form>
    
    <route-table
      :data="tableData"
      :loading="tableLoading"
      :pagination="pagination"
      @edit="handleEditRoute"
      @delete="handleDeleteRoute"
      @view-stations="handleViewStations"
      @cancel="handleCancelRoute"
      @complete="handleCompleteRoute"
      @pagination-change="handlePaginationChange">
    </route-table>
    
    <!-- 新增工艺路线弹窗 -->
    <new-route-dialog
      :visible.sync="newRouteDialogVisible"
      :loading="dialogLoading"
      @submit="submitNewRoute">
    </new-route-dialog>
    
    <!-- 编辑工艺路线弹窗 -->
    <edit-route-dialog
      :visible.sync="editRouteDialogVisible"
      :loading="dialogLoading"
      :edit-data="currentEditData"
      @submit="submitEditRoute">
    </edit-route-dialog>
  </div>
</template>

<script>
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './utils/helpers';
import SearchForm from './components/SearchForm.vue';
import RouteTable from './components/RouteTable.vue';
import NewRouteDialog from './components/dialogs/NewRouteDialog.vue';
import EditRouteDialog from './components/dialogs/EditRouteDialog.vue';

// API接口声明
const routeAPI = {
  /**
   * 获取工艺路线列表
   * @param {Object} params 查询参数
   * @returns {Promise}
   */
  getRouteList(params) {
    // return this.$http.axios.post('/api/route/list', params).catch(() => {
      // 如果API请求失败，使用mock数据
      return this.$http.getMockFile('routes.json');
    // });
  },

  /**
   * 新增工艺路线
   * @param {Object} data 工艺路线数据
   * @returns {Promise}
   */
  addRoute(data) {
    return this.$http.axios.post('/api/route/add', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: { id: 'RL' + Date.now() } });
    });
  },

  /**
   * 编辑工艺路线
   * @param {Object} data 工艺路线数据
   * @returns {Promise}
   */
  updateRoute(data) {
    return this.$http.axios.post('/api/route/update', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 删除工艺路线
   * @param {String} id 工艺路线ID
   * @returns {Promise}
   */
  deleteRoute(id) {
    return this.$http.axios.post('/api/route/delete', { id }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 工艺路线校验
   * @param {String} id 工艺路线ID
   * @returns {Promise}
   */
  validateRoute(id) {
    return this.$http.axios.post('/api/route/validate', { id }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: { valid: true, message: '校验通过' } });
    });
  },

  /**
   * 更改工艺路线状态
   * @param {String} id 工艺路线ID
   * @param {String} status 新状态
   * @returns {Promise}
   */
  updateRouteStatus(id, status) {
    return this.$http.axios.post('/api/route/updateStatus', { id, status }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  }
};

export default {
  name: 'Mes2RoutePage',
  
  components: {
    SearchForm,
    RouteTable,
    NewRouteDialog,
    EditRouteDialog
  },
  
  data() {
    return {
      // 表格数据
      tableData: [],
      
      // 表格加载状态
      tableLoading: false,
      
      // 分页信息
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      
      // 查询参数
      queryParams: {},
      
      // 新增工艺路线弹窗可见性
      newRouteDialogVisible: false,
      
      // 编辑工艺路线弹窗可见性
      editRouteDialogVisible: false,
      
      // 弹窗加载状态
      dialogLoading: false,
      
      // 当前编辑数据
      currentEditData: {}
    };
  },
  
  created() {
    // 组件创建时，获取表格数据
    this.getRouteList();
  },
  
  methods: {
    // 获取工艺路线列表
    getRouteList() {
      this.tableLoading = true;
      
      const params = {
        ...this.queryParams,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      };
      
      routeAPI.getRouteList.call(this, params).then(res => {
        if (res && res.code === 0 && res.data) {
          this.tableData = res.data.list || [];
          this.pagination.total = res.data.total || 0;
        } else {
          this.$message.error('获取工艺路线列表失败');
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    
    // 处理查询
    handleSearch(formData) {
      this.queryParams = {...formData};
      this.pagination.currentPage = 1;
      this.getRouteList();
    },
    
    // 处理重置
    handleReset() {
      this.queryParams = {};
      this.pagination.currentPage = 1;
      this.getRouteList();
    },
    
    // 处理分页变化
    handlePaginationChange(pagination) {
      this.pagination = {...pagination};
      this.getRouteList();
    },
    
    // 处理新增工艺路线
    handleNewRoute() {
      this.newRouteDialogVisible = true;
    },
    
    // 处理工艺路线校验
    handleValidateRoute() {
      // 获取选中的工艺路线
      const selectedRows = [];
      
      if (selectedRows.length === 0) {
        this.$message.warning('请选择要校验的工艺路线');
        return;
      }
      
      const id = selectedRows[0].id;
      
      this.$confirm('确定要校验该工艺路线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        routeAPI.validateRoute.call(this, id).then(res => {
          if (res && res.code === 0 && res.data) {
            if (res.data.valid) {
              this.$message.success(res.data.message || '校验通过');
            } else {
              this.$message.error(res.data.message || '校验不通过');
            }
          } else {
            this.$message.error('校验工艺路线失败');
          }
        });
      }).catch(() => {});
    },
    
    // 处理编辑工艺路线
    handleEditRoute(row) {
      this.currentEditData = {...row};
      this.editRouteDialogVisible = true;
    },
    
    // 处理删除工艺路线
    handleDeleteRoute(row) {
      this.$confirm('确定要删除该工艺路线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        routeAPI.deleteRoute.call(this, row.id).then(res => {
          if (res && res.code === 0) {
            this.$message.success('删除成功');
            this.getRouteList();
          } else {
            this.$message.error('删除失败');
          }
        });
      }).catch(() => {});
    },
    
    // 处理查看工站
    handleViewStations(row) {
      // 保存当前工艺路线到localStorage
      saveToLocalStorage('currentRoute', row);
      
      // 跳转到工站页面
      this.$router.push({
        name: 'Mes2StationPage',
        params: {
          routeId: row.id
        }
      });
    },
    
    // 处理取消工艺路线
    handleCancelRoute(row) {
      this.$confirm('确定要取消该工艺路线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        routeAPI.updateRouteStatus.call(this, row.id, '设计中').then(res => {
          if (res && res.code === 0) {
            this.$message.success('操作成功');
            this.getRouteList();
          } else {
            this.$message.error('操作失败');
          }
        });
      }).catch(() => {});
    },
    
    // 处理完成设计
    handleCompleteRoute(row) {
      this.$confirm('确定要完成设计该工艺路线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        routeAPI.updateRouteStatus.call(this, row.id, '审核中').then(res => {
          if (res && res.code === 0) {
            this.$message.success('操作成功');
            this.getRouteList();
          } else {
            this.$message.error('操作失败');
          }
        });
      }).catch(() => {});
    },
    
    // 提交新增工艺路线
    submitNewRoute(data) {
      this.dialogLoading = true;
      
      routeAPI.addRoute.call(this, data).then(res => {
        if (res && res.code === 0) {
          this.$message.success('新增成功');
          this.newRouteDialogVisible = false;
          this.getRouteList();
        } else {
          this.$message.error('新增失败');
        }
      }).finally(() => {
        this.dialogLoading = false;
      });
    },
    
    // 提交编辑工艺路线
    submitEditRoute(data) {
      this.dialogLoading = true;
      
      routeAPI.updateRoute.call(this, data).then(res => {
        if (res && res.code === 0) {
          this.$message.success('编辑成功');
          this.editRouteDialogVisible = false;
          this.getRouteList();
        } else {
          this.$message.error('编辑失败');
        }
      }).finally(() => {
        this.dialogLoading = false;
      });
    }
  }
};
</script>

<style scoped>
.route-page {
  padding: 20px;
}

.route-header {
  margin-bottom: 20px;
}
</style> 