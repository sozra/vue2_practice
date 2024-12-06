<!-- App.vue -->
<template>
    <div class="app">
      <custom-flow-chart 
        :width="1000"
        :height="800"
        :graph-data="flowChartData"
        @node-click="handleNodeClick"

      />
      <el-dialog :visible.sync="dialogVisible" title="节点信息" >
        <span>{{ nodeInfo }}</span>
      </el-dialog>
      <el-button @click="dialogVisible = true">0soZra</el-button>
    </div>
  </template>   
  
  <script>
  import CustomFlowChart from './components/CustomFlowChart.vue'
  
  export default {
    name: 'App',
    components: {
      CustomFlowChart
    },
    
    data() {
      return {
        dialogVisible: false,
        nodeInfo: '',
        flowChartData: {
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
            label: "请求回放3",
          },
          {
            id: "4",
            label: "请求回放4",
            type: "begin",
          },
          {
            id: "5",
            label: "请求回放5",
            status: "1"
          },
          {
            id: "6",
            label: "请求回放6"
          },
        //   {
        //     id: "7",
        //     label: "请求回放2（结束）",
        //     type: "end"
        //   }
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
      }
      }
    },
  
    methods: {
      handleNodeClick(evt) {
        // 处理圆点点击事件
        console.log('Circle clicked', evt)
        this.dialogVisible = true
        this.nodeInfo = evt.label;
      }
    }
  }
  </script>
  
  <style>
  .app {
    padding: 20px;
  }
  </style>