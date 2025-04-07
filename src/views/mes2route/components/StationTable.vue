<template>
  <div class="station-table">
    <el-table
      :data="tableData"
      border
      stripe
      v-loading="loading"
      style="width: 100%">
      <el-table-column prop="id" label="工站ID" width="100"></el-table-column>
      
      <el-table-column label="工站名称" width="150">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" size="mini" placeholder="请输入工站名称"></el-input>
        </template>
      </el-table-column>
      
      <el-table-column label="工站" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.station" size="mini" placeholder="请选择工站" filterable>
            <el-option
              v-for="item in stationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column label="工站类型" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.stationType" size="mini" placeholder="请选择工站类型" filterable>
            <el-option
              v-for="item in stationTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column label="维修投入点" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.repairInput"
            :active-value="true"
            :inactive-value="false">
          </el-switch>
        </template>
      </el-table-column>
      
      <el-table-column label="不良发现点" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.defectPoint"
            :active-value="true"
            :inactive-value="false">
          </el-switch>
        </template>
      </el-table-column>
      
      <el-table-column label="上一节点" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.prevNode" size="mini" placeholder="请选择上一节点" filterable>
            <el-option
              v-for="item in getNodeOptions(scope.row)"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column label="下一节点" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.nextNode" size="mini" placeholder="请选择下一节点" filterable>
            <el-option
              v-for="item in getNodeOptions(scope.row)"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column label="下一节点（抽检）" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.nextNodeSample" size="mini" placeholder="请选择抽检节点" filterable clearable>
            <el-option
              v-for="item in getNodeOptions(scope.row)"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column label="下一节点（FAIL）" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.nextNodeFail" size="mini" placeholder="请选择FAIL节点" filterable clearable>
            <el-option
              v-for="item in getNodeOptions(scope.row)"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column label="排序号" width="100">
        <template slot-scope="scope">
          <el-input-number 
            v-model="scope.row.order" 
            size="mini" 
            :min="1" 
            :max="999"
            controls-position="right">
          </el-input-number>
        </template>
      </el-table-column>
      
      <el-table-column prop="createdBy" label="创建人" width="100"></el-table-column>
      <el-table-column prop="modifiedBy" label="修改人" width="100"></el-table-column>
      
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'StationTable',
  
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
    }
  },
  
  data() {
    return {
      // 表格数据
      tableData: [],
      
      // 工站选项
      stationOptions: [
        { value: 'GZ001', label: 'GZ001' },
        { value: 'GZ002', label: 'GZ002' },
        { value: 'GZ003', label: 'GZ003' },
        { value: 'GZ004', label: 'GZ004' },
        { value: 'GZ005', label: 'GZ005' }
      ],
      
      // 工站类型选项
      stationTypeOptions: [
        { value: '组装', label: '组装' },
        { value: '检测', label: '检测' },
        { value: '焊接', label: '焊接' },
        { value: '质检', label: '质检' },
        { value: '包装', label: '包装' }
      ],
      
      // 基础节点选项（除了工站节点外的其他节点）
      baseNodeOptions: [
        { value: '待料区', label: '待料区' },
        { value: '返修区', label: '返修区' },
        { value: '质检站', label: '质检站' },
        { value: '出货区', label: '出货区' }
      ]
    };
  },
  
  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.tableData = val || [];
      }
    }
  },
  
  methods: {
    // 获取所有可选的节点选项
    getNodeOptions(currentRow) {
      // 基础节点选项
      const options = [...this.baseNodeOptions];
      
      // 添加所有工站的名称作为节点选项 (排除当前行自身)
      this.tableData.forEach(row => {
        if (row.id !== currentRow.id && row.name) {
          options.push({
            value: row.name,
            label: row.name
          });
        }
      });
      
      return options;
    },
    
    // 编辑
    handleEdit(row) {
      this.$emit('edit', row);
    },
    
    // 删除
    handleDelete(row) {
      this.$emit('delete', row);
    },
    
    // 获取表格数据
    getTableData() {
      return this.tableData.map(row => ({...row}));
    }
  }
};
</script>

<style scoped>
.station-table {
  margin-bottom: 20px;
}
</style> 