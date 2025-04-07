<template>
  <div class="route-table">
    <el-table
      :data="tableData"
      border
      stripe
      v-loading="loading"
      style="width: 100%">
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="150"></el-table-column>
      <el-table-column prop="productCode" label="产品（定制料号）" width="180"></el-table-column>
      <el-table-column prop="section" label="工段" width="100"></el-table-column>
      <el-table-column prop="routeName" label="工艺路线名称" width="180"></el-table-column>
      <el-table-column prop="prevRouteName" label="上一工艺路线" width="180"></el-table-column>
      <el-table-column prop="productLine" label="线体" width="100"></el-table-column>
      <el-table-column prop="type" label="类型" width="100"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="modifiedBy" label="修改人" width="100"></el-table-column>
      <el-table-column prop="modifiedTime" label="修改时间" width="180"></el-table-column>
      <el-table-column label="操作" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
            :disabled="!canEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            :disabled="!canDelete(scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleViewStations(scope.row)">查看工站</el-button>
          <el-dropdown size="mini" @command="command => handleCommand(command, scope.row)">
            <el-button size="mini" type="info">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="cancel" :disabled="!canCancel(scope.row)">取消</el-dropdown-item>
              <el-dropdown-item command="complete" :disabled="!canComplete(scope.row)">完成设计</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouteTable',
  
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => []
    },
    
    // 是否正在加载
    loading: {
      type: Boolean,
      default: false
    },
    
    // 分页信息
    pagination: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10,
        total: 0
      })
    }
  },
  
  data() {
    return {
      // 表格数据
      tableData: [],
      
      // 分页信息
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  
  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.tableData = val || [];
      }
    },
    
    pagination: {
      immediate: true,
      deep: true,
      handler(val) {
        this.pageInfo = {
          ...this.pageInfo,
          ...val
        };
      }
    }
  },
  
  methods: {
    // 获取状态类型
    getStatusType(status) {
      const statusMap = {
        '设计中': 'warning',
        '审核中': 'info',
        '已完成': 'success'
      };
      return statusMap[status] || 'info';
    },
    
    // 是否可以编辑
    canEdit(row) {
      return row.status === '设计中';
    },
    
    // 是否可以删除
    canDelete(row) {
      return row.status === '设计中';
    },
    
    // 是否可以取消
    canCancel(row) {
      return row.status === '审核中';
    },
    
    // 是否可以完成设计
    canComplete(row) {
      return row.status === '设计中';
    },
    
    // 编辑
    handleEdit(row) {
      this.$emit('edit', row);
    },
    
    // 删除
    handleDelete(row) {
      this.$emit('delete', row);
    },
    
    // 查看工站
    handleViewStations(row) {
      this.$emit('view-stations', row);
    },
    
    // 更多操作
    handleCommand(command, row) {
      this.$emit(command, row);
    },
    
    // 分页大小变化
    handleSizeChange(size) {
      this.pageInfo.pageSize = size;
      this.$emit('pagination-change', this.pageInfo);
    },
    
    // 当前页变化
    handleCurrentChange(page) {
      this.pageInfo.currentPage = page;
      this.$emit('pagination-change', this.pageInfo);
    }
  }
};
</script>

<style scoped>
.route-table {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}
</style> 