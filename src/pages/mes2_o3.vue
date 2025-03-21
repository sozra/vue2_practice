<template>
  <div class="report-page">
    <!-- 顶部工具栏：新增按钮 -->
    <el-button type="primary" @click="addRow">新增节点</el-button>
    <!-- 表格：每行对应一个工艺路线节点 -->
    <el-table :data="tableData" border style="width: 100%; margin-top: 10px">
      <!-- 节点名称 -->
      <el-table-column prop="name" label="节点名称">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入节点名称"
            @blur="handleNodeChange(scope.row)"
          ></el-input>
        </template>
      </el-table-column>

      <!-- 前置节点，数据下拉选择（排除自己） -->
      <el-table-column prop="prevNodeId" label="前置节点">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.prevNodeId"
            placeholder="请选择前置节点"
            @change="updateEdges"
          >
            <el-option
              v-for="item in getOtherNodes(scope.row.id)"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <!-- 后置节点 -->
      <el-table-column prop="nextNodeId" label="后置节点">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.nextNodeId"
            placeholder="请选择后置节点"
            @change="updateEdges"
          >
            <el-option
              v-for="item in getOtherNodes(scope.row.id)"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <!-- 操作列：删除节点 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="removeRow(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 节点图展示区域 -->
    <div
      ref="graphContainer"
      style="
        width: 100%;
        height: 600px;
        border: 1px solid #ccc;
        margin-top: 20px;
      "
    ></div>
  </div>
</template>
<script>
import G6 from "@antv/g6";
import axios from "axios";
// 按需引入
export default {
  data() {
    return {
      tableData: [],
      // 表格数据，每个元素对应一个节点
      //   { id, name, x, y, prevNodeId, nextNodeId },
      graph: null,
      // G6 实例
      tooltip: null,
      // 自定义 tooltip 节点
    };
  },
  mounted() {
    // 页面初始化：从 API 获取数据，然后初始化图形
    this.fetchData().then(() => {
      this.initGraph();
    });
  },
  methods: {
    // 通过 API 获取节点数据（示例中模拟数据）
    async fetchData() {
      // 实际项目中可使用：
    //   let res = await axios.get("/api/reportData");
      let res = {
        data: [
          {
            id: "1",
            name: "节点1",
            x: 100,
            y: 100,
            prevNodeId: null,
            nextNodeId: "2",
          },
          {
            id: "2",
            name: "节点2",
            x: 300,
            y: 100,
            prevNodeId: "1",
            nextNodeId: "3",
          },
          {
            id: "3",
            name: "节点3",
            x: 500,
            y: 100,
            prevNodeId: "2",
            nextNodeId: null,
          },
        ],
      };
      this.tableData = res.data;
    },
    // 初始化 G6 节点图
    initGraph() {
      const width = this.$refs.graphContainer.clientWidth;
      const height = this.$refs.graphContainer.clientHeight;
      this.graph = new G6.Graph({
        container: this.$refs.graphContainer,
        width,
        height,
        modes: {
          default: ["drag-node", "zoom-canvas"],
          // 支持拖拽和缩放
        },
        defaultNode: {
          type: "circle",
          size: 50,
          style: { fill: "#C6E5FF", stroke: "#5B8FF9" },
          labelCfg: { style: { fill: "#000", fontSize: 14 } },
        },
        defaultEdge: {
          type: "line",
          style: { stroke: "#F6BD16" },
          labelCfg: { autoRotate: true },
        },
      });
      // 根据 tableData 构造节点和边
      this.updateGraphData();
      // 节点拖拽结束时，更新对应数据并调用 API 更新坐标
      this.graph.on("node:dragend", (evt) => {
        const node = evt.item;
        const model = node.getModel();
        const record = this.tableData.find((item) => item.id === model.id);
        if (record) {
          record.x = model.x;
          record.y = model.y;
          // 调用 API 更新节点坐标，如：
          // axios.post('/api/updateNodePosition', { id: record.id, x: record.x, y: record.y });
          console.log("拖拽结束，更新节点位置:", record);
        }
      });
      // 节点鼠标悬停，显示 tooltip
      this.graph.on("node:mouseenter", (evt) => {
        const model = evt.item.getModel();
        // 根据表格数据生成 tooltip 内容
        const tooltipContent = `<div> <p><strong>${
          model.label
        }</strong></p> <p>ID: ${model.id}</p> <p>位置：(${Math.round(
          model.x
        )}, ${Math.round(model.y)})</p> </div>`;
        this.showTooltip(evt.canvasX, evt.canvasY, tooltipContent);
      });
      this.graph.on("node:mouseleave", () => {
        this.hideTooltip();
      });
    },
    // 根据 tableData 构建并更新图形中的节点和边
    updateGraphData() {
      if (!this.graph) return;
      // 构造节点数据
      const nodes = this.tableData.map((item) => ({
        id: item.id,
        label: item.name,
        x: item.x || 100,
        y: item.y || 100,
      }));
      // 构造边数据（例如：当前节点的 prevNodeId 指向当前节点；同时如果设置了 nextNodeId，也可画出该边）
      const edges = [];
      this.tableData.forEach((item) => {
        if (item.prevNodeId) {
          edges.push({ source: item.prevNodeId, target: item.id });
        }
        if (item.nextNodeId) {
          edges.push({ source: item.id, target: item.nextNodeId });
        }
      });
      this.graph.data({ nodes, edges });
      this.graph.render();
    },
    // 当表格中节点名称等变化时调用，更新图形
    handleNodeChange(row) {
      // 更新图中的节点 label
      const nodeItem = this.graph.findById(row.id);
      if (nodeItem) {
        this.graph.updateItem(nodeItem, { label: row.name });
      }
      // 同时调用 API 保存节点的其他变化
      // axios.post('/api/updateNode', row);
      console.log("更新节点信息:", row);
    },
    // 返回除自身外的其他节点（用于下拉选项）
    getOtherNodes(selfId) {
      return this.tableData.filter((item) => item.id !== selfId);
    },
    // 当前置/后置下拉选项变化时更新边结构
    updateEdges() {
      this.updateGraphData();
      // 可调用 API 更新边变化
      // axios.post('/api/updateEdges', this.tableData);
      console.log("更新节点连线，当前数据:", this.tableData);
    },
    // 新增一个节点（新增一行，并在图形上显示）
    addRow() {
      const newId = String(Date.now());
      const newNode = {
        id: newId,
        name: "新节点",
        x: Math.random() * 400 + 50,
        y: Math.random() * 300 + 50,
        prevNodeId: null,
        nextNodeId: null,
      };
      this.tableData.push(newNode);
      this.updateGraphData();
      // axios.post('/api/addNode', newNode);
      console.log("新增节点:", newNode);
    },
    // 删除节点（表格和图形同时删除）
    removeRow(id) {
      this.tableData = this.tableData.filter((item) => item.id !== id);
      this.updateGraphData();
      // axios.post('/api/removeNode', { id });
      console.log("删除节点，id:", id);
    },
    // 简单实现 tooltip：在页面中创建一个 div，相对于鼠标坐标显示
    showTooltip(x, y, content) {
      if (!this.tooltip) {
        this.tooltip = document.createElement("div");
        Object.assign(this.tooltip.style, {
          position: "absolute",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "4px",
          pointerEvents: "none",
          zIndex: 1000,
        });
        document.body.appendChild(this.tooltip);
      }
      this.tooltip.innerHTML = content;
      this.tooltip.style.display = "block";
      this.tooltip.style.left = x + 10 + "px";
      this.tooltip.style.top = y + 10 + "px";
    },
    hideTooltip() {
      if (this.tooltip) {
        this.tooltip.style.display = "none";
      }
    },
  },
  watch: {
    // 当表格数据有修改时刷新图形（这里加了 deep watch，可以视情况优化）
    tableData: {
      handler() {
        this.updateGraphData();
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.report-page {
  padding: 20px;
}
</style>
