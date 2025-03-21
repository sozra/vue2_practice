<template>
    <div class="process-flow">
      <div class="page-header">
        <h2>制造工厂车间产线工艺路线维护</h2>
        <div class="header-actions">
          <el-button type="primary" @click="saveProcessData">保存</el-button>
          <el-button @click="refreshData">刷新</el-button>
        </div>
      </div>
  
      <!-- 数据表格部分 -->
      <div class="table-container">
        <el-table
          ref="processTable"
          :data="tableData"
          border
          style="width: 100%"
          @row-click="handleRowClick"
        >
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="nodeName" label="节点名称" width="180"></el-table-column>
          <el-table-column prop="nodeType" label="节点类型" width="120"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column label="前置节点" width="180">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.prevNodeId"
                placeholder="选择前置节点"
                clearable
                @change="(val) => handlePrevNodeChange(scope.row, val)"
              >
                <el-option
                  v-for="item in getPossibleNodes(scope.row.id)"
                  :key="item.id"
                  :label="item.nodeName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="后续节点" width="180">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.nextNodeId"
                placeholder="选择后续节点"
                clearable
                @change="(val) => handleNextNodeChange(scope.row, val)"
              >
                <el-option
                  v-for="item in getPossibleNodes(scope.row.id)"
                  :key="item.id"
                  :label="item.nodeName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
  
        <div class="table-buttons">
          <el-button type="primary" @click="addNode">新增节点</el-button>
        </div>
      </div>
  
      <!-- 流程图展示部分 -->
      <div class="graph-container">
        <div ref="graphContainer" class="graph"></div>
      </div>
  
      <!-- 编辑节点弹窗 -->
      <el-dialog title="编辑节点" :visible.sync="dialogVisible" width="500px">
        <el-form :model="currentNode" label-width="100px">
          <el-form-item label="节点名称">
            <el-input v-model="currentNode.nodeName"></el-input>
          </el-form-item>
          <el-form-item label="节点类型">
            <el-select v-model="currentNode.nodeType" placeholder="请选择节点类型">
              <el-option label="开始" value="start"></el-option>
              <el-option label="加工" value="process"></el-option>
              <el-option label="检验" value="check"></el-option>
              <el-option label="结束" value="end"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="currentNode.description" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveNode">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import G6 from '@antv/g6';
  import axios from 'axios';
  
  export default {
    name: 'ProcessFlow',
    data() {
      return {
        tableData: [],
        graph: null,
        graphData: {
          nodes: [],
          edges: []
        },
        dialogVisible: false,
        currentNode: {
          id: '',
          nodeName: '',
          nodeType: '',
          description: '',
          prevNodeId: null,
          nextNodeId: null,
          x: 0,
          y: 0
        },
        currentEditIndex: -1,
        timer: null
      };
    },
    mounted() {
      this.fetchData();
      this.initGraph();
      window.addEventListener('resize', this.resizeHandler);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeHandler);
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.graph) {
        this.graph.destroy();
      }
    },
    methods: {
      fetchData() {
        // 模拟API请求获取数据
        // 实际应用中应替换为真实API调用
        axios.get('/api/process-flow')
          .then(response => {
            const data = response.data || this.getMockData();
            this.tableData = data.nodes || [];
            this.updateGraphData();
          })
          .catch(() => {
            // 开发阶段使用模拟数据
            const mockData = this.getMockData();
            this.tableData = mockData.nodes;
            this.updateGraphData();
          });
      },
      
      getMockData() {
        return {
          nodes: [
            { id: '1', nodeName: '开始节点', nodeType: 'start', description: '流程开始', prevNodeId: null, nextNodeId: '2', x: 100, y: 100 },
            { id: '2', nodeName: '加工节点1', nodeType: 'process', description: '第一道工序', prevNodeId: '1', nextNodeId: '3', x: 300, y: 100 },
            { id: '3', nodeName: '检验节点', nodeType: 'check', description: '质量检验', prevNodeId: '2', nextNodeId: '4', x: 500, y: 100 },
            { id: '4', nodeName: '加工节点2', nodeType: 'process', description: '第二道工序', prevNodeId: '3', nextNodeId: '5', x: 700, y: 100 },
            { id: '5', nodeName: '结束节点', nodeType: 'end', description: '流程结束', prevNodeId: '4', nextNodeId: null, x: 900, y: 100 },
          ]
        };
      },
      
      initGraph() {
        const container = this.$refs.graphContainer;
        
        // 注册自定义节点
        this.registerCustomNodes();
        
        // 创建G6图实例
        this.graph = new G6.Graph({
          container,
          width: container.clientWidth,
          height: 500,
          modes: {
            default: ['drag-canvas', 'zoom-canvas', {
              type: 'drag-node',
              onEnd: (e) => {
                const model = e.item.get('model');
                const node = this.tableData.find(item => item.id === model.id);
                if (node) {
                  node.x = model.x;
                  node.y = model.y;
                  this.saveNodePosition(node);
                }
              }
            }]
          },
          layout: {
            type: 'dagre',
            rankdir: 'LR',
            nodesep: 80,
            ranksep: 100
          },
          defaultNode: {
            type: 'process-node',
            size: [120, 60],
            style: {
              radius: 8,
              stroke: '#91d5ff',
              fill: '#e6f7ff',
              lineWidth: 2
            },
            labelCfg: {
              style: {
                fill: '#000',
                fontSize: 14
              }
            }
          },
          defaultEdge: {
            type: 'polyline',
            style: {
              radius: 10,
              offset: 30,
              endArrow: true,
              lineWidth: 2,
              stroke: '#C2C8D5'
            }
          },
          nodeStateStyles: {
            hover: {
              stroke: '#1890ff',
              lineWidth: 3
            }
          },
          edgeStateStyles: {
            hover: {
              stroke: '#1890ff'
            }
          }
        });
        
        // 添加节点提示信息
        this.graph.on('node:mouseenter', (evt) => {
          const { item } = evt;
          const model = item.get('model');
          const nodeData = this.tableData.find(n => n.id === model.id);
          
          if (nodeData) {
            this.graph.setItemState(item, 'hover', true);
            
            // 创建tooltip内容
            const tooltipContent = `
              <div class="g6-tooltip">
                <h4>${nodeData.nodeName}</h4>
                <p><strong>类型:</strong> ${nodeData.nodeType}</p>
                <p><strong>描述:</strong> ${nodeData.description}</p>
              </div>
            `;
            
            const tooltip = document.createElement('div');
            tooltip.id = 'graph-tooltip';
            tooltip.innerHTML = tooltipContent;
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${evt.clientX + 10}px`;
            tooltip.style.top = `${evt.clientY + 10}px`;
            tooltip.style.background = 'white';
            tooltip.style.padding = '10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
            tooltip.style.zIndex = 9999;
            
            document.body.appendChild(tooltip);
          }
        });
        
        this.graph.on('node:mouseleave', (evt) => {
          const { item } = evt;
          this.graph.setItemState(item, 'hover', false);
          
          // 移除tooltip
          const tooltip = document.getElementById('graph-tooltip');
          if (tooltip) {
            document.body.removeChild(tooltip);
          }
        });
        
        this.graph.data(this.graphData);
        this.graph.render();
      },
      
      registerCustomNodes() {
        // 注册自定义节点
        G6.registerNode('process-node', {
          draw(cfg, group) {
            const { nodeType = 'process' } = cfg;
            
            let shape;
            const width = cfg.size[0];
            const height = cfg.size[1];
            
            // 根据节点类型绘制不同形状
            switch (nodeType) {
              case 'start':
                shape = group.addShape('circle', {
                  attrs: {
                    x: 0,
                    y: 0,
                    r: 30,
                    fill: '#e8f7f0',
                    stroke: '#67c23a',
                    lineWidth: 2
                  },
                  name: 'node-shape',
                });
                break;
                
              case 'end':
                shape = group.addShape('circle', {
                  attrs: {
                    x: 0,
                    y: 0,
                    r: 30,
                    fill: '#f5e8e8',
                    stroke: '#f56c6c',
                    lineWidth: 2
                  },
                  name: 'node-shape',
                });
                break;
                
              case 'check':
                shape = group.addShape('diamond', {
                  attrs: {
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: '#f2f6fc',
                    stroke: '#409eff',
                    lineWidth: 2
                  },
                  name: 'node-shape',
                });
                break;
                
              default: // process
                shape = group.addShape('rect', {
                  attrs: {
                    x: -width / 2,
                    y: -height / 2,
                    width: width,
                    height: height,
                    radius: 4,
                    fill: '#e6f7ff',
                    stroke: '#91d5ff',
                    lineWidth: 2
                  },
                  name: 'node-shape',
                });
            }
            
            // 添加标签
            group.addShape('text', {
              attrs: {
                text: cfg.label,
                x: 0,
                y: 0,
                textAlign: 'center',
                textBaseline: 'middle',
                fill: '#333',
                fontSize: 14
              },
              name: 'node-label'
            });
            
            return shape;
          }
        }, 'single-node');
      },
      
      updateGraphData() {
        const nodes = [];
        const edges = [];
        
        // 转换节点数据为图形数据
        this.tableData.forEach(node => {
          nodes.push({
            id: node.id,
            label: node.nodeName,
            nodeType: node.nodeType,
            x: node.x || 0,
            y: node.y || 0,
            description: node.description
          });
          
          // 添加边数据
          if (node.nextNodeId) {
            edges.push({
              source: node.id,
              target: node.nextNodeId,
              id: `edge-${node.id}-${node.nextNodeId}`
            });
          }
        });
        
        this.graphData = { nodes, edges };
        
        // 更新图形
        if (this.graph) {
          this.graph.data(this.graphData);
          this.graph.render();
        }
      },
      
      addNode() {
        this.currentNode = {
          id: Date.now().toString(),
          nodeName: '',
          nodeType: 'process',
          description: '',
          prevNodeId: null,
          nextNodeId: null,
          x: 300,
          y: 200
        };
        this.currentEditIndex = -1;
        this.dialogVisible = true;
      },
      
      handleEdit(index, row) {
        this.currentNode = JSON.parse(JSON.stringify(row));
        this.currentEditIndex = index;
        this.dialogVisible = true;
      },
      
      handleDelete(index, row) {
        this.$confirm('确认删除此节点吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 更新引用此节点的关联
          this.tableData.forEach(node => {
            if (node.prevNodeId === row.id) {
              node.prevNodeId = null;
            }
            if (node.nextNodeId === row.id) {
              node.nextNodeId = null;
            }
          });
          
          // 删除节点
          this.tableData.splice(index, 1);
          this.updateGraphData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {});
      },
      
      saveNode() {
        if (!this.currentNode.nodeName) {
          this.$message.error('节点名称不能为空');
          return;
        }
        
        if (this.currentEditIndex >= 0) {
          // 更新现有节点
          this.tableData.splice(this.currentEditIndex, 1, { ...this.currentNode });
        } else {
          // 添加新节点
          this.tableData.push({ ...this.currentNode });
        }
        
        this.dialogVisible = false;
        this.updateGraphData();
      },
      
      getPossibleNodes(currentId) {
        return this.tableData.filter(node => node.id !== currentId);
      },
      
      handlePrevNodeChange(row, prevNodeId) {
        // 找到前一个节点的数据
        const prevNode = this.tableData.find(node => node.id === prevNodeId);
        
        // 如果前节点存在且其后置节点不是当前节点
        if (prevNode) {
          prevNode.nextNodeId = row.id;
        }
        
        // 如果清空了前置节点
        if (!prevNodeId) {
          // 找到原先的前置节点并清除其关联
          const oldPrevNode = this.tableData.find(node => node.nextNodeId === row.id);
          if (oldPrevNode && oldPrevNode.id !== prevNodeId) {
            oldPrevNode.nextNodeId = null;
          }
        }
        
        this.updateGraphData();
      },
      
      handleNextNodeChange(row, nextNodeId) {
        // 找到后一个节点的数据
        const nextNode = this.tableData.find(node => node.id === nextNodeId);
        
        // 如果后节点存在且其前置节点不是当前节点
        if (nextNode) {
          nextNode.prevNodeId = row.id;
        }
        
        // 如果清空了后置节点
        if (!nextNodeId) {
          // 找到原先的后置节点并清除其关联
          const oldNextNode = this.tableData.find(node => node.prevNodeId === row.id);
          if (oldNextNode && oldNextNode.id !== nextNodeId) {
            oldNextNode.prevNodeId = null;
          }
        }
        
        this.updateGraphData();
      },
      
      handleRowClick(row) {
        // 高亮显示对应的图形节点
        const nodes = this.graph.getNodes();
        const targetNode = nodes.find(node => node.get('model').id === row.id);
        
        if (targetNode) {
          // 先清除所有高亮状态
          nodes.forEach(node => {
            this.graph.setItemState(node, 'hover', false);
          });
          
          // 设置当前节点高亮
          this.graph.setItemState(targetNode, 'hover', true);
          
          // 2秒后取消高亮
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.graph.setItemState(targetNode, 'hover', false);
          }, 2000);
        }
      },
      
      saveNodePosition(node) {
        // 模拟API调用，更新节点位置
        // 实际应用中应替换为真实API调用
        console.log('保存节点位置:', node.id, node.x, node.y);
        
        // 实际API调用示例:
        /*
        axios.put(`/api/process-flow/nodes/${node.id}/position`, {
          x: node.x,
          y: node.y
        }).then(() => {
          this.$message.success('节点位置已保存');
        }).catch(err => {
          this.$message.error('保存节点位置失败');
          console.error(err);
        });
        */
      },
      
      saveProcessData() {
        // 模拟API调用，保存整个流程数据
        // 实际应用中应替换为真实API调用
        const processData = {
          nodes: this.tableData
        };
        
        console.log('保存流程数据:', processData);
        
        // 实际API调用示例:
        /*
        axios.put('/api/process-flow', processData)
          .then(() => {
            this.$message.success('流程数据保存成功');
          })
          .catch(err => {
            this.$message.error('流程数据保存失败');
            console.error(err);
          });
        */
        
        this.$message.success('流程数据保存成功');
      },
      
      refreshData() {
        this.fetchData();
        this.$message.success('数据已刷新');
      },
      
      resizeHandler() {
        if (this.graph) {
          const container = this.$refs.graphContainer;
          this.graph.changeSize(container.clientWidth, 500);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .process-flow {
    padding: 20px;
    background: #f5f7fa;
    min-height: 100vh;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .table-container {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .table-buttons {
    margin-top: 15px;
    text-align: right;
  }
  
  .graph-container {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  
  .graph {
    width: 100%;
    height: 500px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }
  
  /* 自定义tooltip样式，全局应用 */
  .g6-tooltip {
    border-radius: 4px;
    font-size: 12px;
    color: #333;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  .g6-tooltip h4 {
    margin: 0 0 5px;
    font-size: 14px;
  }
  
  .g6-tooltip p {
    margin: 5px 0;
  }
  </style>
  