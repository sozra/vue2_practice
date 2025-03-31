// src/store/index.js - Vuex配置
import Vue from 'vue'
import Vuex from 'vuex'
import processRoute from './modules/process-route'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    processRoute
  }
})