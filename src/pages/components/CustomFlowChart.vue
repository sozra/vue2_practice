<!-- CustomFlowChart.vue -->
<template>
  <div ref="mountNode" class="flow-chart-container"></div>
</template>

<script>
import G6 from '@antv/g6'
import dagre from 'dagre'

export default {
  name: 'CustomFlowChart',
  props: {
    width: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 800
    },
    graphData: {
      type: Object,
      default: () => ({
        nodes: [
          {
            id: "1",
            label: "请求回放1（开始）",
            type: "begin"
          },
          {
            id: "2",
            label: "交易创建"
          },
          {
            id: "3",
            label: "请求回放3"
          },
          {
            id: "4",
            label: "请求回放4"
          },
          {
            id: "5",
            label: "请求回放5"
          },
          {
            id: "6",
            label: "请求回放6"
          },
          {
            id: "7",
            label: "请求回放2（结束）",
            type: "end"
          }
        ],
        edges: [
          { source: "1", target: "2" },
          { source: "1", target: "3" },
          { source: "2", target: "5" },
          { source: "5", target: "6" },
          { source: "6", target: "7" },
          { source: "3", target: "4" },
          { source: "4", target: "7" }
        ]
      })
    }
  },

  data() {
    return {
      graph: null,
      nodeExtraAttrs: {
        begin: {
          fill: "#9FD4FB"
        },
        end: {
          fill: "#C2E999"
        }
      }
    }
  },

  mounted() {
    this.initGraph()
  },

  beforeDestroy() {
    if (this.graph) {
      this.graph.destroy()
    }
  },

  methods: {
    initGraph() {
      // 注册自定义节点
      this.registerCustomNode()
      // 注册状态节点
      this.registerStatusNode()
      // 注册自定义边
      this.registerCustomEdge()

      // 使用dagre布局
      const layoutedData = this.handleDagreLayout()

      // 创建图实例
      this.graph = new G6.Graph({
        container: this.$refs.mountNode,
        width: this.width,
        height: this.height,
        modes: {
          default: ['drag-canvas']
        },
        defaultNode: {
          shape: 'node',
          labelCfg: {
            style: {
              fill: '#fff',
              fontSize: 14
            }
          }
        },
        defaultEdge: {
          shape: 'line-with-arrow'
        },
        edgeStyle: {
          default: {
            endArrow: true,
            lineWidth: 2,
            stroke: '#ccc'
          }
        }
      })

      // 渲染图
      this.graph.data(layoutedData)
      this.graph.render()

      // 绑定事件
      this.bindEvents()
    },

    registerCustomNode() {
      G6.registerNode('node', {
        drawShape: (cfg, group) => {
          // 创建容器
          const container = group.addGroup()
          
          // 绘制矩形背景
          const rect = container.addShape('rect', {
            attrs: {
              x: -75,
              y: -25,
              width: 150,
              height: 50,
              radius: 4,
              fill: '#FFD591',
              fillOpacity: 1,
              ...this.nodeExtraAttrs[cfg.type]
            }
          })

          // 添加文本
          container.addShape('text', {
            attrs: {
              text: cfg.label,
              x: 0, // 如果有图标，文本左移
              y: 0,
              fill: '#fff',
              fontSize: 14,
              textAlign: 'center',
              textBaseline: 'middle',
            }
          })

          // 如果状态为1，添加图标
          if (cfg.status === '1') {
            container.addShape('image', {
              attrs: {
                x: -60,  // 图标位置
                y: -12,  // 图标位置
                width: 24,  // 图标大小
                height: 24,  // 图标大小
                img: "/src/pages/components/tools-fill.png"
              }
            })
            // container.addShape('path', {
            //   attrs: {
            //     path: [
            //       ['M', 20, 0],
            //       ['M', 20.297, 24],
            //       ['c', -0.989, 0, -1.919, -0.385, -2.618, -1.084],
            //       ['l', -8.9, -8.811],
            //       ['c', -0.401, -0.401, -0.945, -0.608, -1.515, -0.561],
            //       ['c', -1.973, 0.15, -3.888, -0.558, -5.282, -1.952],
            //       ['c', -1.278, -1.278, -1.982, -2.968, -1.982, -4.76],
            //       ['c', 0, -1.324, 0.451, -2.87, 0.9, -3.708],
            //       ['l', 3.085, 3.085],
            //       ['l', 5.557, -5.551],
            //       ['c', 2.599, 1.284, 4.129, 3.888, 3.912, 6.693],
            //       ['c', -0.043, 0.563, 0.161, 1.116, 0.562, 1.516],
            //       ['l', 8.899, 8.811],
            //       ['c', 0.7, 0.7, 1.084, 1.63, 1.084, 2.619],
            //       ['c', 0.001, 2.042, -1.66, 3.703, -3.702, 3.703],
            //     ],
            //     fill: '#fff',
            //     scale: 0.6,
            //     translate: [0, 0]
            //   }
            // })
          //   container.addShape('text', {
          //   attrs: {
          //     text: '--test--',
          //     x: 50, // 如果有图标，文本左移
          //     y: 0,
          //     fill: '#fff',
          //     fontSize: 14,
          //     textAlign: 'center',
          //     textBaseline: 'middle',
          //   }
          // })
          }

          return rect
        },
        setState: (name, value, item) => {
          const group = item.getContainer()
          const shape = group.get('children')[0]

          if (name === 'selected') {
            shape.attr('fill', value ? '#F6C277' : '#FFD591')
          }
        },
        getAnchorPoints: () => [[0, 0.5], [1, 0.5]]
      }, 'single-shape')
    },

    registerStatusNode() {
      G6.registerNode('statusNode', {
        drawShape: (cfg, group) => {
          const circle = group.addShape('circle', {
            attrs: {
              x: 0,
              y: 0,
              r: 6,
              fill: cfg.active ? '#AB83E4' : '#ccc'
            }
          })
          return circle
        }
      }, 'single-shape')
    },

    registerCustomEdge() {
      G6.registerEdge('line-with-arrow', {
        itemType: 'edge',
        draw: (cfg, group) => {
          const { startPoint, endPoint } = cfg
          const centerPoint = {
            x: (startPoint.x + endPoint.x) / 2,
            y: (startPoint.y + endPoint.y) / 2
          }
          const controlPoint = {
            x: (startPoint.x + centerPoint.x) / 2,
            y: startPoint.y
          }

          const path = group.addShape('path', {
            attrs: {
              path: [
                ['M', startPoint.x, startPoint.y],
                ['Q', controlPoint.x + 8, controlPoint.y, centerPoint.x, centerPoint.y],
                ['T', endPoint.x - 8, endPoint.y],
                ['L', endPoint.x, endPoint.y]
              ],
              stroke: '#ccc',
              lineWidth: 1.6,
              endArrow: {
                path: 'M 4,0 L -4,-4 L -4,4 Z',
                d: 4
              }
            }
          })

          return path
        }
      })
    },

    handleDagreLayout() {
      const g = new dagre.graphlib.Graph()
      g.setDefaultEdgeLabel(() => ({}))
      g.setGraph({ rankdir: 'LR' })

      const data = JSON.parse(JSON.stringify(this.graphData))
      const nodeMap = {}

      // 创建节点映射
      data.nodes.forEach(node => {
        nodeMap[node.id] = node
        g.setNode(node.id + '', { width: 150, height: 50 })
      })

      // 设置边
      data.edges.forEach(edge => {
        const sourceId = edge.source + ''
        const targetId = edge.target + ''
        edge.source = sourceId
        edge.target = targetId
        g.setEdge(sourceId, targetId)
      })

      // 执行布局
      dagre.layout(g)

      // 更新节点位置
      g.nodes().forEach(nodeId => {
        const node = nodeMap[nodeId]
        if (node) {
          const coord = g.node(nodeId)
          node.x = coord.x
          node.y = coord.y
        }
      })

      // 更新边的位置
      data.edges.forEach(edge => {
        const edgeObj = g.edge(edge.source, edge.target)
        if (edgeObj && edgeObj.points) {
          edge.startPoint = edgeObj.points[0]
          edge.endPoint = edgeObj.points[edgeObj.points.length - 1]
          edge.controlPoints = edgeObj.points.slice(1, edgeObj.points.length - 1)
        }
      })

      return data
    },

    bindEvents() {
      this.graph.on('node:click', (evt) => {
        const node = evt.item
        const model = node.getModel()
        this.$emit('node-click', model)
      })
    }
  },

  watch: {
    graphData: {
      handler() {
        if (this.graph) {
          const layoutedData = this.handleDagreLayout()
          this.graph.changeData(layoutedData)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.flow-chart-container {
  position: relative;
}
</style>