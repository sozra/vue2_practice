<template>
    <div class="process-route-editor-mvp">
      <h1>工艺路线维护 (MVP Demo)</h1>
  
      <!-- Controls -->
      <el-row :gutter="10" style="margin-bottom: 15px;">
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" @click="addNode" size="small">新增节点</el-button>
        </el-col>
         <el-col :span="4">
          <el-button type="success" icon="el-icon-check" @click="handleSave" size="small" :loading="isSaving">保存(Mock)</el-button>
        </el-col>
         <el-col :span="16" style="text-align: right; color: #909399; font-size: 12px;">
             拖动图表中的节点可调整位置
         </el-col>
      </el-row>
  
      <!-- Table -->
      <el-card shadow="never" body-style="padding: 0;">
         <div slot="header">节点列表</div>
        <el-table :data="tableData" style="width: 100%" row-key="id" border size="medium" v-loading="isLoading">
          <el-table-column prop="id" label="节点ID" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column label="节点名称" width="180">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" size="small" placeholder="节点名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="描述信息">
             <template slot-scope="scope">
              <el-input v-model="scope.row.description" size="small" placeholder="描述"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="前置节点" width="220">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.prevNodeId"
                placeholder="选择前置节点"
                clearable
                filterable
                size="small"
                style="width: 100%;"
                @change="handleLinkChange(scope.row)"
              >
                <el-option
                  v-for="item in availableNodes(scope.row.id)"
                  :key="item.id"
                  :label="`${item.name} (${item.id.substring(0, 6)}...)`"
                  :value="item.id">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">{{ item.id.substring(0, 6) }}...</span>
                </el-option>
              </el-select>
            </template>
          </el-table-column>
           <el-table-column label="坐标 (调试用)" width="150">
             <template slot-scope="scope">
               <span style="font-size: 11px; color: #666;">
                   X: {{ scope.row.x ? scope.row.x.toFixed(0) : 'N/A' }}, Y: {{ scope.row.y ? scope.row.y.toFixed(0) : 'N/A' }}
               </span>
             </template>
           </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
             <template slot-scope="scope">
               <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteNode(scope.$index, scope.row)">删除</el-button>
             </template>
           </el-table-column>
        </el-table>
      </el-card>
  
      <!-- Graph Container -->
      <el-card shadow="never" style="margin-top: 20px;">
         <div slot="header">
             <span>工艺路线图</span>
         </div>
         <div ref="graphContainer" class="graph-container-mvp" v-loading="isLoading"></div>
      </el-card>
  
    </div>
  </template>
  
  <script>
  import G6 from '@antv/g6';
  // import { v4 as uuidv4 } from 'uuid';
  // Import the mock API functions
  import { mockFetchProcessRoute, mockSaveProcessRoute } from './mock-api.js'; // Adjust path if needed
  
  export default {
    name: 'ProcessRouteEditorMVP',
    data() {
      return {
        tableData: [], // Stores the node data: { id, name, description, prevNodeId, x, y }
        graph: null,
        isLoading: false,
        isSaving: false,
        currentRouteId: 'route-alpha-001' // Example route ID to load
      };
    },
    computed: {
      availableNodes() {
        // Returns a function that filters nodes, excluding the current one
        return (currentNodeId) => {
          return this.tableData.filter(node => node.id !== currentNodeId);
        };
      },
      graphDataForG6() {
        // Transforms tableData into the format G6 expects
        const nodes = this.tableData.map(row => ({
          id: row.id,
          label: row.name || `未命名`, // Node label text
          x: row.x,
          y: row.y,
          // Attach extra info for tooltip
          tooltipInfo: {
            id: row.id,
            name: row.name,
            description: row.description,
          },
          // Basic styling (can be enhanced)
          type: 'rect',
          size: [120, 40],
           style: { radius: 4, fill: '#f0faff', stroke: '#b3d8ff' },
           labelCfg: { style: { fontSize: 12 } }
        }));
  
        const edges = [];
        this.tableData.forEach(row => {
          // Create edge if prevNodeId is valid and exists in tableData
          if (row.prevNodeId && this.tableData.some(n => n.id === row.prevNodeId)) {
              edges.push({
                id: `edge-${row.prevNodeId}-${row.id}`, // Unique edge ID
                source: row.prevNodeId,
                target: row.id,
                // Basic edge styling
                style: {
                    stroke: '#ccc',
                    lineWidth: 1.5,
                    endArrow: { path: G6.Arrow.triangle(6, 8, 1), d: 1, fill: '#ccc' },
                }
              });
          }
        });
  
         // Remove duplicate edges just in case (though prevNodeId structure makes it less likely)
         const uniqueEdges = Array.from(new Map(edges.map(edge => [`${edge.source}-${edge.target}`, edge])).values());
  
        return { nodes, edges: uniqueEdges };
      }
    },
    watch: {
      // Watch the computed G6 data. When it changes, update the graph.
      graphDataForG6: {
        deep: true, // Important for detecting changes within objects/arrays
        handler(newVal, oldVal) {
            // Avoid updating during initial load or if graph not ready
          if (this.graph && !this.isLoading && newVal) {
            console.log('Graph data changed, calling graph.changeData()');
            // 使用一个简单的比较方法来检查数据是否变化
            if (newVal.nodes.length !== oldVal.nodes.length || 
                newVal.edges.length !== oldVal.edges.length) {
                this.graph.changeData(newVal);
            }
          }
        }
      }
    },
    mounted() {
      this.isLoading = true;
      mockFetchProcessRoute(this.currentRouteId) // Use the mock fetch function
          .then(response => {
              if (response.success && response.data && Array.isArray(response.data.nodes)) {
                   // Ensure coords are numbers or undefined
                   this.tableData = response.data.nodes.map(n => ({
                       ...n,
                       x: typeof n.x === 'number' ? n.x : undefined,
                       y: typeof n.y === 'number' ? n.y : undefined,
                   }));
              } else {
                  this.tableData = [];
                  this.$message.error('加载模拟数据格式错误');
              }
              // Initialize graph AFTER data is loaded
              this.initGraph();
          })
          .catch(err => {
              console.error("Mock fetch failed:", err);
              this.$message.error('加载模拟数据失败！');
              this.tableData = [];
          })
          .finally(() => {
              this.isLoading = false;
          });
    },
    beforeDestroy() {
        // Clean up G6 instance
        if (this.graph) {
            this.graph.destroy();
            this.graph = null;
            console.log("G6 Graph destroyed.");
        }
    },
    methods: {
      initGraph() {
        if (this.graph) {
            this.graph.destroy(); // Destroy existing instance if any
        }
        const container = this.$refs.graphContainer;
        if (!container) return;
  
        const width = container.clientWidth || 800;
        const height = container.clientHeight || 450;
  
        const tooltip = new G6.Tooltip({
            offsetX: 10, offsetY: 10, itemTypes: ['node'],
            getContent(e) {
                const model = e.item.getModel();
                const info = model.tooltipInfo || {};
                return `
                  <div style="background-color: rgba(0,0,0,0.7); color: white; padding: 8px 10px; border-radius: 4px; font-size: 12px; max-width: 250px;">
                    <strong>${info.name || 'N/A'}</strong><br>
                    ID: ${info.id}<br>
                    描述: ${info.description || '无'}
                  </div>`;
            },
            shouldBegin(e) { // Only show tooltip if node has tooltipInfo
                return !!e.item.getModel().tooltipInfo;
            }
        });
  
        this.graph = new G6.Graph({
          container: container,
          width, height,
          modes: { default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'click-select'] },
          defaultNode: { // These are defaults if not specified in graphDataForG6 nodes
            type: 'rect', size: [120, 40],
            style: { radius: 4, fill: '#f0faff', stroke: '#b3d8ff', lineWidth: 1 },
            labelCfg: { style: { fill: '#333', fontSize: 12 } }
          },
          defaultEdge: { // Default if not specified in graphDataForG6 edges
             type: 'polyline', // Use polyline for better routing
             style: {
                  radius: 10, offset: 30, // Polyline specific styles
                  stroke: '#ccc', lineWidth: 1.5,
                  endArrow: { path: G6.Arrow.triangle(6, 8, 1), d: 1, fill: '#ccc' },
             }
          },
          nodeStateStyles: { hover: { fill: '#d9ecff', stroke: '#5cadff' } },
          edgeStateStyles: { hover: { stroke: '#999', lineWidth: 2 } },
          plugins: [tooltip]
        });
  
        // --- Event Listeners ---
        this.graph.on('node:dragend', (e) => {
          const { item } = e;
          const model = item.getModel();
          const nodeInTable = this.tableData.find(n => n.id === model.id);
          if (nodeInTable) {
            // Use $set for reactivity, especially if x/y might not have existed initially
            this.$set(nodeInTable, 'x', model.x);
            this.$set(nodeInTable, 'y', model.y);
            console.log(`Node ${model.id} dragged to (${model.x.toFixed(0)}, ${model.y.toFixed(0)}). Updated tableData.`);
          }
        });
        this.graph.on('node:mouseenter', e => this.graph.setItemState(e.item, 'hover', true));
        this.graph.on('node:mouseleave', e => this.graph.setItemState(e.item, 'hover', false));
         this.graph.on('canvas:click', () => { // Clear selection on canvas click
             this.graph.getNodes().forEach(node => this.graph.setItemState(node, 'selected', false));
             this.graph.getEdges().forEach(edge => this.graph.setItemState(edge, 'selected', false));
         });
         this.graph.on('node:click', (e) => { // Highlight selected node and edges
              this.graph.getNodes().forEach(node => this.graph.setItemState(node, 'selected', false));
              this.graph.getEdges().forEach(edge => this.graph.setItemState(edge, 'selected', false));
              this.graph.setItemState(e.item, 'selected', true);
              e.item.getEdges().forEach(edge => this.graph.setItemState(edge, 'selected', true));
         });
  
        // --- Load Initial Data ---
        const initialGraphData = this.graphDataForG6;
        console.log('Initial data for G6:', initialGraphData);
        if (initialGraphData.nodes.length > 0) {
            this.graph.data(initialGraphData); // Load data
            this.graph.render(); // Render the graph
            this.graph.fitView(20); // Fit view to content with padding
             // Check if any node is missing position, if so apply layout (optional for MVP if data has coords)
            // const needsLayout = initialGraphData.nodes.some(n => n.x === undefined || n.y === undefined);
            // if(needsLayout) {
            //     console.log("Some nodes missing position, applying Dagre layout...");
            //     const layout = new G6.Layout['dagre']({ rankdir: 'LR', nodesep: 30, ranksep: 50 });
            //     layout.init(initialGraphData);
            //     layout.execute();
            //     this.graph.positionsAnimate(); // Animate to new positions
            //     this.updateTablePositionsFromGraph(); // Sync back layout coords
            // }
        } else {
            this.graph.render(); // Render empty canvas if no data
        }
         console.log("G6 Graph initialized.");
      },
  
      // Helper to sync G6 computed positions back to tableData
      updateTablePositionsFromGraph() {
          if (!this.graph) return;
          let updated = false;
          this.graph.getNodes().forEach(node => {
              const model = node.getModel();
              const tableNode = this.tableData.find(n => n.id === model.id);
              if (tableNode && (tableNode.x !== model.x || tableNode.y !== model.y)) {
                  this.$set(tableNode, 'x', model.x);
                  this.$set(tableNode, 'y', model.y);
                  updated = true;
              }
          });
          if (updated) {
              console.log('Synced positions from graph layout to tableData.');
          }
      },
  
      // --- Table Actions ---
      addNode() {
        // const newNodeId = uuidv4();
        const newNodeId = Math.random().toString(36).substring(2, 15);
        const canvasWidth = this.graph ? this.graph.getWidth() : 800;
        const canvasHeight = this.graph ? this.graph.getHeight() : 450;
  
        const newNode = {
          id: newNodeId,
          name: `新节点-${newNodeId.substring(0, 4)}`,
          description: '',
          prevNodeId: null,
          // Give it a random position within the canvas for initial placement
          x: Math.max(50, Math.random() * (canvasWidth - 150)), // Avoid edges
          y: Math.max(50, Math.random() * (canvasHeight - 100)),
        };
        this.tableData.push(newNode);
        this.$message.success(`已添加节点: ${newNode.name}`);
        // The watcher should trigger graph update.
        // If graph isn't updating immediately, force redraw (less ideal):
         this.$nextTick(() => {
             if (this.graph && this.graph.findById(newNodeId)) {
                  this.graph.focusItem(newNodeId, true); // Focus on the new node
             } else {
                 // If changeData didn't add it somehow (unlikely), force full data load
                 console.warn("New node not found in graph immediately, might force data reload.");
                 // this.graph.data(this.graphDataForG6); this.graph.render(); // Avoid if possible
             }
         });
      },
  
      deleteNode(index, row) {
         this.$confirm(`确定删除节点 "${row.name}"? 相关连接将断开。`, '确认删除', {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          }).then(() => {
              const nodeIdToDelete = row.id;
              // Remove from table data
              this.tableData.splice(index, 1);
              // Clear references in other nodes
              this.tableData.forEach(node => {
                  if (node.prevNodeId === nodeIdToDelete) {
                      node.prevNodeId = null;
                  }
              });
              this.$message.success(`节点 "${row.name}" 已删除`);
              // Watcher handles graph update
          }).catch(() => {
            this.$message.info('已取消删除');
          });
      },
  
      // Triggered when the 'prevNodeId' select value changes
      handleLinkChange(changedRow) {
          // v-model already updated tableData. Watcher will handle G6 update.
          console.log(`Link changed for node ${changedRow.id}, new prevNodeId: ${changedRow.prevNodeId}`);
          // We might want to manually trigger edge update if watcher is unreliable, but it should work.
          // Example: Manually find and update edge (more complex, rely on watcher first)
          // const edges = this.graph.getEdges(); ... find relevant edge and update ...
      },
  
      // --- Save Action ---
       handleSave() {
           this.isSaving = true;
           // Ensure latest positions are captured (if layout happened or nodes dragged)
           this.updateTablePositionsFromGraph();
  
           const dataToSave = {
               id: this.currentRouteId,
               name: "Saved Alpha Assembly Line", // Could be dynamic
               nodes: this.tableData.map(n => ({ // Prepare data for API format
                   id: n.id,
                   name: n.name,
                   description: n.description,
                   prevNodeId: n.prevNodeId,
                   x: n.x,
                   y: n.y,
               }))
           };
  
           mockSaveProcessRoute(dataToSave)
              .then(response => {
                  if (response.success) {
                      this.$message.success('模拟保存成功!');
                  } else {
                      this.$message.error('模拟保存失败!');
                  }
              })
              .catch(err => {
                  console.error("Mock save failed:", err);
                  this.$message.error('模拟保存出错!');
              })
              .finally(() => {
                  this.isSaving = false;
              });
       }
    }
  }
  </script>
  
  <style>
  .process-route-editor-mvp {
    padding: 20px;
    font-family: sans-serif;
  }
  
  .graph-container-mvp {
    width: 100%;
    height: 450px; /* Fixed height for MVP */
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    position: relative; /* Important for G6 Tooltip positioning */
    background-color: #fafafa; /* Light background for contrast */
  }
  
  /* Element UI tweaks if needed */
  .el-table .el-input input {
      /* Adjust if input looks off */
  }
  .el-table .el-select {
      width: 100%; /* Ensure select fills the cell */
  }
  
  /* Styling for selected items in G6 */
  .g6-component-tooltip { /* Default G6 tooltip class */
      background-color: rgba(0,0,0,0.75) !important;
      color: white !important;
      padding: 8px 10px !important;
      border-radius: 4px !important;
      font-size: 12px !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
      border: none !important;
      max-width: 250px;
  }
  
  /* Styles for selected state */
  .g6-node-selected {
       /* Add specific style overrides for selected nodes if needed */
       /* Example: Increase stroke width or change color */
      /* stroke: #ff4d4f !important; */
      /* lineWidth: 2 !important; */
  }
  .g6-edge-selected {
      /* Example: Increase stroke width or change color */
      /* stroke: #ff4d4f !important; */
      /* lineWidth: 2 !important; */
  }
  
  
  </style>