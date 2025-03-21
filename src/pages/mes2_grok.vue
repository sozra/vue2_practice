<template>
  <div>
    <!-- 表格部分 -->
    <el-table :data="nodes" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="label" label="标签" width="200">
        <template slot-scope="scope">
          <el-input v-model="scope.row.label" placeholder="输入标签" />
        </template>
      </el-table-column>
      <el-table-column prop="prev" label="前一个节点" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.prev" placeholder="选择前节点" clearable>
            <el-option
              v-for="node in nodes"
              :key="node.id"
              :label="node.label"
              :value="node.id"
              :disabled="node.id === scope.row.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="next" label="后一个节点" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.next" placeholder="选择后节点" clearable>
            <el-option
              v-for="node in nodes"
              :key="node.id"
              :label="node.label"
              :value="node.id"
              :disabled="node.id === scope.row.id"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="deleteNode(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" style="margin-top: 10px" @click="addNode">新增节点</el-button>

    <!-- 节点图部分 -->
    <div id="mountNode" style="width: 100%; height: 600px; border: 1px solid #ddd; margin-top: 20px"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6';

export default {
  data() {
    return {
      nodes: [], // 存储节点数据
      graph: null, // G6 图表实例
    };
  },
  watch: {
    nodes: {
      handler(newNodes) {
        this.updateGraph(newNodes); // 节点数据变化时更新图表
      },
      deep: true,
    },
  },
  mounted() {
    this.initGraph(); // 初始化图表
    this.getDummyData(); // 加载假数据
  },
  methods: {
    // 初始化 G6 图表
    initGraph() {
      this.graph = new G6.Graph({
        container: 'mountNode',
        width: 800,
        height: 600,
        fitView: true,
        modes: {
          default: ['drag-canvas', 'drag-node'], // 支持画布和节点拖拽
        },
        defaultNode: {
          type: 'circle',
          size: 50,
          style: { fill: '#91d5ff', stroke: '#40a9ff' },
        },
        defaultEdge: {
          type: 'line',
          style: { stroke: '#666', endArrow: true },
        },
      });

      // 鼠标悬浮显示 tooltip
      this.graph.on('node:mouseenter', (e) => {
        const node = e.item;
        const model = node.getModel();
        this.graph.setItemState(node, 'hover', true);
        this.graph.updateItem(node, {
          label: `${model.label}\n${this.nodes.find(n => n.id === model.id).details}`,
        });
      });
      this.graph.on('node:mouseleave', (e) => {
        const node = e.item;
        const model = node.getModel();
        this.graph.setItemState(node, 'hover', false);
        this.graph.updateItem(node, { label: model.label });
      });
    },

    // 更新图表
    updateGraph(nodes) {
      const edges = [];
      nodes.forEach((node) => {
        if (node.next) {
          edges.push({ source: node.id, target: node.next });
        }
      });
      const data = {
        nodes: nodes.map((node) => ({
          id: node.id,
          label: node.label,
          x: node.x,
          y: node.y,
        })),
        edges,
      };
      this.graph.data(data);
      this.graph.render();
    },

    // 获取假数据
    getDummyData() {
      const dummyData = {
        nodes: [
          {
            id: 'node1',
            label: '节点1',
            x: 100,
            y: 100,
            prev: null,
            next: 'node2',
            details: '详细信息1',
          },
          {
            id: 'node2',
            label: '节点2',
            x: 200,
            y: 200,
            prev: 'node1',
            next: null,
            details: '详细信息2',
          },
        ],
      };
      this.nodes = dummyData.nodes;
    },

    // 新增节点
    addNode() {
      const newNode = {
        id: `node${this.nodes.length + 1}`,
        label: `节点${this.nodes.length + 1}`,
        x: Math.random() * 700 + 50,
        y: Math.random() * 500 + 50,
        prev: null,
        next: null,
        details: `详细信息${this.nodes.length + 1}`,
      };
      this.nodes.push(newNode);
    },

    // 删除节点
    deleteNode(id) {
      this.nodes = this.nodes.filter((node) => node.id !== id);
      this.nodes.forEach((node) => {
        if (node.prev === id) node.prev = null;
        if (node.next === id) node.next = null;
      });
    },
  },
};
</script>