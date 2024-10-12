<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  name: "GraphComponent",
  data() {
    return {
      graph: null,
      data: {
        nodes: [
          { id: "0", label: "115C0E2DFC" },
          { id: "1", label: "A35A1F8C55" },
          { id: "2", label: "718BCCE25E" },
          { id: "3", label: "689EA61A25" },
          { id: "4", label: "FC803205EB" },
          { id: "5", label: "D9118948BA" },
          { id: "6", label: "03EC8FC4A8" },
          { id: "7", label: "91D7FDA083" },
          { id: "8", label: "55985DF339" },
          { id: "9", label: "5336E85E1D" },
          { id: "10", label: "5AD2F62BE6" },
          { id: "11", label: "E3D2C4CE1F" },
          { id: "12", label: "0A4D0085D2" },
          { id: "13", label: "3B60F66F41" },
          { id: "14", label: "3DA144E2CE" },
          { id: "15", label: "1D5BFACC5B" },
        ],
        edges: [
          { source: "0", target: "1" },
          { source: "0", target: "2" },
          { source: "0", target: "3" },
          { source: "0", target: "4" },
          { source: "0", target: "5" },
          { source: "0", target: "7" },
          { source: "0", target: "8" },
          { source: "0", target: "9" },
          { source: "0", target: "10" },
          { source: "0", target: "11" },
          { source: "0", target: "13" },
          { source: "0", target: "14" },
          { source: "0", target: "15" },
          { source: "2", target: "3" },
          { source: "4", target: "5" },
          { source: "4", target: "6" },
          { source: "5", target: "6" },
          { source: "7", target: "13" },
          { source: "8", target: "14" },
          { source: "9", target: "10" },
          { source: "10", target: "14" },
          { source: "10", target: "12" },
          { source: "11", target: "14" },
          { source: "12", target: "13" },
        ],
      },
    };
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
      const container = this.$el;
      const width = container.scrollWidth;
      const height = container.scrollHeight || 1000;

      G6.registerLayout("snakeLayout", {
        execute() {
          const nodes = this.nodes;
          const edges = this.edges;
          const width = this.width;
          const height = this.height;

          let x = 0;
          let y = 0;
          let direction = 1; // 1 for right, -1 for left
          const nodeHeight = 50; // 假设所有节点高度相同
          const nodeWidth = 100; // 假设所有节点宽度相同
          const horizontalGap = 20;
          const verticalGap = 50;

          nodes.forEach((node, i) => {
            if (x + nodeWidth > width || x < 0) {
              // 需要换行
              y += nodeHeight + verticalGap;
              direction *= -1; // 改变方向
              x = direction > 0 ? 0 : width - nodeWidth;
            }

            node.x = x;
            node.y = y;

            x += direction * (nodeWidth + horizontalGap);
          });

          // 处理边的逻辑...
        },
      });

      this.graph = new G6.Graph({
        container: container,
        width,
        height,
        fitView: true,
        modes: {
          default: ["drag-canvas", "drag-node"],
        },
        layout: {
          type: "snakeLayout",
          rankdir: "LR",
          align: "DL",
          nodesepFunc: () => 1,
          ranksepFunc: () => 1,
        },
        animate: true,
        defaultNode: {
          size: [30, 20],
          shape: "rect",
          style: {
            lineWidth: 2,
            stroke: "#5B8FF9",
            fill: "#C6E5FF",
          },
          labelCfg: {
            position: 'bottom',
            offset: 5,
          },
        },
        defaultEdge: {
          size: 1,
          color: "#e2e2e2",
          style: {
            endArrow: {
              path: "M 4,0 L -4,-4 L -4,4 Z",
              d: 4,
            },
          },
        },
      });

      this.graph.data(this.data);
      this.graph.render();
    },
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
