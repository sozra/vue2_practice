<template>
  <div class="progress-bar-container">
    <div v-for="(item, index) in projects" :key="index" class="progress-bar">
      <label>{{ item.name }}</label>
      <div class="progress">
        <div :style="{ width: item.progress + '%' }" class="progress-value">
          <span>{{ item.progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        { name: '项目1', progress: 80 },
        { name: '项目2', progress: 90 },
        // 其他项目...
      ]
    };
  }
};
</script>

<style>
.progress-bar-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  background-color: #0e1a2b; /* 背景颜色 */
}
.progress-bar {
  margin-bottom: 10px;
}
.progress {
  background-color: #204a87; /* 进度条背景颜色 */
  border-radius: 5px;
  position: relative;
  height: 20px;
  width: 100%;
}
.progress-value {
  background-color: #0b7dda; /* 进度条颜色 */
  height: 100%;
  border-radius: 5px;
  line-height: 20px; /* 使文本垂直居中 */
  padding-left: 10px; /* 文本距离左边框的距离 */
}
</style>
