<!-- src/components/common/DataTable.vue - 通用数据表格组件 -->
<template>
    <div class="data-table-container">
      <div class="table-toolbar" v-if="$slots.toolbar">
        <slot name="toolbar"></slot>
      </div>
      
      <el-table
        ref="table"
        v-loading="loading"
        :data="data"
        :border="border"
        :stripe="stripe"
        :height="height"
        :max-height="maxHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="showSelection"
          type="selection"
          width="55"
        ></el-table-column>
        
        <slot></slot>
        
        <el-table-column
          v-if="showOperations"
          :label="operationsLabel"
          :width="operationsWidth"
          :fixed="operationsFixed"
        >
          <template slot-scope="scope">
            <slot name="operations" :row="scope.row" :index="scope.$index"></slot>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="table-pagination" v-if="showPagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DataTable',
    props: {
      data: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: true
      },
      stripe: {
        type: Boolean,
        default: true
      },
      height: {
        type: [String, Number],
        default: null
      },
      maxHeight: {
        type: [String, Number],
        default: null
      },
      showSelection: {
        type: Boolean,
        default: false
      },
      showOperations: {
        type: Boolean,
        default: true
      },
      operationsLabel: {
        type: String,
        default: '操作'
      },
      operationsWidth: {
        type: String,
        default: '200'
      },
      operationsFixed: {
        type: String,
        default: 'right'
      },
      showPagination: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: Object,
        default: () => ({
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 50, 100],
          total: 0
        })
      }
    },
    data() {
      return {
        selectedRows: []
      }
    },
    methods: {
      handleSelectionChange(selection) {
        this.selectedRows = selection
        this.$emit('selection-change', selection)
      },
      handleSizeChange(size) {
        this.$emit('size-change', size)
      },
      handleCurrentChange(page) {
        this.$emit('current-change', page)
      },
      clearSelection() {
        this.$refs.table.clearSelection()
      },
      toggleRowSelection(row, selected) {
        this.$refs.table.toggleRowSelection(row, selected)
      }
    }
  }
  </script>
  
  <style scoped>
  .data-table-container {
    width: 100%;
  }
  
  .table-toolbar {
    margin-bottom: 15px;
  }
  
  .table-pagination {
    margin-top: 15px;
    text-align: right;
  }
  </style>