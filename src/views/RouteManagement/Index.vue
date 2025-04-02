<template>
    <div class="route-management-container">
      <div class="actions-bar">
        <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新增工艺路线</el-button>
        <el-button type="success" icon="el-icon-check" @click="handleValidate" :loading="validateLoading">工艺路线校验</el-button>
      </div>
  
      <el-form :inline="true" :model="searchForm" ref="searchForm" class="search-form">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="searchForm.projectName" placeholder="请输入项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品料号" prop="productCode">
          <el-input v-model="searchForm.productCode" placeholder="请输入产品料号" clearable></el-input>
        </el-form-item>
        <el-form-item label="工艺路线名称" prop="routeName">
          <el-input v-model="searchForm.routeName" placeholder="请输入工艺路线名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
           <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
             <el-option label="设计中" value="设计中"></el-option>
             <el-option label="已完成" value="已完成"></el-option>
             <el-option label="已取消" value="已取消"></el-option>
           </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
          <el-button icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
  
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        :default-sort = "{prop: 'modifyTime', order: 'descending'}"
         @sort-change="handleSortChange"
      >
        <el-table-column prop="id" label="ID" width="80" sortable="custom"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="productCode" label="产品(定制料号)" min-width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="section" label="工段" width="100"></el-table-column>
        <el-table-column prop="routeName" label="工艺路线名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="prevRouteName" label="上一工艺路线" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="line" label="线体" width="100"></el-table-column>
        <el-table-column prop="type" label="类型" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
           <template slot-scope="scope">
              <el-tag :type="getStatusTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
           </template>
        </el-table-column>
        <el-table-column prop="modifier" label="修改人" width="100"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间" width="160" sortable="custom"></el-table-column>
        <el-table-column label="操作" fixed="right" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" :disabled="scope.row.status !== '设计中'">删除</el-button>
            <el-button size="mini" type="info" icon="el-icon-view" @click="handleViewStations(scope.row)">查看工站</el-button>
            <el-button size="mini" type="warning" @click="handleCancel(scope.row)" :disabled="scope.row.status !== '设计中'">取消</el-button>
            <el-button size="mini" type="success" @click="handleComplete(scope.row)" :disabled="scope.row.status !== '设计中'">完成设计</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-pagination
        style="margin-top: 20px; text-align: right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
  
      <route-form-modal
        :visible.sync="dialogVisible"
        :initial-data="currentRouteData"
        :is-edit="isEditMode"
        @submit-success="handleSubmitSuccess"
      />
  
    </div>
  </template>
  
  <script>
  import * as api from '@/api';
  import RouteFormModal from '@/components/Route/RouteFormModal.vue';
  
  export default {
    name: 'RouteManagement',
    components: {
      RouteFormModal,
    },
    data() {
      return {
        loading: false,
        validateLoading: false,
        searchForm: {
          projectName: '',
          productCode: '',
          routeName: '',
          status: '',
          // 排序字段和顺序
          sortField: 'modifyTime',
          sortOrder: 'desc' // 'asc' 或 'desc'
        },
        tableData: [],
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
        },
        dialogVisible: false,
        isEditMode: false,
        currentRouteData: null, // 用于传递给弹窗的数据
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      // 获取数据
      fetchData() {
        this.loading = true;
        const params = {
          ...this.searchForm,
          page: this.pagination.page,
          pageSize: this.pagination.pageSize,
          // 将 sortOrder 转换为后端期望的格式，例如 'descending' -> 'desc'
          sortOrder: this.searchForm.sortOrder === 'descending' ? 'desc' : (this.searchForm.sortOrder === 'ascending' ? 'asc' : null),
        };
        api.getRouteList(params)
          .then(res => {
            this.tableData = res.data.list || [];
            this.pagination.total = res.data.total || 0;
          })
          .catch(err => {
              console.error("Failed to fetch route list:", err);
              this.$message.error('获取工艺路线列表失败');
          })
          .finally(() => {
            this.loading = false;
          });
      },
      // 查询
      handleSearch() {
        this.pagination.page = 1; // 查询时重置到第一页
        this.fetchData();
      },
      // 重置查询
      handleReset() {
        this.$refs.searchForm.resetFields();
        // 可能需要手动重置非表单项管理的排序状态
        this.searchForm.sortField = 'modifyTime';
        this.searchForm.sortOrder = 'desc';
        // 重置分页并重新加载
        this.handleSearch();
      },
       // 处理排序变化
      handleSortChange({ column, prop, order }) {
          this.searchForm.sortField = prop;
          this.searchForm.sortOrder = order; // order 是 'ascending' 或 'descending' 或 null
          this.fetchData(); // 重新获取数据
      },
      // 分页大小改变
      handleSizeChange(val) {
          this.pagination.pageSize = val;
          this.pagination.page = 1; // 改每页条数时，重置到第一页
          this.fetchData();
      },
      // 当前页改变
      handleCurrentChange(val) {
          this.pagination.page = val;
          this.fetchData();
      },
      // 新增按钮点击
      handleCreate() {
        this.isEditMode = false;
        this.currentRouteData = null; // 清空数据
        this.dialogVisible = true;
      },
      // 编辑按钮点击
      handleEdit(row) {
        this.isEditMode = true;
        // 传递数据的副本给弹窗，避免弹窗内修改直接影响表格行数据
        this.currentRouteData = JSON.parse(JSON.stringify(row));
        this.dialogVisible = true;
      },
      // 删除按钮点击
      handleDelete(row) {
        this.$confirm(`确定要删除工艺路线 "${row.routeName}" 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
              this.loading = true; // 可以加个行内 loading 或表格 loading
              return api.deleteRoute(row.id);
          })
          .then(() => {
            this.$message.success('删除成功');
            this.fetchData(); // 刷新列表
          })
          .catch((err) => {
              if (err !== 'cancel') { // 用户取消操作不需要提示
                   console.error('Delete failed:', err);
                   // API 封装里可能有提示了, 这里可以不加
              }
          })
          .finally(() => {
              this.loading = false;
          });
      },
      // 查看工站按钮点击
      handleViewStations(row) {
        // 跳转到工站页面，并通过路由参数传递工艺路线信息
        this.$router.push({
          name: 'StationManagement', // 确保路由已命名
          params: { routeId: row.id }, // 传递 ID
          query: { routeName: row.routeName } // 可选：传递名称用于显示
        });
      },
      // 取消设计
      handleCancel(row) {
          this.$confirm(`确定要取消工艺路线 "${row.routeName}" 的设计吗?`, '提示', { type: 'warning' })
              .then(() => api.cancelRoute(row.id))
              .then(() => {
                  this.$message.success('取消成功');
                  this.fetchData();
              })
              .catch(err => { if (err !== 'cancel') console.error('Cancel failed:', err); });
      },
      // 完成设计
      handleComplete(row) {
           this.$confirm(`确定要完成工艺路线 "${row.routeName}" 的设计吗?`, '提示', { type: 'warning' })
              .then(() => api.completeRouteDesign(row.id))
              .then(() => {
                  this.$message.success('设计完成');
                  this.fetchData();
              })
              .catch(err => { if (err !== 'cancel') console.error('Complete failed:', err); });
      },
      // 路线校验
      handleValidate() {
          this.validateLoading = true;
          // 假设校验需要一些上下文数据，比如当前选中的路线(如果支持多选)或全部路线
          const validationData = { /* ... */ };
          api.validateRoute(validationData)
              .then(res => {
                  if (res.data.valid) {
                      this.$message.success(res.data.message || '工艺路线校验通过');
                  } else {
                      this.$message.warning(res.data.message || '工艺路线校验未通过');
                      // 可能需要显示更详细的校验结果
                  }
              })
              .catch(err => console.error('Validation failed:', err))
              .finally(() => {
                  this.validateLoading = false;
              });
      },
      // 弹窗提交成功后的回调
      handleSubmitSuccess(returnedData) {
        // returnedData 是 API 成功后返回的数据，可能包含新增/更新后的完整对象
        console.log('Form submitted successfully, returned data:', returnedData);
        this.fetchData(); // 刷新列表数据
      },
      // 根据状态返回标签类型
      getStatusTagType(status) {
          switch(status) {
              case '设计中': return 'primary';
              case '已完成': return 'success';
              case '已取消': return 'info';
              default: return 'default';
          }
      }
    },
  };
  </script>
  
  <style scoped>
  .route-management-container {
    padding: 20px;
  }
  .actions-bar {
    margin-bottom: 15px;
  }
  .search-form {
    background-color: #f5f7fa;
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 15px;
  }
  /* 修正 Form Item 之间的间距 (Element UI 默认可能有点大) */
  .search-form .el-form-item {
      margin-bottom: 10px;
      margin-right: 10px;
  }
  </style>