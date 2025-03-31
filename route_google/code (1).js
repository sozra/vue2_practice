// src/api/processStation.js
import request from '@/utils/request'; // 假设你有一个封装好的axios实例

export function getStationsByRouteId(routeId, params) {
  console.log(`API: getStationsByRouteId called for routeId ${routeId} with params:`, params);
  // return request({ url: `/api/process-routes/${routeId}/stations`, method: 'get', params });
  // --- 模拟数据 ---
  return Promise.resolve({
      code: 200,
      msg: '查询成功',
      data: [
          { stationId: 101, stationName: '上料站', stationCode: 'LOAD01', stationType: '自动', repairPoint: '是', defectPoint: '否', prevNode: '', nextNode: '102', nextNodeCheck: '', nextNodeFail: '', sortOrder: 1, creator: '张三', modifier: '张三' },
          { stationId: 102, stationName: '贴片站', stationCode: 'SMT01', stationType: '自动', repairPoint: '否', defectPoint: '是', prevNode: '101', nextNode: '103', nextNodeCheck: '', nextNodeFail: 'REPAIR01', sortOrder: 2, creator: '张三', modifier: '李四' },
          { stationId: 103, stationName: '检测站', stationCode: 'AOI01', stationType: '检测', repairPoint: '否', defectPoint: '是', prevNode: '102', nextNode: '', nextNodeCheck: '', nextNodeFail: '', sortOrder: 3, creator: '张三', modifier: '王五' },
      ]
  });
  // --- /模拟数据 ---
}

// 注意：保存通常是批量操作，API设计可能需要一次性提交所有行的数据
export function saveStations(routeId, stationDataList) {
    console.log(`API: saveStations called for routeId ${routeId} with data:`, stationDataList);
    // return request({ url: `/api/process-routes/${routeId}/stations`, method: 'post', data: stationDataList }); // 或者 PUT
    return Promise.resolve({ code: 200, msg: '保存成功' });
}

export function deleteStation(routeId, stationId) {
    console.log(`API: deleteStation called for routeId ${routeId}, stationId ${stationId}`);
    // return request({ url: `/api/process-routes/${routeId}/stations/${stationId}`, method: 'delete' });
    return Promise.resolve({ code: 200, msg: '删除成功' });
}

// --- 用于下拉框选项的模拟 API ---
export function getStationOptions() {
    return Promise.resolve({ data: [{value: 'LOAD01', label: '上料站'}, {value: 'SMT01', label: '贴片站'}, {value: 'AOI01', label: '检测站'}] });
}
export function getStationTypeOptions() {
     return Promise.resolve({ data: [{value: '自动', label: '自动'}, {value: '手动', label: '手动'}, {value: '检测', label: '检测'}] });
}
// ... 其他下拉框选项的 API ...

export function copyStationFromRoute(data) {
    console.log('API: copyStationFromRoute called with data:', data);
    // return request({ url: '/api/stations/copy-from-route', method: 'post', data });
    return Promise.resolve({ code: 200, msg: '复制工站成功' });
}

// --- 模拟获取项目/产品/旧工艺路线的 API ---
export function getProjectOptions() {
     return Promise.resolve({ data: [{value: '项目A', label: '项目A'}, {value: '项目B', label: '项目B'}] });
}
export function getProductOptions(project) {
     console.log("Fetching products for project:", project);
     if (project === '项目A') {
         return Promise.resolve({ data: [{value: 'PN-001', label: 'PN-001'}, {value: 'PN-003', label: 'PN-003'}] });
     } else if (project === '项目B') {
         return Promise.resolve({ data: [{value: 'PN-002', label: 'PN-002'}] });
     }
     return Promise.resolve({ data: [] });
}
export function getOldRouteOptions(project, product) {
    console.log("Fetching routes for project:", project, "product:", product);
    if (project === '项目A' && product === 'PN-001') {
        return Promise.resolve({ data: [{value: '旧路线X', label: '旧路线X'}] });
    }
     return Promise.resolve({ data: [] });
}

// 其他按钮对应的 API ...
export function importStationsFromModule(routeId, moduleId) {
    console.log(`API: importStationsFromModule called for routeId ${routeId}, moduleId ${moduleId}`);
    return Promise.resolve({ code: 200, msg: '模块导入工站成功' });
}

export function copyCompleteProcessRoute(sourceRouteId, newRouteName) {
     console.log(`API: copyCompleteProcessRoute called from ${sourceRouteId} to ${newRouteName}`);
    return Promise.resolve({ code: 200, msg: '复制工艺路线成功' });
}

export function batchCopyProcessRoute(sourceRouteId, targetRouteIds) {
     console.log(`API: batchCopyProcessRoute called from ${sourceRouteId} to ${targetRouteIds}`);
    return Promise.resolve({ code: 200, msg: '批量复制工艺路线成功' });
}