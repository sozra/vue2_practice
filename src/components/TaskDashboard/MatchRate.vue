<template>
    <BaseChart id="lineTrend" :option="lineTrendOption" class="chartLineTrend" :hardRefresh="hardRefresh"
       />
  </template>
  
  <script setup>
  import { computed, defineProps, defineEmits } from 'vue';
  import BaseChart from './BaseChart.vue';
//   import * as echarts from "echarts";
  import _ from 'lodash';
  
  const props = defineProps({
    lineTrendData: {
      type: Object,
      default: () => { },
    },
    highlighted: {
      type: String,
      default: '',
    },
  });
  
  const yValueMax = computed(() => {
    const series = _.get(props.lineTrendData, 'series', []);
    let max = 0;
    series.forEach((item) => {
      const maxItem = Math.max(...item.data);
      if (maxItem > max) {
        max = maxItem;
      }
    });
    return max;
  });
  
  const hardRefresh = computed(() => {
    return props.highlighted ? false : true;
  });
  
  const emit = defineEmits(['chart-click', 'reset']);
  
  const lineTrendOption = computed(() => {
    const xAxis = _.get(props.lineTrendData, 'xAxis', []);
    let series = _.get(props.lineTrendData, 'series', []).map((item) => {
      return {
        ...item,
        type: 'line',
        // stack: 'Total',
        smooth: true,
        // lineStyle: {
        //   width: 0
        // },
        showSymbol: xAxis.length == 1 ? true : false,
        emphasis: {
          focus: 'series'
        },
        areaStyle: {
          opacity: 0.1,
        },
        label: {
          show: false,
        //   position: 'top',
        //   color: '#000',
        //   fontSize: 12,
        //   fontWeight: 'bold',
        //   formatter: function (params) {
        //     return params.value;
        //   }
        },
        triggerLineEvent: true,
      }
    });
  
    let highlightedIndex = -1;
    if (props.highlighted) {
      highlightedIndex = xAxis.findIndex((item) => {
        return item === props.highlighted;
      });
    }
    if (highlightedIndex !== -1 && series.length > 0) {
      series[0].markLine = {
        show: true,
        data: [
          [
            { name: props.highlighted, xAxis: props.highlighted, yAxis: 'min' },
            { name: 'end', xAxis: props.highlighted, yAxis: yValueMax.value }
          ]
        ],
        label: {
          show: true
        },
        emphasis: {
          disabled: true
        },
        silent: true,
        animation: false,
        symbol: 'none',
        lineStyle: {
          type: 'dotted',
          width: 3,
        },
      };
    }
    else if (series.length > 0) {
      series[0].markLine = {
        show: false,
        data: [],
      };
    }
  
    return {
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        // confine: true,
        // axisPointer: {
        //   type: 'xaxis',
        //   label: {
        //     backgroundColor: '#6a7985'
        //   }
        // }
      },
      legend: {
        // top: 'bottom',
        // data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
        // right: '40',
        right: 'center',
        top: '5',
        textStyle: {
            color: 'white'
        },
        itemStyle: {
            // color: 'white'
            // borderColor: '#fff'
            // borderWidth: 10,
            // borderType: 'dashed',
        },
        icon: 'circle',
      },
      grid: {
        left: '15',
        right: '15',
        // bottom: '17%',
        // top: '15%',
        bottom: '3%',
        top: '25%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: xAxis ? xAxis : [],
          axisLabel: {
            // show: false,
            color: 'white'
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLabel: {
            // formatter: '{value}'
            show: false,
          },
        }
      ],
      series: series ? series : []
    };
  });
  
//   const handleChartClick = (params, myCharts) => {
//     // console.log("line chart clicked:", params);
//     // debugger
//     // emit('chart-click', params);
//     let xValue = '';
//     try {
//       // const chartInstance = echarts.getInstanceById('lineTrend');
//       const chartInstance = echarts.getInstanceByDom(document.getElementById('lineTrend'));
//       const pixelPoint = [params.event.offsetX, params.event.offsetY];
//       if (pixelPoint[1] < 30) return;
//       console.log('pixelPoint', pixelPoint);
//       const logicPoint = chartInstance.convertFromPixel('grid', pixelPoint);
//       console.log('logicPoint', logicPoint);
//       const xAxisData = chartInstance.getOption().xAxis[0].data;
//       // const index = chartInstance.convertToDataIndex(logicPoint);
//       // xValue = xAxisData[index];
//       xValue = xAxisData[logicPoint[0]];
//       console.log('xValue', xValue);
//     } catch (error) {
//       console.log('error', error)
//     }
//     emit('chart-click', xValue);
//   };
  
//   const eventHandlers = {
//     'click': handleChartClick
//   };
  </script>
  
  <style scoped>
  /* .chartLineTrend {
    height: 100%;
  } */
  </style>
  