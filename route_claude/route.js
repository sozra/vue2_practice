// src/api/process-route.js - API接口封装
import request from '@/utils/request'

export function getProcessRoutes(params) {
  return request({
    url: '/api/process-routes',
    method: 'get',
    params
  })
}

export function createProcessRoute(data) {
  return request({
    url: '/api/process-routes',
    method: 'post',
    data
  })
}

export function updateProcessRoute(id, data) {
  return request({
    url: `/api/process-routes/${id}`,
    method: 'put',
    data
  })
}

export function deleteProcessRoute(id) {
  return request({
    url: `/api/process-routes/${id}`,
    method: 'delete'
  })
}

export function validateProcessRoute(id) {
  return request({
    url: `/api/process-routes/${id}/validate`,
    method: 'post'
  })
}

export function completeProcessRoute(id) {
  return request({
    url: `/api/process-routes/${id}/complete`,
    method: 'put'
  })
}

export function cancelProcessRoute(id) {
  return request({
    url: `/api/process-routes/${id}/cancel`,
    method: 'put'
  })
}

// 工站相关API
export function getStations(routeId) {
  return request({
    url: `/api/process-routes/${routeId}/stations`,
    method: 'get'
  })
}

export function createStation(routeId, data) {
  return request({
    url: `/api/process-routes/${routeId}/stations`,
    method: 'post',
    data
  })
}

export function updateStation(routeId, stationId, data) {
  return request({
    url: `/api/process-routes/${routeId}/stations/${stationId}`,
    method: 'put',
    data
  })
}

export function deleteStation(routeId, stationId) {
  return request({
    url: `/api/process-routes/${routeId}/stations/${stationId}`,
    method: 'delete'
  })
}

export function copyStation(data) {
  return request({
    url: '/api/stations/copy',
    method: 'post',
    data
  })
}

export function copyProcessRoute(data) {
  return request({
    url: '/api/process-routes/copy',
    method: 'post',
    data
  })
}

export function batchCopyProcessRoute(data) {
  return request({
    url: '/api/process-routes/batch-copy',
    method: 'post',
    data
  })
}

export function importStationModule(routeId, data) {
  return request({
    url: `/api/process-routes/${routeId}/stations/import-module`,
    method: 'post',
    data
  })
}