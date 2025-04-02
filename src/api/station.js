import request from './request'; // 假设有基础封装

// 模拟 API 函数 (复用或单独定义)
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

// 模拟下拉选项数据
const mockDropdownOptions = {
    stationNames: [{value: 1, label: '装配站'}, {value: 2, label: '测试站'}, {value: 3, label: '包装站'}],
    stationTypes: [{value: 'A', label: '自动站'}, {value: 'M', label: '手动站'}],
    repairPoints: [{value: true, label: '是'}, {value: false, label: '否'}],
    defectPoints: [{value: true, label: '是'}, {value: false, label: '否'}],
    nodeOptions: [{value: 10, label: '节点10'}, {value: 20, label: '节点20'}, {value: 30, label: '节点30'}, {value: null, label: '无'}],
    projectOptions: [{value: 'P1', label: '项目A'}, {value: 'P2', label: '项目B'}],
    productOptions: [{value: 'PN-001', label: 'PN-001'}, {value: 'PN-002', label: 'PN-002'}],
    oldRouteOptions: [{value: 1, label: '旧工艺路线1'}, {value: 2, label: '旧工艺路线2'}],
};


export function getStations(routeId, params) {
  console.log(`API: getStations for route ${routeId}, params:`, params);
  // return request({ url: `/routes/${routeId}/stations`, method: 'get', params });
  const mockData = Array.from({ length: 5 }).map((_, i) => ({
      stationId: `${routeId}-S${i + 1}`,
      stationNameId: mockDropdownOptions.stationNames[i % mockDropdownOptions.stationNames.length].value, // 用于下拉选中
      stationName: mockDropdownOptions.stationNames[i % mockDropdownOptions.stationNames.length].label, // 显示用
      stationCode: `ST-${i + 1}`,
      stationTypeId: mockDropdownOptions.stationTypes[i % mockDropdownOptions.stationTypes.length].value,
      stationType: mockDropdownOptions.stationTypes[i % mockDropdownOptions.stationTypes.length].label,
      isRepairPoint: mockDropdownOptions.repairPoints[i % mockDropdownOptions.repairPoints.length].value,
      isDefectPoint: mockDropdownOptions.defectPoints[(i + 1) % mockDropdownOptions.defectPoints.length].value,
      prevNodeId: i > 0 ? mockDropdownOptions.nodeOptions[i-1].value : null,
      nextNodeId: mockDropdownOptions.nodeOptions[(i+1)%mockDropdownOptions.nodeOptions.length].value,
      nextNodeCheckId: i%2 === 0 ? mockDropdownOptions.nodeOptions[(i+2)%mockDropdownOptions.nodeOptions.length].value : null,
      nextNodeFailId: i%2 !== 0 ? mockDropdownOptions.nodeOptions[(i+3)%mockDropdownOptions.nodeOptions.length].value : null,
      sortOrder: (i + 1) * 10,
      creator: '李四',
      modifier: '王五',
      _originalData: null, // 用于保存原始数据以检测更改
      _isEditing: false, // 用于标记行编辑状态 (可选)
      _isLoading: false // 用于标记行操作加载状态 (可选)
  }));
  // 保存原始数据副本，用于比较是否修改
  mockData.forEach(row => row._originalData = { ...row });
  return mockApi({ list: mockData, total: mockData.length }, true); // 假设无分页
}

// 获取下拉选项数据 (实际应用中可能需要单独的API)
export function getStationDropdownOptions() {
    console.log('API: getStationDropdownOptions');
    // return request({ url: '/stations/options', method: 'get' });
    return mockApi(mockDropdownOptions, true, 100); // 模拟快速返回
}
export function getCopySourceOptions() {
    console.log('API: getCopySourceOptions');
    // return request({ url: '/copy-stations/options', method: 'get' });
    return mockApi({
        projects: mockDropdownOptions.projectOptions,
        products: mockDropdownOptions.productOptions,
        routes: mockDropdownOptions.oldRouteOptions
    }, true, 100);
}


export function updateStation(stationId, data) {
  console.log(`API: updateStation, stationId: ${stationId}, data:`, data);
  // 清理掉内部状态字段再发送
  const payload = { ...data };
  delete payload._originalData;
  delete payload._isEditing;
  delete payload._isLoading;
  // return request({ url: `/stations/${stationId}`, method: 'put', data: payload });
  return mockApi({ stationId, ...payload }, true);
}

export function deleteStation(stationId) {
  console.log(`API: deleteStation, stationId: ${stationId}`);
  // return request({ url: `/stations/${stationId}`, method: 'delete' });
   return mockApi({ stationId }, true);
}

export function saveAllStations(routeId, changedStations) {
    console.log(`API: saveAllStations for route ${routeId}, data:`, changedStations);
    // 清理内部状态字段
    const payload = changedStations.map(station => {
        const cleanStation = { ...station };
        delete cleanStation._originalData;
        delete cleanStation._isEditing;
        delete cleanStation._isLoading;
        return cleanStation;
    });
    // return request({ url: `/routes/${routeId}/stations/batch-update`, method: 'post', data: payload });
    return mockApi({ updatedCount: payload.length }, true, 1000); // 模拟批量保存耗时
}

export function copyStations(data) {
    console.log('API: copyStations, data:', data);
    // return request({ url: '/stations/copy', method: 'post', data });
    return mockApi({ copiedCount: 5 }, true); // 模拟复制了5条
}

// 其他 API... (模块导入, 新工站, 复制工艺路线等)
export function importStationsFromModule(routeId, moduleId) {
    console.log(`API: importStationsFromModule for route ${routeId}, moduleId: ${moduleId}`);
    return mockApi({ importedCount: 3 }, true);
}
export function createNewStation(routeId, data) {
    console.log(`API: createNewStation for route ${routeId}, data:`, data);
    const newId = `${routeId}-S${Date.now() % 1000}`;
    return mockApi({ stationId: newId, ...data }, true);
}
// ... 其他类似