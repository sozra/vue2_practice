<template>
  <div class="manyTabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="test-tab"> 我的行程</span>
        我的行程
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "manyTabs",
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
.manyTabs {
  margin-top: 20px;
  width: 400px;
}


::v-deep el-tabs__item {
    background-color: #409eff;
    background: #409eff;
    color: #fff;
    border: 1px solid #409eff;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    margin-right: 0;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    
}


.test-tab {
    /* background: lightblue; */
    /* background-color: lightgreen; */
    background-image: url(http://10.12.7.46:20005/ajreportbk/5c6316f2-7df3-47ad-81e1-fa23215e7fa2.png);
}
</style>