<template>
  <div class="station-page">
    <div class="station-header">
      <el-button type="primary" @click="handleReturnToRoute">返回工艺路线</el-button>
      <el-button type="success" @click="handleSave">保存</el-button>
      <el-button type="warning" @click="handleImportStationModule">模块导入工站</el-button>
      <el-button type="info" @click="handleCopyStation">复制工站</el-button>
      <el-button type="primary" @click="handleNewStation">新工站</el-button>
      <el-button type="warning" @click="handleCopyRoute">复制工艺路线</el-button>
      <el-button type="info" @click="handleBatchCopyRoute">批量复制工艺路线</el-button>
    </div>
    
    <div class="station-route-info">
      <h3>当前工艺路线：{{ routeInfo.routeName || '' }}</h3>
      <p>项目名称：{{ routeInfo.projectName || '' }} | 产品料号：{{ routeInfo.productCode || '' }}</p>
    </div>
    
    <station-table
      :data="tableData"
      :loading="tableLoading"
      @edit="handleEditStation"
      @delete="handleDeleteStation">
    </station-table>
    
    <!-- 复制工站弹窗 -->
    <copy-station-dialog
      :visible.sync="copyStationDialogVisible"
      :loading="dialogLoading"
      :current-route="routeInfo"
      @submit="submitCopyStation">
    </copy-station-dialog>
  </div>
</template>

<script>
import { saveToLocalStorage, getFromLocalStorage, deepClone } from './utils/helpers';
import StationTable from './components/StationTable.vue';
import CopyStationDialog from './components/dialogs/CopyStationDialog.vue';

// API接口声明
const stationAPI = {
  /**
   * 获取工站列表
   * @param {String} routeId 工艺路线ID
   * @returns {Promise}
   */
  getStationList(routeId) {
    // return this.$http.axios.post('/api/station/list', { routeId }).catch(() => {
      // 如果API请求失败，使用mock数据
      return this.$http.getMockFile('stations.json');
    // });
  },

  /**
   * 新增工站
   * @param {Object} data 工站数据
   * @returns {Promise}
   */
  addStation(data) {
    return this.$http.axios.post('/api/station/add', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: { id: 'ST' + Date.now() } });
    });
  },

  /**
   * 更新工站
   * @param {Object} data 工站数据
   * @returns {Promise}
   */
  updateStation(data) {
    return this.$http.axios.post('/api/station/update', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 删除工站
   * @param {String} id 工站ID
   * @returns {Promise}
   */
  deleteStation(id) {
    return this.$http.axios.post('/api/station/delete', { id }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 复制工站
   * @param {Object} data 复制工站相关参数
   * @returns {Promise}
   */
  copyStation(data) {
    return this.$http.axios.post('/api/station/copy', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 批量复制工站
   * @param {Object} data 批量复制工站相关参数
   * @returns {Promise}
   */
  batchCopyStation(data) {
    return this.$http.axios.post('/api/station/batchCopy', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 导入工站模块
   * @param {Object} data 导入工站相关参数
   * @returns {Promise}
   */
  importStationModule(data) {
    return this.$http.axios.post('/api/station/importModule', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 保存工站列表
   * @param {Array} stationList 工站列表
   * @returns {Promise}
   */
  saveStationList(stationList) {
    return this.$http.axios.post('/api/station/saveList', { stationList }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  }
};

export default {
  name: 'Mes2StationPage',
  
  components: {
    StationTable,
    CopyStationDialog
  },
  
  props: {
    // 从路由参数中获取工艺路线ID
    routeId: {
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      // 工艺路线信息
      routeInfo: {},
      
      // 表格数据
      tableData: [],
      
      // 表格加载状态
      tableLoading: false,
      
      // 复制工站弹窗可见性
      copyStationDialogVisible: false,
      
      // 弹窗加载状态
      dialogLoading: false,
      
      // 当前已修改的数据
      modifiedData: {}
    };
  },
  
  created() {
    // 从localStorage获取工艺路线信息
    const routeInfo = getFromLocalStorage('currentRoute');
    if (routeInfo && routeInfo.id) {
      this.routeInfo = routeInfo;
    }
    
    // 组件创建时，获取表格数据
    this.getStationList();
  },
  
  methods: {
    // 获取工站列表
    getStationList() {
      this.tableLoading = true;
      
      const routeId = this.routeId || (this.routeInfo && this.routeInfo.id);
      if (!routeId) {
        this.$message.error('工艺路线ID不存在');
        this.tableLoading = false;
        return;
      }
      
      stationAPI.getStationList.call(this, routeId).then(res => {
        if (res && res.code === 0 && res.data) {
          this.tableData = res.data.list || [];
        } else {
          this.$message.error('获取工站列表失败');
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    
    // 处理返回工艺路线
    handleReturnToRoute() {
      this.$router.push({
        name: 'Mes2RoutePage'
      });
    },
    
    // 处理保存
    handleSave() {
      // 获取表格中的数据
      const stationTable = this.$refs.stationTable;
      if (!stationTable) {
        this.$message.error('表格组件不存在');
        return;
      }
      
      const stationList = stationTable.getTableData();
      
      this.tableLoading = true;
      
      stationAPI.saveStationList.call(this, stationList).then(res => {
        if (res && res.code === 0) {
          this.$message.success('保存成功');
        } else {
          this.$message.error('保存失败');
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    
    // 处理模块导入工站
    handleImportStationModule() {
      this.$message.info('模块导入工站功能开发中...');
    },
    
    // 处理复制工站
    handleCopyStation() {
      this.copyStationDialogVisible = true;
    },
    
    // 处理新工站
    handleNewStation() {
      // 创建一个新的工站对象
      const newStation = {
        id: 'ST' + Date.now(),
        name: '新工站',
        station: '',
        stationType: '组装',
        repairInput: false,
        defectPoint: false,
        prevNode: '',
        nextNode: '',
        nextNodeSample: '',
        nextNodeFail: '',
        order: this.tableData.length + 1,
        createdBy: '当前用户',
        modifiedBy: '当前用户'
      };
      
      // 添加到表格数据中
      this.tableData.push(newStation);
    },
    
    // 处理复制工艺路线
    handleCopyRoute() {
      this.$message.info('复制工艺路线功能开发中...');
    },
    
    // 处理批量复制工艺路线
    handleBatchCopyRoute() {
      this.$message.info('批量复制工艺路线功能开发中...');
    },
    
    // 处理编辑工站
    handleEditStation(row) {
      // 直接在表格中编辑
      this.$message.info(`编辑工站: ${row.name}`);
    },
    
    // 处理删除工站
    handleDeleteStation(row) {
      this.$confirm('确定要删除该工站吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.id.startsWith('ST')) {
          // 如果是已存在的工站，调用删除接口
          stationAPI.deleteStation.call(this, row.id).then(res => {
            if (res && res.code === 0) {
              this.$message.success('删除成功');
              
              // 从表格中移除
              const index = this.tableData.findIndex(item => item.id === row.id);
              if (index !== -1) {
                this.tableData.splice(index, 1);
              }
            } else {
              this.$message.error('删除失败');
            }
          });
        } else {
          // 如果是新增的工站，直接从表格中移除
          const index = this.tableData.findIndex(item => item.id === row.id);
          if (index !== -1) {
            this.tableData.splice(index, 1);
            this.$message.success('删除成功');
          }
        }
      }).catch(() => {});
    },
    
    // 提交复制工站
    submitCopyStation(data) {
      this.dialogLoading = true;
      
      stationAPI.copyStation.call(this, data).then(res => {
        if (res && res.code === 0) {
          this.$message.success('复制成功');
          this.copyStationDialogVisible = false;
          this.getStationList();
        } else {
          this.$message.error('复制失败');
        }
      }).finally(() => {
        this.dialogLoading = false;
      });
    }
  }
};
</script>

<style scoped>
.station-page {
  padding: 20px;
}

.station-header {
  margin-bottom: 20px;
}

.station-route-info {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.station-route-info h3 {
  margin: 0 0 10px 0;
}

.station-route-info p {
  margin: 0;
}
</style> 