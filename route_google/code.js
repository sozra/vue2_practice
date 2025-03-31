// src/api/processRoute.js
import request from '@/utils/request'; // 假设你有一个封装好的axios实例

export function getProcessRoutes(params) {
  console.log('API: getProcessRoutes called with params:', params);
  // return request({ url: '/api/process-routes', method: 'get', params });
  // --- 模拟数据 ---
  return Promise.resolve({
    code: 200,
    msg: '查询成功',
    data: {
      total: 3,
      list: [
        { id: 1, projectName: '项目A', productCode: 'PN-001', section: 'SMT', routeName: '路线A', prevRoute: '', line: 'Line1', type: '标准', status: '设计中', modifier: '张三', modifyTime: '2023-10-26 10:00:00' },
        { id: 2, projectName: '项目B', productCode: 'PN-002', section: 'DIP', routeName: '路线B', prevRoute: '路线A', line: 'Line2', type: '返工', status: '已完成', modifier: '李四', modifyTime: '2023-10-25 15:30:00' },
        { id: 3, projectName: '项目A', productCode: 'PN-003', section: '测试', routeName: '路线C', prevRoute: '路线B', line: 'Line1', type: '标准', status: '已取消', modifier: '王五', modifyTime: '2023-10-24 09:00:00' },
      ]
    }
  });
  // --- /模拟数据 ---
}

export function createProcessRoute(data) {
  console.log('API: createProcessRoute called with data:', data);
  // return request({ url: '/api/process-routes', method: 'post', data });
  return Promise.resolve({ code: 200, msg: '新增成功', data: { id: Date.now(), ...data } }); // 模拟返回新ID
}

export function updateProcessRoute(id, data) {
  console.log(`API: updateProcessRoute called for id ${id} with data:`, data);
  // return request({ url: `/api/process-routes/${id}`, method: 'put', data });
  return Promise.resolve({ code: 200, msg: '更新成功' });
}

export function deleteProcessRoute(id) {
  console.log(`API: deleteProcessRoute called for id ${id}`);
  // return request({ url: `/api/process-routes/${id}`, method: 'delete' });
  return Promise.resolve({ code: 200, msg: '删除成功' });
}

export function validateProcessRoute() {
  console.log('API: validateProcessRoute called');
  // return request({ url: '/api/process-routes/validate', method: 'post' });
   const success = Math.random() > 0.5;
   return Promise.resolve({ code: success ? 200 : 500, msg: success ? '校验成功' : '校验失败，存在问题' });
}

export function cancelProcessRouteDesign(id) {
    console.log(`API: cancelProcessRouteDesign called for id ${id}`);
    // return request({ url: `/api/process-routes/${id}/cancel`, method: 'post' });
    return Promise.resolve({ code: 200, msg: '取消设计成功' });
}

export function completeProcessRouteDesign(id) {
    console.log(`API: completeProcessRouteDesign called for id ${id}`);
    // return request({ url: `/api/process-routes/${id}/complete`, method: 'post' });
    return Promise.resolve({ code: 200, msg: '完成设计成功' });
}