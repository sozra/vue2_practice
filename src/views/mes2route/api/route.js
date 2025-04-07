/**
 * 工艺路线相关API
 */

export default {
  /**
   * 获取工艺路线列表
   * @param {Object} params 查询参数
   * @returns {Promise}
   */
  getRouteList(params) {
    // return this.$http.axios.post('/api/route/list', params).catch(() => {
      // 如果API请求失败，使用mock数据
      return this.$http.getMockFile('routes.json');
    // });
  },

  /**
   * 新增工艺路线
   * @param {Object} data 工艺路线数据
   * @returns {Promise}
   */
  addRoute(data) {
    return this.$http.axios.post('/api/route/add', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: { id: 'RL' + Date.now() } });
    });
  },

  /**
   * 编辑工艺路线
   * @param {Object} data 工艺路线数据
   * @returns {Promise}
   */
  updateRoute(data) {
    return this.$http.axios.post('/api/route/update', data).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 删除工艺路线
   * @param {String} id 工艺路线ID
   * @returns {Promise}
   */
  deleteRoute(id) {
    return this.$http.axios.post('/api/route/delete', { id }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  },

  /**
   * 工艺路线校验
   * @param {String} id 工艺路线ID
   * @returns {Promise}
   */
  validateRoute(id) {
    return this.$http.axios.post('/api/route/validate', { id }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: { valid: true, message: '校验通过' } });
    });
  },

  /**
   * 更改工艺路线状态
   * @param {String} id 工艺路线ID
   * @param {String} status 新状态
   * @returns {Promise}
   */
  updateRouteStatus(id, status) {
    return this.$http.axios.post('/api/route/updateStatus', { id, status }).catch(() => {
      // 模拟成功响应
      return Promise.resolve({ code: 0, message: 'success', data: null });
    });
  }
}; 