/**
 * 辅助工具函数
 */

/**
 * 将数据保存到localStorage
 * @param {String} key 键名
 * @param {*} value 值
 */
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('保存到localStorage失败:', e);
  }
};

/**
 * 从localStorage获取数据
 * @param {String} key 键名
 * @param {*} defaultValue 默认值
 * @returns {*} 存储的值或默认值
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error('从localStorage获取数据失败:', e);
    return defaultValue;
  }
};

/**
 * 从localStorage删除数据
 * @param {String} key 键名
 */
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('从localStorage删除数据失败:', e);
  }
};

/**
 * 深度克隆对象
 * @param {Object} obj 要克隆的对象
 * @returns {Object} 克隆后的对象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    console.error('深度克隆对象失败:', e);
    return Array.isArray(obj) ? [] : {};
  }
};

/**
 * 格式化日期
 * @param {Date|String|Number} date 日期对象、日期字符串或时间戳
 * @param {String} format 格式化模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns {String} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  date = date ? new Date(date) : new Date();
  
  const formatObj = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  };
  
  return format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, (match) => {
    let value = formatObj[match];
    if (match !== 'YYYY' && value < 10) {
      value = '0' + value;
    }
    return value;
  });
};

/**
 * 防抖函数
 * @param {Function} fn 要执行的函数
 * @param {Number} delay 延迟时间，单位毫秒
 * @returns {Function} 防抖处理后的函数
 */
export const debounce = (fn, delay = 300) => {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
};

/**
 * 截流函数
 * @param {Function} fn 要执行的函数
 * @param {Number} interval 间隔时间，单位毫秒
 * @returns {Function} 截流处理后的函数
 */
export const throttle = (fn, interval = 300) => {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}; 