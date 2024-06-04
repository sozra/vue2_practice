<template>
    <div class="process-flow">
      <svg :width="width" :height="height">
        <g v-for="(row, rowIndex) in rows" :key="rowIndex">
          <g v-for="(node, colIndex) in row" :key="node.name">
            <!-- Draw circles -->
            <circle
              :cx="node.x"
              :cy="node.y"
              :r="radius"
              :fill="node.color"
              @click="handleClick(node.name)"
            />
            <!-- Draw horizontal arrows -->
            <line
              v-if="colIndex < row.length - 1"
              :x1="node.x"
              :y1="node.y"
              :x2="row[colIndex + 1].x"
              :y2="row[colIndex + 1].y"
              stroke="blue"
              marker-end="url(#arrow)"
            />
            <!-- Draw vertical arrows -->
            <line
              v-if="rowIndex < rows.length - 1 && colIndex === row.length - 1"
              :x1="node.x"
              :y1="node.y"
              :x2="row[colIndex].x"
              :y2="rows[rowIndex + 1][0].y"
              stroke="blue"
              marker-end="url(#arrow)"
            />
            <!-- Text labels -->
            <text :x="node.x" :y="node.y - radius - 10" text-anchor="middle" fill="white">
              {{ node.name }}
            </text>
          </g>
        </g>
        <!-- Define arrow marker -->
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="blue" />
          </marker>
        </defs>
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        width: 800,
        height: 600,
        radius: 20,
        columns: 8, // 每行的圆形数量
        nodeDistance: 100, // 圆形之间的距离
        rows: [],
      };
    },
    methods: {
      createNodes() {
        const nodes = [
          { name: 'COP010', color: 'green' },
          { name: 'COP020', color: 'green' },
          { name: 'COP030', color: 'green' },
          { name: 'COP041', color: 'green' },
          { name: 'COP042', color: 'red' },
          { name: 'COP043', color: 'white' },
          { name: 'COP044', color: 'white' },
          { name: 'COP045', color: 'white' },
          { name: 'COP046', color: 'white' },
          { name: 'COP050', color: 'white' },
          { name: 'COP060', color: 'white' },
          { name: 'COP070', color: 'white' },
          { name: 'COP080', color: 'white' },
          { name: 'COP090', color: 'white' },
          // Add more nodes as needed
        ];
  
        const rows = [];
        for (let i = 0; i < nodes.length; i += this.columns) {
          rows.push(nodes.slice(i, i + this.columns));
        }
  
        // Set positions
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
          const row = rows[rowIndex];
          const direction = rowIndex % 2 === 0 ? 1 : -1; // Alternate direction
          for (let colIndex = 0; colIndex < row.length; colIndex++) {
            const node = row[colIndex];
            node.x = (direction === 1)
              ? colIndex * this.nodeDistance + this.radius
              : (row.length - 1 - colIndex) * this.nodeDistance + this.radius;
            node.y = rowIndex * this.nodeDistance + this.radius;
          }
        }
  
        return rows;
      },
      handleClick(nodeName) {
        console.log('Node clicked:', nodeName);
        // Add your custom logic here
      },
    },
    mounted() {
      this.rows = this.createNodes();
    },
  };
  </script>
  
  <style scoped>
  .process-flow {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: skyblue; /* Background color to match your example */
    padding: 20px;
  }
  </style>
  