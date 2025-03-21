<template>
  <div class="process-route-maintenance">
    <div class="control-panel">
      <el-button type="primary" size="small" @click="addNode">新增节点</el-button>
      <el-button type="primary" size="small" @click="saveData">保存配置</el-button>
      <el-button size="small" @click="resetLayout">重置布局</el-button>
    </div>
    
    <!-- 节点表格 -->
    <el-table
      ref="nodeTable"
      :data="tableData"
      border
      style="width: 100%"
      @row-click="handleRowClick">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="id" label="节点ID" width="80"></el-table-column>
      <el-table-column prop="name" label="节点名称">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" size="small" @change="updateGraph"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">
          <el-input v-model="scope.row.description" size="small" @change="updateGraph"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="previousNode" label="前置节点">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.previousNodeId"
            multiple
            clearable
            placeholder="选择前置节点"
            size="small"
            @change="(val) => handlePreviousChange(scope.row, val)">
            <el-option
              v-for="item in getAvailableNodes(scope.row.id)"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="nextNode" label="后置节点">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.nextNodeId"
            multiple
            clearable
            placeholder="选择后置节点"
            size="small"
            @change="(val) => handleNextChange(scope.row, val)">
            <el-option
              v-for="item in getAvailableNodes(scope.row.id)"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="removeNode(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 节点图 -->
    <div class="graph-container">
      <div id="processRouteGraph" ref="graphContainer"></div>
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  name: 'ProcessRouteMaintenance',
  data() {
    return {
      graph: null,
      tableData: [],
      graphData: {
        nodes: [],
        edges: []
      },
      nodeCounter: 0,
      loading: false
    };
  },
  mounted() {
    this.initGraph();
    this.fetchData();
  },
  methods: {
    // 初始化图表
    initGraph() {
      const container = this.$refs.graphContainer;
      const width = container.scrollWidth;
      const height = 500;
      
      // 注册自定义节点
      this.registerCustomNode();
      
      // 创建图实例
      this.graph = new G6.Graph({
        container: 'processRouteGraph',
        width,
        height,
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            {
              type: 'drag-node',
              onEnd: (e) => {
                const model = e.item.get('model');
                this.updateNodePosition(model.id, model.x, model.y);
              }
            }
          ]
        },
        plugins: [
          new G6.Tooltip({
            getContent: (e) => {
              const model = e.item.getModel();
              return `
                <div class="node-tooltip">
                  <div><strong>名称:</strong> ${model.name}</div>
                  <div><strong>描述:</strong> ${model.description || '无'}</div>
                </div>
              `;
            },
            itemTypes: ['node'],
            offsetX: 10,
            offsetY: 10
          }),
        ],
        defaultNode: {
          type: 'process-node',
          size: [120, 60],
          style: {
            fill: '#E8F7FF',
            stroke: '#1890FF',
            radius: 5,
            lineWidth: 2,
            shadowColor: '#ccc',
            shadowBlur: 5
          },
          labelCfg: {
            style: {
              fill: '#333',
              fontSize: 14
            }
          }
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#1890FF',
            lineWidth: 2,
            endArrow: {
              path: G6.Arrow.triangle(8, 8, 0),
              fill: '#1890FF'
            }
          },
          labelCfg: {
            autoRotate: true,
            style: {
              fill: '#666',
              fontSize: 12
            }
          }
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          align: 'UL',
          nodesepFunc: () => 50,
          ranksepFunc: () => 70
        }
      });
      
      // 窗口大小变化时自适应
      window.addEventListener('resize', () => {
        if (this.graph) {
          this.graph.changeSize(container.scrollWidth, height);
        }
      });
    },
    
    // 注册自定义节点
    registerCustomNode() {
      G6.registerNode('process-node', {
        draw(cfg, group) {
          const size = cfg.size || [120, 60];
          const width = Array.isArray(size) ? size[0] : size;
          const height = Array.isArray(size) ? size[1] : size;
          
          const rect = group.addShape('rect', {
            attrs: {
              x: -width / 2,
              y: -height / 2,
              width,
              height,
              ...cfg.style
            },
            name: 'node-shape'
          });
          
          // 添加文本
          group.addShape('text', {
            attrs: {
              text: cfg.name,
              x: 0,
              y: 0,
              textAlign: 'center',
              textBaseline: 'middle',
              fill: '#333',
              fontSize: 14
            },
            name: 'node-label'
          });
          
          return rect;
        }
      });
    },
    
    // 获取数据
    async fetchData() {
      this.loading = true;
      try {
        // 实际项目中替换为真实API调用
        // const response = await this.$http.get('/api/process-routes');
        // this.tableData = response.data;
        
        // 模拟数据
        setTimeout(() => {
          this.tableData = [
            { id: '1', name: '原料检验', description: '检查原料质量', previousNodeId: [], nextNodeId: ['2'] },
            { id: '2', name: '预处理', description: '原料预处理工序', previousNodeId: ['1'], nextNodeId: ['3'] },
            { id: '3', name: '加工成型', description: '主要加工工序', previousNodeId: ['2'], nextNodeId: ['4', '5'] },
            { id: '4', name: '质量检测', description: '成品质量检测', previousNodeId: ['3'], nextNodeId: ['6'] },
            { id: '5', name: '返工处理', description: '不合格品返工', previousNodeId: ['3'], nextNodeId: ['3'] },
            { id: '6', name: '包装入库', description: '成品包装入库', previousNodeId: ['4'], nextNodeId: [] }
          ];
          this.nodeCounter = this.tableData.length;
          this.updateGraph();
          this.loading = false;
        }, 500);
      } catch (error) {
        console.error('获取数据失败', error);
        this.$message.error('获取数据失败');
        this.loading = false;
      }
    },
    
    // 更新图表
    updateGraph() {
      // 构建节点数据
      const nodes = this.tableData.map(node => ({
        id: node.id,
        name: node.name,
        description: node.description,
        x: node.x,
        y: node.y
      }));
      
      // 构建边数据
      let edges = [];
      this.tableData.forEach(node => {
        if (node.nextNodeId && node.nextNodeId.length) {
          node.nextNodeId.forEach(targetId => {
            edges.push({
              id: `${node.id}-${targetId}`,
              source: node.id,
              target: targetId
            });
          });
        }
      });
      
      this.graphData = { nodes, edges };
      this.graph.data(this.graphData);
      this.graph.render();
      this.graph.fitView(40);
    },
    
    // 添加节点
    addNode() {
      this.nodeCounter++;
      const newNode = {
        id: `n${this.nodeCounter}`,
        name: `新节点${this.nodeCounter}`,
        description: '请添加描述',
        previousNodeId: [],
        nextNodeId: []
      };
      this.tableData.push(newNode);
      this.updateGraph();
    },
    
    // 删除节点
    removeNode(index, row) {
      this.$confirm('确认删除该节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const nodeId = row.id;
        
        // 删除与该节点相关的关系
        this.tableData.forEach(node => {
          if (node.previousNodeId && node.previousNodeId.includes(nodeId)) {
            node.previousNodeId = node.previousNodeId.filter(id => id !== nodeId);
          }
          if (node.nextNodeId && node.nextNodeId.includes(nodeId)) {
            node.nextNodeId = node.nextNodeId.filter(id => id !== nodeId);
          }
        });
        
        // 删除节点
        this.tableData.splice(index, 1);
        this.updateGraph();
        this.$message.success('删除成功');
      }).catch(() => {});
    },
    
    // 获取可选节点列表（排除自身）
    getAvailableNodes(currentId) {
      return this.tableData.filter(node => node.id !== currentId);
    },
    
    // 处理前置节点变更
    handlePreviousChange(currentNode, selectedPrevIds) {
      // 更新当前节点的前置节点
      currentNode.previousNodeId = selectedPrevIds;
      
      // 更新相关节点的后置节点
      this.tableData.forEach(node => {
        // 如果节点被选为当前节点的前置节点，确保当前节点是其后置节点
        if (selectedPrevIds.includes(node.id)) {
          if (!node.nextNodeId.includes(currentNode.id)) {
            node.nextNodeId.push(currentNode.id);
          }
        } 
        // 如果节点不再是当前节点的前置节点，从其后置节点中移除当前节点
        else if (node.nextNodeId.includes(currentNode.id) && !selectedPrevIds.includes(node.id)) {
          node.nextNodeId = node.nextNodeId.filter(id => id !== currentNode.id);
        }
      });
      
      this.updateGraph();
    },
    
    // 处理后置节点变更
    handleNextChange(currentNode, selectedNextIds) {
      // 更新当前节点的后置节点
      currentNode.nextNodeId = selectedNextIds;
      
      // 更新相关节点的前置节点
      this.tableData.forEach(node => {
        // 如果节点被选为当前节点的后置节点，确保当前节点是其前置节点
        if (selectedNextIds.includes(node.id)) {
          if (!node.previousNodeId.includes(currentNode.id)) {
            node.previousNodeId.push(currentNode.id);
          }
        } 
        // 如果节点不再是当前节点的后置节点，从其前置节点中移除当前节点
        else if (node.previousNodeId.includes(currentNode.id) && !selectedNextIds.includes(node.id)) {
          node.previousNodeId = node.previousNodeId.filter(id => id !== currentNode.id);
        }
      });
      
      this.updateGraph();
    },
    
    // 更新节点位置
    updateNodePosition(id, x, y) {
      const node = this.tableData.find(n => n.id === id);
      if (node) {
        node.x = x;
        node.y = y;
        // 实际项目中，这里可以调用API保存节点位置
        // this.saveNodePosition(id, x, y);
      }
    },
    
    // 保存节点位置到服务器
    saveNodePosition(id, x, y) {
      // 实际项目中替换为真实API调用
      // this.$http.post('/api/process-routes/node-position', {
      //   id, x, y
      // });
      console.log('保存节点位置', { id, x, y });
    },
    
    // 保存整个配置
    saveData() {
      this.$confirm('确认保存当前配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 实际项目中替换为真实API调用
        // this.$http.post('/api/process-routes', this.tableData);
        console.log('保存配置', this.tableData);
        this.$message.success('保存成功');
      }).catch(() => {});
    },
    
    // 重置布局
    resetLayout() {
      this.graph.updateLayout({
        type: 'dagre',
        rankdir: 'LR',
        align: 'UL'
      });
      this.graph.fitView(40);
    },
    
    // 处理行点击
    handleRowClick(row) {
      // 高亮对应的节点
      this.graph.getNodes().forEach(node => {
        const model = node.getModel();
        if (model.id === row.id) {
          this.graph.setItemState(node, 'selected', true);
        } else {
          this.graph.setItemState(node, 'selected', false);
        }
      });
    }
  }
}
</script>

<style scoped>
.process-route-maintenance {
  padding: 20px;
}

.control-panel {
  margin-bottom: 15px;
}

.graph-container {
  margin-top: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  min-height: 500px;
  position: relative;
}

:deep(.node-tooltip) {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
}
</style>