<template>
  <div :id="id" ref="chartContainer" class="echart-container"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, onBeforeUnmount, ref, watch, defineProps } from 'vue';
import debounce from 'lodash/debounce';

const props = defineProps({
  option: {
    type: Object,
    required: true
  },
  chartClass: {
    type: String,
    default: ''
  },
  eventHandlers: Object,
  zrEventHandlers: Object,
  hardRefresh: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: '',
    required: true
  }
});

const chartContainer = ref(null);
let chartInstance = null;
let resizeObserver = null;

const initChart = () => {
  chartInstance = echarts.init(chartContainer.value);
  // console.log(`id: ${props.id} initChart`);
  // console.dir(props.option, { depth: null });
  chartInstance.setOption(props.option);

  // 设置 ECharts 事件监听器
  if (props.eventHandlers) {
    Object.keys(props.eventHandlers).forEach(eventType => {
      let handler = props.eventHandlers[eventType];
      if (eventType === 'click') {
        handler = debounce(handler, 100);
      }
      chartInstance.on(eventType, handler);
    });
  }

  // 设置 ZRender 事件监听器
  if (props.zrEventHandlers) {
    const zr = chartInstance.getZr();
    Object.keys(props.zrEventHandlers).forEach(eventType => {
      let handler = props.zrEventHandlers[eventType];
      if (eventType === 'click') {
        handler = debounce(handler, 100);
      }
      zr.on(eventType, handler);
    });
  }
};

const handleResize = debounce(() => {
  if (chartInstance) {
    // console.log('resize, id:', props.id, 'chartInstance:', chartInstance);
    chartInstance.resize();
  }
}, 1);

onMounted(() => {
  initChart();

  resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(chartContainer.value);
});

watch(() => props.option, (newOption) => {
  // console.log('newOption', newOption);
  if (props.hardRefresh) {
    // console.log(`id: ${props.id} initChart`);
    // console.dir(props.option, { depth: null });
    chartInstance.setOption(newOption, { replaceMerge: 'series' });
  }
  else {
    // console.log(`id: ${props.id} initChart`);
    // console.dir(props.option, { depth: null });
    chartInstance.setOption(newOption);
  }
}, { deep: true });

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<style scoped>
/* .echart-container {
  height: 100%;
} */
</style>
