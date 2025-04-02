import axios from 'axios';
import { Message } from 'element-ui'; // 假设使用 Element UI 的消息提示

const service = axios.create({
  baseURL: '/api', // 配置基础 URL, 通过 vue.config.js 配置代理
  timeout: 10000, // 请求超时时间
});

// 请求拦截器 (可选)
service.interceptors.request.use(
  config => {
    // 比如添加 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token;
    // }
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器 (可选)
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 根据后端接口规范判断成功/失败
    if (res.code !== 200 && res.code !== 0) { // 假设 200 或 0 是成功码
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
      // 可以根据具体错误码做进一步处理
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res; // 返回 data 部分或者整个 response 根据需要
    }
  },
  error => {
    console.error('Response Error:', error);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;