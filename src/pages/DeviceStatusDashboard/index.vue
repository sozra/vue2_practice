<template>
  <div class="device-status-dashboard">
    <div class="dashboard-container">
      <div class="nav-tabs">
        <div 
          v-for="(tab, index) in tabs" 
          :key="index" 
          class="nav-tab" 
          :class="{ active: activeTab === index }"
          @click="changeTab(index)"
        >
          {{ tab.name }}
        </div>
      </div>
      
      <div class="device-grid-container">
        <div 
          v-for="(device, index) in deviceList" 
          :key="index"
          class="device-card"
          :class="getStatusClass(device.status)"
        >
          <div class="device-name">{{ device.name }}</div>
          <div class="device-status">状态: {{ getStatusText(device.status) }}</div>
          <div class="device-details">
            <div>ID: {{ device.id }}</div>
            <div>类型: {{ device.type }}</div>
            <div>更新时间: {{ formatTime(device.updateTime) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceStatusDashboard',
  data() {
    return {
      activeTab: 0,
      tabs: [
        { name: '全部设备', type: 'all' },
        { name: '生产设备', type: 'production' },
        { name: '测试设备', type: 'testing' }
      ],
      deviceList: [],
      timer: null
    }
  },
  created() {
    this.fetchData();
    // 每10分钟自动刷新数据
    this.timer = setInterval(() => {
      this.fetchData();
    }, 10 * 60 * 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    changeTab(index) {
      this.activeTab = index;
      this.fetchData();
    },
    fetchData() {
      // 模拟API调用，获取设备状态数据
      const type = this.tabs[this.activeTab].type;
      this.deviceList = this.getMockData(type);
    },
    getMockData(type) {
      // 生成模拟数据
      const statuses = ['normal', 'warning', 'error', 'offline'];
      const deviceTypes = ['生产线', '检测仪', '包装机', '监控器', '传感器'];
      const mockData = [];
      
      const count = 30 + Math.floor(Math.random() * 20); // 生成30-50个设备数据
      
      for (let i = 0; i < count; i++) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
        
        const device = {
          id: `DEV-${10000 + i}`,
          name: `${deviceType}-${i+1}`,
          type: deviceType,
          status: status,
          updateTime: new Date().getTime() - Math.floor(Math.random() * 60 * 60 * 1000)
        };
        
        if (type === 'all' || 
           (type === 'production' && (deviceType === '生产线' || deviceType === '包装机')) ||
           (type === 'testing' && (deviceType === '检测仪' || deviceType === '监控器' || deviceType === '传感器'))) {
          mockData.push(device);
        }
      }
      
      return mockData;
    },
    getStatusClass(status) {
      return {
        'status-normal': status === 'normal',
        'status-warning': status === 'warning',
        'status-error': status === 'error',
        'status-offline': status === 'offline'
      };
    },
    getStatusText(status) {
      const statusMap = {
        'normal': '正常',
        'warning': '警告',
        'error': '错误',
        'offline': '离线'
      };
      return statusMap[status] || '未知';
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
  }
}
</script>

<style scoped>
.device-status-dashboard {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.nav-tabs {
  display: flex;
  border-bottom: 1px solid #e4e7ed;
  background-color: #f5f7fa;
}

.nav-tab {
  padding: 16px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-tab:hover {
  color: #409eff;
}

.nav-tab.active {
  color: #409eff;
  border-bottom: 2px solid #409eff;
}

.device-grid-container {
  flex: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  overflow-x: auto;
}

.device-card {
  border-radius: 4px;
  padding: 15px;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

.device-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.device-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.device-status {
  margin-bottom: 10px;
  font-weight: bold;
}

.device-details {
  font-size: 14px;
  color: #606266;
}

.status-normal {
  background-color: #f0f9eb;
  border: 1px solid #e1f3d8;
  color: #67c23a;
}

.status-warning {
  background-color: #fdf6ec;
  border: 1px solid #faecd8;
  color: #e6a23c;
}

.status-error {
  background-color: #fef0f0;
  border: 1px solid #fde2e2;
  color: #f56c6c;
}

.status-offline {
  background-color: #f4f4f5;
  border: 1px solid #e9e9eb;
  color: #909399;
}
</style> 