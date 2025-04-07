/**
 * 工站相关API
 */

export default {
  /**
   * 获取工站列表
   * @param {String} routeId 工艺路线ID
   * @returns {Promise}
   */
  getStationList(routeId) {
    // return this.$http.axios.post('/api/station/list', { routeId }).catch(() => {
      // 如果API请求失败，使用mock数据
      return this.$http.getMockFile('stations.json');
    // });
  },

  /**
   * 新增工站
   * @param {Object} data 工站数据
   * @returns {Promise}
   */
  addStation(data) {
    return this.$http.axios.post('/api/station/add', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: { id: 'ST' + Date.now() } });
    });
  },

  /**
   * 更新工站
   * @param {Object} data 工站数据
   * @returns {Promise}
   */
  updateStation(data) {
    return this.$http.axios.post('/api/station/update', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 删除工站
   * @param {String} id 工站ID
   * @returns {Promise}
   */
  deleteStation(id) {
    return this.$http.axios.post('/api/station/delete', { id }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 复制工站
   * @param {Object} data 复制工站相关参数
   * @returns {Promise}
   */
  copyStation(data) {
    return this.$http.axios.post('/api/station/copy', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 批量复制工站
   * @param {Object} data 批量复制工站相关参数
   * @returns {Promise}
   */
  batchCopyStation(data) {
    return this.$http.axios.post('/api/station/batchCopy', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 导入工站模块
   * @param {Object} data 导入工站相关参数
   * @returns {Promise}
   */
  importStationModule(data) {
    return this.$http.axios.post('/api/station/importModule', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 保存工站列表
   * @param {Array} stationList 工站列表
   * @returns {Promise}
   */
  saveStationList(stationList) {
    return this.$http.axios.post('/api/station/saveList', { stationList }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  }
}; 