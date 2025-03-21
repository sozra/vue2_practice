import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '',
  timeout: 10000
});

// 请求拦截
api.interceptors.request.use(
  config => {
    // 可以在这里添加token等认证信息
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 统一错误处理
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// API方法
export const processApi = {
  // 获取工艺路线数据
  getProcessFlow() {
    return api.get('/api/process-flow');
  },
  
  // 保存工艺路线数据
  saveProcessFlow(data) {
    return api.put('/api/process-flow', data);
  },
  
  // 更新节点位置
  updateNodePosition(nodeId, position) {
    return api.put(`/api/process-flow/nodes/${nodeId}/position`, position);
  }
};

export default processApi;
