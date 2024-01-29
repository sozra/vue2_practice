<template>
    <div class="singleProject">
        <div class="project-label">{{this.projectData.modelClassification}}</div>
        <div id="progressChart">
    <!-- 每个项目的容器 -->
    <div class="project" id="projectA">

        <div style="position:relative; display:none;" v-for="(gate, gateIndex) in gateList" :key="'gate'+gateIndex">
            <el-popover
                placement="top-start"
                title="关口"
                trigger="hover"
            >
            <!-- todo 判断显示隐藏 -->
            <!-- todo 不一定一一对应，不能直接用index遍历 -->
                <el-descriptions :title="gate.name"  :column="1" size="mini" style="max-width:250px;">
                        <el-descriptions-item labelStyle="font-weight: bold;" label="阶段">{{gate.name}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="编号">{{gate.id}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="计划结束时间">{{gate.plannedFinishDate}}</el-descriptions-item>

                </el-descriptions>
            <!-- <div > -->
                <i  slot="reference" class="el-icon-top-left gate-flag" :style="{'left': calWidth(gate.plannedStartDate?gate.plannedStartDate:totalStartDate, gate.plannedFinishDate, '4px'), }"></i>
            <!-- </div> -->
            </el-popover>
        </div>

        <div style="position:relative" v-for="(milestone, milestoneIndex) in milestoneList" :key="'milestone'+milestoneIndex">
            <!-- <el-popover
                placement="top-start"
                title="里程碑"
                trigger="hover"
            >

                <el-descriptions :title="milestone.name"  :column="1" size="mini" style="max-width:250px;">
                        <el-descriptions-item labelStyle="font-weight: bold;" label="阶段">{{milestone.name}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="编号">{{milestone.id}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="计划结束时间">{{milestone.plannedFinishDate}}</el-descriptions-item>

                </el-descriptions>
                <img
                    slot="reference" class="milestone-flag" :style="{'left': calWidth(milestone.plannedStartDate?milestone.plannedStartDate:totalStartDate, milestone.plannedFinishDate, '13px'), }"
                    src="..\assets\阶段性节点.png"
                    />
            </el-popover> -->
            <span class="milestone-flag-label" :style="{'left': calWidth(milestone.plannedStartDate?milestone.plannedStartDate:totalStartDate, milestone.plannedFinishDate, '13px'), }">{{milestone.plannedFinishDate?milestone.plannedFinishDate.replace(/(\d\d\d\d)-(\d\d)-(\d\d).*/i, "$2/$3"):''}}</span>
            <img
                 class="milestone-flag" :style="{'left': calWidth(milestone.plannedStartDate?milestone.plannedStartDate:totalStartDate, milestone.plannedFinishDate, '13px'), }"
                src="..\assets\阶段性节点.png"
            />
        </div>
        <div style="position:relative">
            <!-- <el-popover
                placement="top-start"
                title=""
                trigger="hover"
            >

                <el-descriptions   :column="1" size="mini" style="max-width:250px;">
                        <el-descriptions-item labelStyle="font-weight: bold;" label="当前时间">{{currentDate}}</el-descriptions-item>

                </el-descriptions>
                <img
                slot="reference" class="time-flag" :style="{'left': calCurrentTimeWidth(), }"  style="width: 16px;"
                src="..\assets\当前时间点.png"
                />
            </el-popover> -->
            <img
                slot="reference" class="time-flag" :style="{'left': calCurrentTimeWidth(), }"  style="width: 16px;"
                src="..\assets\当前时间点.png"
                />
        </div>
<!--         <div class="project-name">项目A</div> -->        
        <div class="project-bar">
            <!-- 每个阶段的条形图 -->
            <div class="stage" style="position: relative;" :style="{'width': calWidth(item.plannedStartDate, item.plannedFinishDate, '0px'), 'background': linearGradientList[itemIndex%linearGradientList.length]}" v-for="(item, itemIndex) in progressList" :key="itemIndex">
                <!-- <el-tooltip class="item" effect="dark" content="Top Right 提示文字" placement="top-end">
                    <i class="el-icon-s-flag current-time-flag"></i>
                    </el-tooltip> -->
                    <el-popover
                        placement="top-start"
                        title="里程碑"
                        trigger="hover"
                        close-delay="100"
                        v-if="false"
                    >
                    <!-- todo 判断显示隐藏 -->
                    <!-- todo 不一定一一对应，不能直接用index遍历 -->
                        <el-descriptions :title="milestoneList&&milestoneList[itemIndex]? milestoneList[itemIndex].name:''"  :column="1" size="mini" style="max-width:250px;">
                                <!-- <el-descriptions-item labelStyle="font-weight: bold;" label="阶段">{{item.name}}</el-descriptions-item> -->
                                <el-descriptions-item labelStyle="font-weight: bold;" label="编号">{{milestoneList&&milestoneList[itemIndex]? milestoneList[itemIndex].number:''}}</el-descriptions-item>

                                <el-descriptions-item labelStyle="font-weight: bold;" label="编号">{{milestoneList[itemIndex]? milestoneList[itemIndex].number:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="过期状态">{{timeOutStatusMap[milestoneList[itemIndex]? milestoneList[itemIndex].timeOutStatus:'']}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="活动类型">{{projectTypeMap[milestoneList[itemIndex]? milestoneList[itemIndex].projectType:'']}}</el-descriptions-item>
                        <!-- <el-descriptions-item labelStyle="font-weight: bold;" label="所有者">{{milestoneList[itemIndex]? milestoneList[itemIndex].owner:''}}</el-descriptions-item> -->
                        <!-- <el-descriptions-item labelStyle="font-weight: bold;" label="项目经理">{{milestoneList[itemIndex]? milestoneList[itemIndex].projectManager:''}}</el-descriptions-item> -->
                        <!-- <el-descriptions-item labelStyle="font-weight: bold;" label="项目名称">{{milestoneList[itemIndex]? milestoneList[itemIndex].name:''}}</el-descriptions-item> -->
                        <el-descriptions-item labelStyle="font-weight: bold;" label="根父对象">{{milestoneList[itemIndex]? milestoneList[itemIndex].rootParentObject:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="项目状态">{{projectStatusMap[milestoneList[itemIndex]? milestoneList[itemIndex].projectStatus:'']}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="项目所属工厂">{{milestoneList[itemIndex]? milestoneList[itemIndex].modelClassification:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="状态">{{statusMap[milestoneList[itemIndex]? milestoneList[itemIndex].status:'']}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="描述">{{milestoneList[itemIndex]? milestoneList[itemIndex].description:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="计划开始时间">{{milestoneList[itemIndex]? milestoneList[itemIndex].plannedStartDate:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="计划结束时间">{{milestoneList[itemIndex]? milestoneList[itemIndex].plannedFinishDate:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="实际开始时间">{{milestoneList[itemIndex]? milestoneList[itemIndex].actualStartDate:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="实际结束时间">{{milestoneList[itemIndex]? milestoneList[itemIndex].actualFinishDate:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="客户名称">{{milestoneList[itemIndex]? milestoneList[itemIndex].clientName:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="产品名称">{{milestoneList[itemIndex]? milestoneList[itemIndex].productName:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="内部代码">{{milestoneList[itemIndex]? milestoneList[itemIndex].innerCode:''}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="内部订单号">{{milestoneList[itemIndex]? milestoneList[itemIndex].innerOrderNumber:''}}</el-descriptions-item>
                        </el-descriptions>
                        <i  slot="reference" class="el-icon-s-flag current-time-flag"></i>
                        <!-- <img
                        slot="reference" class="current-time-flag" :style="{'left': calCurrentTimeWidth(), }"
                        src="..\assets\阶段性节点.png"
                        /> -->
                    </el-popover>
                <el-popover
                    style="width:100%"
                    placement="top-start"
                    title="阶段"
                    trigger="hover"
                >
                    <el-descriptions :title="item.name"  :column="1" size="mini" style="max-width:250px;">
                        <el-descriptions-item labelStyle="font-weight: bold;" label="编号">{{item.number}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="过期状态">{{timeOutStatusMap[item.timeOutStatus]}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="活动类型">{{projectTypeMap[item.projectType]}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="根父对象">{{item.rootParentObject}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="项目状态">{{projectStatusMap[item.projectStatus]}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="项目所属工厂">{{item.modelClassification}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="状态">{{statusMap[item.status]}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="描述">{{item.description}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="计划开始时间">{{item.plannedStartDate}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="计划结束时间">{{item.plannedFinishDate}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="实际开始时间">{{item.actualStartDate}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="实际结束时间">{{item.actualFinishDate}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="客户名称">{{item.clientName}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="产品名称">{{item.productName}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="内部代码">{{item.innerCode}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="内部订单号">{{item.innerOrderNumber}}</el-descriptions-item>
                    </el-descriptions>
                    <div slot="reference" :id="'bar'+itemIndex" style="width:100%;position:relative">

                        <span class="actual-bar-dates actual-bar-startDate">{{startDateLabel(itemIndex,item.plannedStartDate)}}</span>
                    <!-- <div   class="actual-bar">{{itemIndex+1}}</div> -->
                    <div   class="actual-bar">{{item.name}}</div>
                        <span class="actual-bar-dates actual-bar-endDate">{{endDateLabel(itemIndex,item.plannedFinishDate)}}</span>
                    </div>
            </el-popover>
            </div>
        </div>
    </div>
        </div>
    </div>
</template>


<script>
// import projectData from "../../ids.json";
export default {
    name: "projectProgress",
    props: {
        projectData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            totalStartDate: "",
            totalEndDate: "",
            currentDate: null,
            totalDays: null,
            // projectData: [],
            ids: [],
            progressList: [],
            gateList: [],
            milestoneList: [],
            linearGradientList: [
                "linear-gradient(to right, #005482, #37e4f7)",
                "linear-gradient(to right, #05aba7, #4defb2)",
                "linear-gradient(to right, #005482, #00b9fe)",
                "linear-gradient(to right, #401cbf, #785afc)",
            ],
            colorList3: [
            "#0066CC",
            "#99CC00",
            // "#114EE8",
            "#088F0A",
            "#F72F07",
            "#F9F614",
            "#D1FBF8",
            "#3EB0A8",
            "#9984B0",
            "#6518BA",
            "#B5389E",
            "#F7C3ED",
            "#A9F7BC",
            "#FEFDB9",
            "#EE919B",
            "#DCD9D4",
            "#96D4FB",
            ],
            colorList: ['#f56c6c', '#e6a23c', '#5cb87a', '#1989fa', '#6f7ad3', ],
            colorList2: ["MediumSeaGreen",
                        "SeaGreen",
                        "ForestGreen",
                        "Green",
                        "DarkGreen",
                        "YellowGreen",
                        "OliveDrab",
                        "DarkOliveGreen",
                        "MediumAquaMarine",
                        "DarkSeaGreen",
                        "LightSeaGreen",
                        "DarkCyan",
                        "Teal",],
            timeOutStatusMap: {
               //过期状态  0 ：未开始 1：进程中 2：已取消 3：过期 4：已完成
                0: '未开始',
                1: '进程中',
                2: '已取消',
                3: '过期',
                4: '已完成',
            },
            projectTypeMap: {
                //（0：计划；1：阶段；2：关口；；3：里程碑；4:任务）")
                0: '计划',
                1: '阶段',
                2: '关口',
                3: '里程碑',
                4: '任务',
            },
            projectStatusMap: {
                //0 ：已建议 1：活动
                0: '已建议',
                1: '活动',
            },
            statusMap: {
                //0 :未开始 1：进程中 3 ：已取消 4：打开 5：已关闭 2：已完成
                0: '未开始',
                1: '进程中',
                2: '已完成',
                3: '已取消',
                4: '打开',
                5: '已关闭',
            },
        };
    },
    created() {
        // this.projectData = projectData;
        this.ids = this.projectData.ids;
        this.totalStartDate = this.projectData.plannedStartDate;
        this.totalEndDate = this.projectData.plannedFinishDate;
        // this.currentDate = new Date().toLocaleDateString();
        // 初始化当前时间。格式为"2023-11-08 08:00:00"
        this.setCurrentDate();
        this.totalDays = this.calDays(this.totalStartDate, this.totalEndDate);
        this.progressList = this.ids.filter(item => item.projectType === 1);
        this.gateList = this.ids.filter(item => item.projectType === 2||item.projectType === 3);
        // todo 里程碑 3
        this.milestoneList = this.ids.filter(item => item.projectType === 2||item.projectType === 3);
    },
    mounted() {
        window.kk = this;
    },
    methods: {
        startDateLabel(index, item) {
            if (!item) return "";
            console.log(`start item: ${item}`);
            // 第一个或者和前一个阶段的开始时间的年份不一样，就显示年份
            // if (index === 0) {
            if (index === 0 || this.progressList[index - 1].plannedFinishDate.replace(/(\d\d\d\d)-\d\d-\d\d.*/i, "$1") !== item.replace(/(\d\d\d\d)-\d\d-\d\d.*/i, "$1")) {
                return item.replace(/(\d\d\d\d)-(\d\d)-(\d\d).*/i, "$1/$2/$3");
            }
            // return item.plannedStartDate.replace(/\d\d\d\d-(\d\d-\d\d).*/i, "$1");
            return item.replace(/(\d\d\d\d)-(\d\d)-(\d\d).*/i, "$2/$3");
            // return "";
        },
        endDateLabel(index, item) {
            if (!item) return "";
            console.log(`end item: ${item}`);
            // 第一个或者和前一个阶段的开始时间的年份不一样，就显示年份
            // if (index === this.progressList.length-1 || this.progressList[index - 1].plannedFinishDate.replace(/(\d\d\d\d)-\d\d-\d\d.*/i, "$1") !== item.replace(/(\d\d\d\d)-\d\d-\d\d.*/i, "$1")) {
            if (index === this.progressList.length-1 ) {
                // return item.replace(/(\d\d\d\d-\d\d-\d\d).*/i, "$1");
                return item.replace(/(\d\d\d\d)-(\d\d)-(\d\d).*/i, "$1/$2/$3");
            }
            // return item.replace(/(\d\d\d\d)-(\d\d)-(\d\d).*/i, "$2/$3");
            return "";
        },
        setCurrentDate() {
            const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        this.currentDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        },
        calCurrentTimeWidth() {
            if (!this.currentDate || !this.totalStartDate || !this.totalEndDate) {
                return 'calc(0% - 8px)';
            }
            // 判断currentDate是否在totalStartDate和totalEndDate之间
            const start = new Date(this.totalStartDate);
            const end = new Date(this.totalEndDate);
            const current = new Date(this.currentDate);
            if (current < start) {
                return 'calc(0% - 8px)';
            }
            else if (current > end) {
                return 'calc(100% - 8px)';
            }
            // const totalWidth = 800;
            // const totalDays = this.calDays(this.totalStartDate, this.totalEndDate);
            const days = this.calDays(this.totalStartDate, this.currentDate);
            // return percentage + '%';
            // debugger;
            console.log(`days: ${days}`);
            // return days / this.totalDays * 100 + '%';
            const width = days / this.totalDays * 100;
            return `calc(${width}% - 8px)`;
            // const width = totalWidth * days / totalDays;
            // return width + 'px';
        },
        calWidth(plannedStartDate, plannedFinishDate, offset) {
            if (!plannedStartDate || !plannedFinishDate || !this.totalStartDate || !this.totalEndDate) {
                return `calc(0% - ${offset})`;
            }
            // const totalWidth = 800;
            // const totalDays = this.calDays(this.totalStartDate, this.totalEndDate);
            const days = this.calDays(plannedStartDate, plannedFinishDate);
            // return percentage + '%';
            // debugger;
            // if (type == 'time') {
            //     debugger;
            // }
            // return days / this.totalDays * 100 + '%';
            const width = days / this.totalDays * 100;
            return `calc(${width}% - ${offset})`;
            // const width = totalWidth * days / totalDays;
            // return width + 'px';
        },
        calDays(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = (end - start) / (1000 * 60 * 60 * 24);
            return days;
        }
    }
}
</script>


<style scoped>
.singleProject {
    display: flex;
    /* background: rgb(0, 43, 54); */
    /* background: lightblue; */
    /* height: 100vh; */
    align-items: center;
    padding-top: 10px;
}
.singleProject:first-child {
    padding-top: 20px;
}
.project-label {
    color: white;
}
#progressChart {
    width: 850px;
    padding: 10px;
    /* padding-bottom: 20px; */
    padding-top: 40px;
}

.project {
    margin-bottom: 10px;
}

.project-name {
    font-weight: bold;
    margin-bottom: 5px;
}

.project-bar {
    display: flex;
    height: 25px;
    /* background-color: #eee; */
}

.stage {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #4caf50;
    color: white;
    padding: 0 5px;
    /* border-top-right-radius: 50px; */
    /* border-bottom-right-radius: 50px; */
}
.stage:last-child {
   border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
}
.actual-bar {
    font-size: 13px;
        overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap;
}

.actual-bar-dates {
    position: absolute;;
    /* top: -25px; */
    top: -20px;
    font-size: 13px;
}
.actual-bar-startDate {
    /* position: absolute;; */
    left: 0;
    /* top: -25px; */
}
.actual-bar-endDate {
    /* position: absolute;; */
    right: 0;
    /* top: -25px; */
}
.arrow-up {
  width: 0; 
  height: 0; 
  --arrow-size: 10px;
  border-left: var(--arrow-size) solid transparent;
  border-right: var(--arrow-size) solid transparent;
  
  border-bottom: var(--arrow-size) solid black;
}
.currentTime {
/* --arrow-size: 10px; */
position: relative;
bottom: -10px;
left: 33%;
}
.time-flag {
    position: absolute;
    color: green;
    /* top: -20px; */
    /* left: 50%; */
    bottom: 0px;
    /* top: 0px; */
    z-index: 20;
}
.time-flag::after {
    /* content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: white;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%); */
    border-left: 3px dotted green ;
    content: '.';
    color: rgba(0,0,0,0);
    user-select: none;
    /* right: 10px; */
    position: absolute;
    left: 7px;
    top: 16px;
    height: 25px;
}
.gate-flag {
    position: absolute;
    color: yellow;
    /* top: -20px; */
    /* left: 50%; */
    bottom: -50px;
    /* top: 0px; */
    z-index: 20;
}
.milestone-flag {
    position: absolute;
    color: yellow;
    /* top: -20px; */
    /* left: 50%; */
    bottom: 0px;
    /* top: 0px; */
    z-index: 20;
}
.milestone-flag-label {
    position: absolute;
    /* color: yellow; */
    /* top: -20px; */
    /* left: 50%; */
    bottom: 36px;
    /* top: 0px; */
    z-index: 20;
    color: white;
    font-size: 12px;
}
.current-time-flag {
    position: absolute;
    color: green;
    /* top: -20px; */
    left: 50%;
    bottom: 25px;
    }
</style>