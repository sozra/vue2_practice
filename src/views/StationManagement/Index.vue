<template>
    <div class="station-management-container">
      <div class="header-section">
         <div class="route-info">
           <h3>{{ routeInfo.name || '工站列表' }}</h3>
           <p>工艺路线 ID: {{ routeInfo.id }}</p>
         </div>
         <div class="actions-bar">
            <el-button icon="el-icon-back" @click="goBack">返回工艺路线</el-button>
            <el-button type="primary" icon="el-icon-check" @click="handleSaveAll" :loading="saveAllLoading" :disabled="!hasChanges">保存更改</el-button>
            <el-button icon="el-icon-download" @click="handleImport">模块导入工站</el-button>
            <el-button icon="el-icon-document-copy" @click="handleCopyStation">复制工站</el-button>
            <el-button type="success" icon="el-icon-plus" @click="handleAddNewStation">新工站</el-button>
            <el-button icon="el-icon-refresh-right" @click="handleCopyRoute">复制工艺路线</el-button>
            <el-button icon="el-icon-copy-document" @click="handleBatchCopyRoute">批量复制工艺路线</el-button>
         </div>
      </div>
  
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        row-key="stationId"
        style="width: 100%"
        ref="stationTable"
      >
          <el-table-column prop="stationId" label="工站ID" width="150" show-overflow-tooltip></el-table-column>
  
          <el-table-column label="工站名称" min-width="150">
              <template slot-scope="scope">
                  <el-select
                      v-model="scope.row.stationNameId"
                      placeholder="请选择"
                      size="mini"
                      filterable
                      @change="handleCellChange(scope.row, 'stationNameId', $event)"
                  >
                      <el-option
                          v-for="item in dropdownOptions.stationNames"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      ></el-option>
                  </el-select>
              </template>
          </el-table-column>
  
          <el-table-column label="工站" min-width="120">
               <template slot-scope="scope">
                  {{ getDropdownLabel(dropdownOptions.stationNames, scope.row.stationNameId) }}
               </template>
          </el-table-column>
  
          <el-table-column label="工站类型" min-width="120">
              <template slot-scope="scope">
                  <el-select v-model="scope.row.stationTypeId" placeholder="请选择" size="mini" @change="handleCellChange(scope.row, 'stationTypeId', $event)">
                      <el-option
                          v-for="item in dropdownOptions.stationTypes"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      ></el-option>
                  </el-select>
              </template>
          </el-table-column>
  
          <el-table-column label="维修投入点" width="110">
              <template slot-scope="scope">
                  <el-select v-model="scope.row.isRepairPoint" placeholder="请选择" size="mini" @change="handleCellChange(scope.row, 'isRepairPoint', $event)">
                     <el-option label="是" :value="true"></el-option>
                     <el-option label="否" :value="false"></el-option>
                  </el-select>
              </template>
          </el-table-column>
  
           <el-table-column label="不良发现点" width="110">
              <template slot-scope="scope">
                   <el-select v-model="scope.row.isDefectPoint" placeholder="请选择" size="mini" @change="handleCellChange(scope.row, 'isDefectPoint', $event)">
                     <el-option label="是" :value="true"></el-option>
                     <el-option label="否" :value="false"></el-option>
                  </el-select>
              </template>
          </el-table-column>
  
          <el-table-column label="上一节点" min-width="130">
              <template slot-scope="scope">
                  <el-select v-model="scope.row.prevNodeId" placeholder="无" size="mini" clearable filterable @change="handleCellChange(scope.row, 'prevNodeId', $event)">
                     <el-option
                          v-for="item in dropdownOptions.nodeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      ></el-option>
                  </el-select>
              </template>
          </el-table-column>
  
           <el-table-column label="下一节点" min-width="130">
              <template slot-scope="scope">
                  <el-select v-model="scope.row.nextNodeId" placeholder="无" size="mini" clearable filterable @change="handleCellChange(scope.row, 'nextNodeId', $event)">
                     <el-option
                          v-for="item in dropdownOptions.nodeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      ></el-option>
                  </el-select>
              </template>
          </el-table-column>
  
           <el-table-column label="下一节点(抽检)" min-width="140">
              <template slot-scope="scope">
                  <el-select v-model="scope.row.nextNodeCheckId" placeholder="无" size="mini" clearable filterable @change="handleCellChange(scope.row, 'nextNodeCheckId', $event)">
                     <el-option
                          v-for="item in dropdownOptions.nodeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      ></el-option>
                  </el-select>
              </template>
          </el-table-column>
  
           <el-table-column label="下一节点(FAIL)" min-width="140">
               <template slot-scope="scope">
                  <el-select v-model="scope.row.nextNodeFailId" placeholder="无" size="mini" clearable filterable @change="handleCellChange(scope.row, 'nextNodeFailId', $event)">
                     <el-option
                          v-for="item in dropdownOptions.nodeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      ></el-option>
                  </el-select>
              </template>
          </el-table-column>
  
          <el-table-column label="排序号" width="100">
              <template slot-scope="scope">
                  <el-input-number
                      v-model="scope.row.sortOrder"
                      :min="0"
                      size="mini"
                      controls-position="right"
                      style="width: 80px;"
                      @change="handleCellChange(scope.row, 'sortOrder', $event)"
                  ></el-input-number>
              </template>
          </el-table-column>
  
          <el-table-column prop="creator" label="创建人" width="100"></el-table-column>
          <el-table-column prop="modifier" label="修改人" width="100"></el-table-column>
  
          <el-table-column label="操作" fixed="right" width="150">
              <template slot-scope="scope">
                  <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-check"
                      :loading="scope.row._isLoading"
                      @click="handleRowUpdate(scope.row)"
                      :disabled="!isRowChanged(scope.row)"
                   >
                   修改
                   </el-button>
                  <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      :loading="scope.row._isLoading"
                      @click="handleRowDelete(scope.row)"
                  >
                  删除
                  </el-button>
              </template>
          </el-table-column>
      </el-table>
  
       <copy-station-modal
          :visible.sync="copyModalVisible"
          :current-route="routeInfo"
          @submit-success="handleCopySuccess"
      />
  
      </div>
  </template>
  
  <script>
  import * as api from '@/api';
  import CopyStationModal from '@/components/Station/CopyStationModal.vue';
  import { isEqual } from 'lodash-es'; // 使用 lodash 的 isEqual 进行深比较
  
  export default {
    name: 'StationManagement',
    components: {
      CopyStationModal
    },
    data() {
      return {
        loading: false,
        saveAllLoading: false,
        routeInfo: {
          id: null,
          name: '',
        },
        tableData: [],
        dropdownOptions: { // 存储所有下拉选项
          stationNames: [],
          stationTypes: [],
          nodeOptions: [],
          // ... 其他
        },
        optionsLoading: false,
        copyModalVisible: false,
        changedRows: new Set(), // 存储已更改行的 ID 或引用
      };
    },
    computed: {
      // 计算是否有未保存的更改
      hasChanges() {
        return this.changedRows.size > 0;
      }
    },
    created() {
      // 从路由获取信息
      this.routeInfo.id = this.$route.params.routeId;
      this.routeInfo.name = this.$route.query.routeName || '';
  
      if (!this.routeInfo.id) {
        this.$message.error('未指定工艺路线ID');
        this.goBack(); // 或者跳转到错误页
        return;
      }
      this.loadDropdownOptions(); // 先加载下拉选项
      this.fetchData(); // 再加载表格数据
    },
    methods: {
       // 返回上一页
      goBack() {
        this.$router.go(-1); // 或 this.$router.push({ name: 'RouteManagement' });
      },
      // 加载下拉选项数据
      loadDropdownOptions() {
          this.optionsLoading = true;
          api.getStationDropdownOptions()
              .then(res => {
                  this.dropdownOptions = res.data;
              })
              .catch(err => {
                  console.error("Failed to load dropdown options:", err);
                  this.$message.error('加载下拉选项失败');
              })
              .finally(() => {
                  this.optionsLoading = false;
              });
      },
      // 获取表格数据
      fetchData() {
        this.loading = true;
        this.changedRows.clear(); // 清空更改标记
        api.getStations(this.routeInfo.id, {}) // 假设无分页和查询
          .then(res => {
              this.tableData = (res.data.list || []).map(row => {
                  // 给每行添加内部状态
                  this.$set(row, '_originalData', JSON.parse(JSON.stringify(row))); // 保存原始数据副本
                  this.$set(row, '_isLoading', false); // 初始化加载状态
                  return row;
              });
          })
          .catch(err => {
              console.error("Failed to fetch stations:", err);
              this.$message.error('获取工站列表失败');
          })
          .finally(() => {
            this.loading = false;
          });
      },
  
      // 单元格内容改变时的处理
      handleCellChange(row, field, value) {
          console.log(`Row ${row.stationId} field ${field} changed to`, value);
          // 标记该行已更改
          if (!this.isRowChanged(row)) {
              this.changedRows.add(row.stationId); // 使用唯一标识符
              console.log('Marked row as changed:', row.stationId);
          } else if (this.isRowChanged(row) && isEqual(row, row._originalData)) {
               // 如果改回原始状态，则移除标记 (需要清理内部状态字段再比较)
               const current = { ...row }; delete current._originalData; delete current._isLoading;
               const original = { ...row._originalData }; delete original._originalData; delete original._isLoading;
               if (isEqual(current, original)) {
                  this.changedRows.delete(row.stationId);
                  console.log('Row reverted to original, unmark change:', row.stationId);
               }
          }
          // 特殊处理：如果改变了 stationNameId, 可能需要更新显示的 stationName (如果后端不自动处理)
          if (field === 'stationNameId') {
              const selectedOption = this.dropdownOptions.stationNames.find(opt => opt.value === value);
              if (selectedOption) {
                  row.stationName = selectedOption.label; // 更新显示名称
              }
          }
      },
  
      // 判断行数据是否已更改
      isRowChanged(row) {
          // 比较当前行数据和原始数据副本 (需要排除内部状态字段)
          const current = { ...row }; delete current._originalData; delete current._isLoading;
          const original = { ...row._originalData }; delete original._originalData; delete original._isLoading;
          return !isEqual(current, original);
      },
  
      // 行内修改按钮（保存单行）
      handleRowUpdate(row) {
        if (!this.isRowChanged(row)) {
            this.$message.warning('数据未更改');
            return;
        }
        this.$set(row, '_isLoading', true); // 设置行加载状态
        api.updateStation(row.stationId, row)
          .then(res => {
              this.$message.success(`工站 ${row.stationId} 更新成功`);
              // 更新成功后，将当前数据设为新的原始数据，并移除更改标记
              row._originalData = JSON.parse(JSON.stringify(row)); // 更新副本
              this.changedRows.delete(row.stationId); // 移除更改标记
              // 如果API返回了更新后的完整数据，最好用返回的数据更新行
              // Object.assign(row, res.data); // 例如
              // row._originalData = JSON.parse(JSON.stringify(res.data));
          })
          .catch(err => console.error('Update failed:', err))
          .finally(() => {
             this.$set(row, '_isLoading', false); // 取消行加载状态
          });
      },
  
      // 行内删除按钮
      handleRowDelete(row) {
         this.$confirm(`确定要删除工站 "${this.getDropdownLabel(this.dropdownOptions.stationNames, row.stationNameId) || row.stationId}" 吗?`, '提示', { type: 'warning' })
          .then(() => {
              this.$set(row, '_isLoading', true);
              return api.deleteStation(row.stationId);
          })
          .then(() => {
            this.$message.success('删除成功');
            // 从表格数据中移除该行
            const index = this.tableData.findIndex(item => item.stationId === row.stationId);
            if (index !== -1) {
                this.tableData.splice(index, 1);
            }
            // 如果该行曾被标记为更改，也从 changedRows 中移除
            this.changedRows.delete(row.stationId);
          })
          .catch(err => { if (err !== 'cancel') console.error('Delete failed:', err); })
          .finally(() => {
              // 确保 _isLoading 被设置回 false，即使行已被删除 (虽然界面上看不到了)
              // 或者在删除成功后直接移除对 row 的引用
          });
      },
  
      // 顶部“保存更改”按钮
      handleSaveAll() {
          if (!this.hasChanges) {
              this.$message.info('没有检测到更改');
              return;
          }
          this.saveAllLoading = true;
          // 收集所有已更改的行数据
          const rowsToSave = this.tableData.filter(row => this.changedRows.has(row.stationId));
  
          api.saveAllStations(this.routeInfo.id, rowsToSave)
              .then(res => {
                  this.$message.success(`成功保存 ${res.data.updatedCount || rowsToSave.length} 条更改`);
                  // 保存成功后，更新所有已保存行的原始数据，并清空更改标记
                  rowsToSave.forEach(row => {
                      row._originalData = JSON.parse(JSON.stringify(row));
                  });
                  this.changedRows.clear();
                  // 可选：重新从后端拉取一次最新数据确保同步
                  // this.fetchData();
              })
              .catch(err => console.error('Save all failed:', err))
              .finally(() => {
                  this.saveAllLoading = false;
              });
      },
  
      // 新增工站按钮
      handleAddNewStation() {
          // 创建一个默认的新行数据结构
          const newStation = {
              stationId: `NEW_${Date.now()}`, // 临时ID，后端保存后会替换
              stationNameId: null,
              stationCode: '',
              stationTypeId: null,
              isRepairPoint: false,
              isDefectPoint: false,
              prevNodeId: null,
              nextNodeId: null,
              nextNodeCheckId: null,
              nextNodeFailId: null,
              sortOrder: (this.tableData.length + 1) * 10,
              creator: '当前用户', // 从Vuex或某处获取
              modifier: '当前用户',
              _originalData: null, // 新增行没有原始数据
              _isLoading: false,
              // 可能需要一个标记表明这是新行
              _isNew: true,
          };
          newStation._originalData = JSON.parse(JSON.stringify(newStation)); // 设置初始状态
          this.tableData.push(newStation);
          this.changedRows.add(newStation.stationId); // 新行直接标记为已更改
  
          // 可选：滚动到表格底部
          this.$nextTick(() => {
               if (this.$refs.stationTable) {
                  this.$refs.stationTable.bodyWrapper.scrollTop = this.$refs.stationTable.bodyWrapper.scrollHeight;
               }
          });
      },
  
      // 复制工站按钮
      handleCopyStation() {
          this.copyModalVisible = true;
      },
      // 复制成功回调
      handleCopySuccess() {
          this.fetchData(); // 复制成功后刷新列表
      },
  
      // 其他按钮的实现... (模块导入, 复制工艺路线等)
      handleImport() { this.$message.info('模块导入功能待实现'); },
      handleCopyRoute() { this.$message.info('复制工艺路线功能待实现'); },
      handleBatchCopyRoute() { this.$message.info('批量复制工艺路线功能待实现'); },
  
      // 辅助方法：根据 value 获取下拉选项的 label
      getDropdownLabel(options, value) {
          const option = (options || []).find(opt => opt.value === value);
          return option ? option.label : value; // 如果找不到，显示原始值
      }
    },
      // 组件销毁前检查是否有未保存的更改
      beforeDestroy() {
          if (this.hasChanges) {
              // 根据策略决定是否提示用户
              console.warn("Station Management: There are unsaved changes.");
              // 可以选择弹窗提示，或自动保存等
          }
      },
       // 路由离开前守卫 (更推荐)
      beforeRouteLeave(to, from, next) {
          if (this.hasChanges) {
              this.$confirm('您有未保存的更改，确定要离开吗？', '提示', {
                  confirmButtonText: '确定离开',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  next(); // 确认离开
              }).catch(() => {
                  next(false); // 取消离开
              });
          } else {
              next(); // 没有更改，直接离开
          }
      }
  };
  </script>
  
  <style scoped>
  .station-management-container {
    padding: 20px;
  }
  .header-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start; /* 顶部对齐 */
      margin-bottom: 15px;
      flex-wrap: wrap; /* 允许换行 */
  }
  .route-info h3 {
      margin: 0 0 5px 0;
  }
  .route-info p {
      margin: 0;
      color: #606266;
      font-size: 14px;
  }
  .actions-bar {
      display: flex;
      flex-wrap: wrap; /* 允许按钮换行 */
      gap: 10px; /* 按钮间距 */
  }
  /* 使表格内的控件更紧凑 */
  .el-table .el-select,
  .el-table .el-input-number {
      width: 100%; /* 下拉框占满单元格宽度 */
  }
  .el-table .el-input-number {
      width: auto; /* 数字输入框保持默认宽度或指定宽度 */
  }
  </style>