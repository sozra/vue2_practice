<!-- src/views/process-route/StationList.vue - 工站列表页面 -->
<template>
    <div class="app-container">
      <div class="top-actions">
        <el-button @click="handleBackToRoute">返回工艺路线</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
        <el-button type="primary" @click="handleImportModule">模块导入工站</el-button>
        <el-button type="primary" @click="handleCopyStation">复制工站</el-button>
        <el-button type="primary" @click="handleAddStation">新工站</el-button>
        <el-button type="primary" @click="handleCopyRoute">复制工艺路线</el-button>
        <el-button type="primary" @click="handleBatchCopyRoute">批量复制工艺路线</el-button>
      </div>
      
      <div class="route-info" v-if="currentRoute">
        <h3>当前工艺路线: {{ currentRoute.routeName }}</h3>
        <p>项目: {{ currentRoute.projectName }} | 产品: {{ currentRoute.productCode }}</p>
      </div>
      
      <data-table
        :data="stationList"
        :loading="loading.stationList"
        :show-pagination="false"
      >
        <el-table-column prop="id" label="工站ID" width="80" />
        <el-table-column prop="name" label="工站名称" min-width="120" />
        <el-table-column label="工站" min-width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.station" placeholder="请选择工站">
              <el-option
                v-for="item in stationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="工站类型" min-width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.stationType" placeholder="请选择工站类型">
              <el-option
                v-for="item in stationTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="维修投入点" min-width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.repairInput" placeholder="请选择维修投入点">
              <el-option
                v-for="item in yesNoOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="不良发现点" min-width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.defectDetection" placeholder="请选择不良发现点">
              <el-option
                v-for="item in yesNoOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="上一节点" min-width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.prevNode" placeholder="请选择上一节点">
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="下一节点" min-width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.nextNode" placeholder="请选择下一节点">
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="下一节点(抽检)" min-width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.nextNodeSampling" placeholder="请选择下一节点(抽检)">
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="下一节点(FAIL)" min-width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.nextNodeFail" placeholder="请选择下一节点(FAIL)">
              <el-option
                v-for="item in nodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="排序号" width="100">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.sortOrder" :min="1" :controls="false"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人" min-width="100" />
        <el-table-column prop="updateBy" label="修改人" min-width="100" />
        
        <template #operations="{ row }">
          <el-button
            type="text"
            size="small"
            @click="handleEditStation(row)"
          >
            修改
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleDeleteStation(row)"
          >
            删除
          </el-button>
        </template>
      </data-table>
      
      <!-- 复制工站弹窗 -->
      <copy-station-dialog ref="copyStationDialog" />
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex'
  import DataTable from '@/components/common/DataTable.vue'
  import CopyStationDialog from './components/CopyStationDialog.vue'
  
  export default {
    name: 'StationList',
    components: {
      DataTable,
      CopyStationDialog
    },
    data() {
      return {
        stationOptions: [
          { value: 'station1', label: '工站1' },
          { value: 'station2', label: '工站2' }
        ],
        stationTypeOptions: [
          { value: 'normal', label: '普通' },
          { value: 'repair', label: '维修' },
          { value: 'test', label: '测试' }
        ],
        yesNoOptions: [
          { value: true, label: '是' },
          { value: false, label: '否' }
        ],
        nodeOptions: [
          { value: 'node1', label: '节点1' },
          { value: 'node2', label: '节点2' },
          { value: 'node3', label: '节点3' }
        ]
      }
    },
    computed: {
      ...mapState('processRoute', [
        'stationList',
        'currentRoute',
        'loading'
      ]),
      routeId() {
        return this.$route.params.routeId
      }
    },
    created() {
      this.fetchStationList(this.routeId)
    },
    methods: {
      ...mapActions('processRoute', [
        'fetchStationList',
        'saveStations',
        'createStation',
        'updateStation',
        'deleteStation',
        'copyStation',
        'copyProcessRoute',
        'batchCopyProcessRoute',
        'importStationModule'
      ]),
      
      handleBackToRoute() {
        this.$router.push({ name: 'ProcessRouteList' })
      },
      
      handleSave() {
        this.saveStations(this.stationList)
      },
      
      handleImportModule() {
        this.$prompt('请输入要导入的模块ID', '模块导入工站', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d+$/,
          inputErrorMessage: '模块ID必须为数字'
        }).then(({ value }) => {
          this.importStationModule({
            moduleId: value,
            routeId: this.routeId
          })
        }).catch(() => {
          // 取消操作
        })
      },
      
      handleCopyStation() {
        this.$refs.copyStationDialog.open()
      },
      
      handleAddStation() {
        // 创建一个空的工站配置
        const newStation = {
          routeId: this.routeId,
          name: '',
          station: '',
          stationType: '',
          repairInput: false,
          defectDetection: false,
          prevNode: '',
          nextNode: '',
          nextNodeSampling: '',
          nextNodeFail: '',
          sortOrder: this.stationList.length + 1
        }
        
        this.createStation(newStation)
      },
      
      handleEditStation(row) {
        // 这里可以直接在表格中编辑，也可以打开弹窗
        // 这个例子中我们使用表格内直接编辑
      },
      
      handleDeleteStation(row) {
        this.$confirm('确定要删除该工站吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteStation(row.id)
        }).catch(() => {
          // 取消删除
        })
      },
      
      handleCopyRoute() {
        this.$prompt('请输入新工艺路线名称', '复制工艺路线', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.copyProcessRoute({
            sourceRouteId: this.routeId,
            newRouteName: value
          })
        }).catch(() => {
          // 取消操作
        })
      },
      
      handleBatchCopyRoute() {
        // 这里可能需要一个更复杂的表单，这里简化处理
        this.$prompt('请输入目标项目ID', '批量复制工艺路线', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d+$/,
          inputErrorMessage: 'ID必须为数字'
        }).then(({ value }) => {
          this.batchCopyProcessRoute({
            sourceRouteId: this.routeId,
            targetProjectId: value
          })
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
  
  .route-info {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f5f7fa;
    border-radius: 4px;
  }
  
  .route-info h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .route-info p {
    margin: 0;
  }
  </style>