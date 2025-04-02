import request from './request'; // 假设有基础封装

// 模拟 API - 实际应替换为真实请求
const mockApi = (data, success = true, delay = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        console.log('Mock API Success:', data);
        resolve({ code: 200, data: data, message: '操作成功' });
      } else {
        console.error('Mock API Error');
        reject({ code: 500, message: '操作失败' });
      }
    }, delay);
  });
};


export function getRouteList(params) {
  console.log('API: getRouteList, params:', params);
  // 实际请求: return request({ url: '/routes', method: 'get', params });
  // 模拟数据:
  const mockData = {
      list: Array.from({ length: params.pageSize || 10 }).map((_, i) => ({
          id: (params.page - 1) * (params.pageSize || 10) + i + 1,
          projectName: `项目 ${String.fromCharCode(65 + i)}`,
          productCode: `PN-00${i + 1}`,
          section: `工段 ${i % 3 + 1}`,
          routeName: `工艺路线 ${i + 1}`,
          prevRouteName: i > 0 ? `工艺路线 ${i}` : '-',
          line: `线体 ${i % 2 + 1}`,
          type: i % 2 === 0 ? '主路线' : '子路线',
          status: i % 3 === 0 ? '设计中' : (i % 3 === 1 ? '已完成' : '已取消'),
          modifier: '张三',
          modifyTime: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString().split('T')[0],
      })),
      total: 50 // 假设总共有50条数据
  };
  return mockApi({ list: mockData.list, total: mockData.total }, true);
  // return request({ url: '/routes', method: 'get', params });
}

export function createRoute(data) {
  console.log('API: createRoute, data:', data);
  // return request({ url: '/routes', method: 'post', data });
  return mockApi({ id: Date.now(), ...data }, true);
}

export function updateRoute(id, data) {
  console.log(`API: updateRoute, id: ${id}, data:`, data);
  // return request({ url: `/routes/${id}`, method: 'put', data });
   return mockApi({ id, ...data }, true);
}

export function deleteRoute(id) {
  console.log(`API: deleteRoute, id: ${id}`);
  // return request({ url: `/routes/${id}`, method: 'delete' });
  return mockApi({ id }, true);
}

export function validateRoute(data) { // 假设校验需要传一些数据
   console.log('API: validateRoute, data:', data);
   // return request({ url: '/routes/validate', method: 'post', data });
   const success = Math.random() > 0.3; // 模拟成功失败
   return mockApi({ valid: success, message: success ? '校验通过' : '校验失败，存在问题点 X' }, success);
}

// 其他可能的 API (取消, 完成设计等)
export function cancelRoute(id) {
  console.log(`API: cancelRoute, id: ${id}`);
  // return request({ url: `/routes/${id}/cancel`, method: 'post' });
  return mockApi({ id, status: '已取消' }, true);
}

export function completeRouteDesign(id) {
  console.log(`API: completeRouteDesign, id: ${id}`);
  // return request({ url: `/routes/${id}/complete`, method: 'post' });
  return mockApi({ id, status: '已完成' }, true);
}