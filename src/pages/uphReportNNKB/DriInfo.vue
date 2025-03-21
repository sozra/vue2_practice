<template>
    <div class="DriInfo" :class="{fullDriInfo:fullscreen}">
        <div class="DriInfo-title">负责人信息</div>
        <div class="card-container">
            <!-- 第一个负责人卡片 -->
            <div class="info-card">
                <div class="DriInfo-avatar">
                    <!-- <img src="@/assets/default-DriInfo-avatar.png" alt="负责人照片"> -->
                    <img src="@/assets/byd.png" alt="负责人照片">
                </div>
                <div class="info-item">
                    <span class="DriInfo-label">姓名：</span>
                    <span class="DriInfo-value">张三</span>
                </div>
                <div class="info-item">
                    <span class="DriInfo-label">职位：</span>
                    <span class="DriInfo-value">项目经理</span>
                </div>
                <div class="info-item">
                    <span class="DriInfo-label">电话号码：</span>
                    <span class="DriInfo-value">13800138000</span>
                </div>
            </div>
            <!-- 第二个负责人卡片 -->
            <div class="info-card">
                <div class="DriInfo-avatar">
                    <!-- <img src="@/assets/default-DriInfo-avatar.png" alt="负责人照片"> -->
                    <img src="@/assets/byd.png" alt="负责人照片">
                </div>
                <div class="info-item">
                    <span class="DriInfo-label">姓名：</span>
                    <span class="DriInfo-value">李四</span>
                </div>
                <div class="info-item">
                    <span class="DriInfo-label">职位：</span>
                    <span class="DriInfo-value">技术主管</span>
                </div>
                <div class="info-item">
                    <span class="DriInfo-label">电话号码：</span>
                    <span class="DriInfo-value">13900139000</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import * as echarts from "echarts";
// import _ from "lodash";
// import moment from "moment";
export default {
    name: "DriInfo",
    components: {
        // LineChart: () => import("./lineCharts.vue"),
    },
    props: {
    //   config: {
    //     type: Object,
    //     default: () => {
    //       return {};
    //     },
    //   },
    //   color: {
    //     type: String,
    //     default: "cyan",
    //     required: false,
    //   },
    tableData: {
        type: Array,
        default: () => {
          return [];
        },
      },
      fullscreen: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    //   watch: {
    //     someValue: {
    //       handler: function (newVal, oldVal) {
    //         // this.renderOngoing(newVal);
    //         console.log('someValue changed, new val: ', newVal);
    //       },
    //       deep: true,
    //     },
    //   },
    //   computed: {
    //     pageType() {
    //       return this.$store.state.pageType;
    //     },
    //   },
    created() {},
    mounted() {
      window.kk = this;
    },
    methods: {},
};
</script>

<style scoped>
.DriInfo {
    width: 100%;
    height: 100%;
    /* padding: 15px; */
    background-color: var(--board-bg-color);
    display: flex;
    flex-direction: column;
}
.fullDriInfo{
    background-color: #002A80;
    color: var(--board-bg-color);
}


.DriInfo-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    flex-shrink: 0;
}
.fullDriInfo .DriInfo-title{
  background: #224EC1;
  padding: 20px;
}
.card-container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    gap: 15px;
    min-height: 0;
}

.info-card {
    flex: 1;
    padding: 15px;
    border-radius: 8px;
    /* box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); */
    background-color: var(--board-bg-color);
    display: flex;
    flex-direction: column;
    min-height: 0;
}
.fullDriInfo .info-card{
    background-color: #002A80;
    color: var(--board-bg-color);
}
.DriInfo-avatar {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    margin-bottom: 15px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
}

.DriInfo-avatar img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info-item {
    margin-bottom: 8px;
    line-height: 24px;
    flex-shrink: 0;
}

.DriInfo-label {
    color: #666;
}
.fullDriInfo .DriInfo-label{
    color: #fff;
}


.DriInfo-value {
    color: #333;
}
.fullDriInfo .DriInfo-value{
    color: #fff;
}
</style>