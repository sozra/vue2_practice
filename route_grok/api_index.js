import axios from 'axios';

const mockResponse = (data) => Promise.resolve({ data });

// 主页面相关接口
export const getTableData = (query) => mockResponse({ data: [] });
export const addRoute = (form) => mockResponse({ message: '新增成功' });
export const updateRoute = (form) => mockResponse({ message: '更新成功' });
export const validateRoute = () => mockResponse({ message: '校验成功' });

// 工站页面相关接口
export const getStationData = (id) => mockResponse({ data: [] });
export const saveStationData = (data) => mockResponse({ message: '保存成功' });
export const copyStation = (form) => mockResponse({ message: '复制成功' });