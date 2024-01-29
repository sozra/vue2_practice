以下是一个关于展示项目各阶段相关信息的Vue2组件的代码
```vue
<template>
    <div>
        <div>{{this.projectData.modelClassification}}</div>
        <div id="progressChart">
    <!-- 每个项目的容器 -->
    <div class="project" id="projectA">
<!--         <div class="project-name">项目A</div> -->
        <div class="project-bar">
            <!-- 每个阶段的条形图 -->
            <div class="stage" :style="{'width': calWidth(item.plannedStartDate, item.plannedFinishDate), 'background': colorList[itemIndex]}" v-for="(item, itemIndex) in progressList" :key="itemIndex">
                <el-popover
                    style="width:100%"
                    placement="top-start"
                    title="阶段"
                    trigger="hover"
                >
                    <el-descriptions :title="item.name"  :column="1" size="mini" style="max-width:250px;">
                        <el-descriptions-item labelStyle="font-weight: bold;" label="编号">{{item.number}}</el-descriptions-item>
                        <el-descriptions-item labelStyle="font-weight: bold;" label="过期状态">{{timeOutStatusMap[item.timeOutStatus]}}</el-descriptions-item>
                    </el-descriptions>
                    <div  slot="reference" style="width:100%" class="actual-bar">{{itemIndex+1}}</div>
            </el-popover>
            </div>
        </div>
    </div>
        </div>
    </div>
</template>


<script>
import projectData from "../../ids.json";
export default {
    name: "projectProgress",
    data() {
        return {
            totalStartDate: "2023-11-08 08:00:00",
            totalEndDate: "2024-09-11 17:00:00",
            totalDays: null,
            percent: 0,
            timer: null,
            projectData: [],
            ids: [],
            progressList: [],
            milestoneList: [],
            colorList: ['#f56c6c', '#e6a23c', '#5cb87a', '#1989fa', '#6f7ad3', '#f56c6c', '#e6a23c', '#5cb87a', '#1989fa', '#6f7ad3'],
        };
    },
    created() {
        this.projectData = projectData;
        this.ids = projectData.ids;
        this.totalDays = this.calDays(this.totalStartDate, this.totalEndDate);
        this.progressList = this.ids.filter(item => item.projectType === 1);
        this.milestoneList = this.ids.filter(item => item.projectType === 3);
    },
    mounted() {
        window.kk = this;
    },
    methods: {
        progressStyle(item) {
            return {
                width: item.percentage,
                background: this.colorList[index]
            }
        },
        calWidth(plannedStartDate, plannedFinishDate) {
            if (!plannedStartDate || !plannedFinishDate || !this.totalStartDate || !this.totalEndDate) {
                return '0%';
            }
            const days = this.calDays(plannedStartDate, plannedFinishDate);
            return days / this.totalDays * 100 + '%';
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
#progressChart {
    width: 800px;
    padding: 10px;
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
    height: 30px;
    background-color: #eee;
}

.stage {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #4caf50;
    color: white;
    padding: 0 5px;
}
/* .actual-bar {
    
} */
</style>

```

以下是这个组件所导入的json的数据的示例（计划为通过API获取，这里为开发调试中直接本地导入）
```json
{
    "errorDetail": null,
    "RESULT": "PASS",
    "CODE": 200,
    "MESSAGE": "Query succeeded!",
    "DATA": [
        {
            "id": 12766412,
            "parentId": -1,
            "rootParentId": null,
            "number": "EPLM0000065692",
            "timeOutStatus": 1,
            "projectType": 0,
            "owner":"",
            "projectManager":"",
            "name": "1234cecece",
            "rootParentObject": "1234cecece",
            "projectStatus": 1,
            "   ": "电子事业群",
            "status": 1,
            "description": null,
            "plannedStartDate": "2023-11-08 08:00:00",
            "plannedFinishDate": "2024-09-11 17:00:00",
            "actualStartDate": "2023-11-30 16:04:15",
            "actualFinishDate": null,
            "clientName": "",
            "productName": "12345",
            "innerCode": null,
            "innerOrderNumber": "",
            "progress": "0",
            "ids": [
                {
                    "id": 12766413,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000065693",
                    "timeOutStatus": 1,
                    "projectType": 1,
                    "owner":"",
                    "projectManager":"",
                    "name": "RFQ及评估阶段",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 1,
                    "description": null,
                    "plannedStartDate": "2023-11-08 08:00:00",
                    "plannedFinishDate": "2023-12-14 17:00:00",
                    "actualStartDate": "2023-11-30 16:04:15",
                    "actualFinishDate": null,
                    "clientName": "1",
                    "productName": "12345",
                    "innerCode": "1",
                    "innerOrderNumber": "1",
                    "progress": "3",
                    "ids": null
                },
                {
                    "id": 12766445,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000065725",
                    "timeOutStatus": null,
                    "projectType": 2,
                    "owner":"",
                    "projectManager":"",
                    "name": "RFQ及评估阶段完成关口",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 5,
                    "description": null,
                    "plannedStartDate": null,
                    "plannedFinishDate": "2023-12-14 08:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "null",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "null",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12766446,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000065726",
                    "timeOutStatus": 0,
                    "projectType": 1,
                    "owner":"",
                    "projectManager":"",
                    "name": "项目启动及前期准备阶段",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 0,
                    "description": null,
                    "plannedStartDate": "2023-12-15 08:00:00",
                    "plannedFinishDate": "2024-01-16 17:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12766494,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000065774",
                    "timeOutStatus": null,
                    "projectType": 2,
                    "owner":"",
                    "projectManager":"",
                    "name": "项目启动及前期准备阶段完成关口",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 5,
                    "description": null,
                    "plannedStartDate": null,
                    "plannedFinishDate": "2024-01-16 08:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "null",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "null",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12766495,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000065775",
                    "timeOutStatus": 0,
                    "projectType": 1,
                    "owner":"",
                    "projectManager":"",
                    "name": "打样实施阶段",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 0,
                    "description": null,
                    "plannedStartDate": "2024-01-16 08:00:00",
                    "plannedFinishDate": "2024-05-10 17:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12767160,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000066040",
                    "timeOutStatus": null,
                    "projectType": 2,
                    "owner":"",
                    "projectManager":"",
                    "name": "PVT及认证阶段完成关口",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 5,
                    "description": null,
                    "plannedStartDate": null,
                    "plannedFinishDate": "2024-08-14 17:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "null",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "null",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12767161,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000066041",
                    "timeOutStatus": 0,
                    "projectType": 1,
                    "owner":"",
                    "projectManager":"",
                    "name": "Ramp up（爬坡）阶段",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 0,
                    "description": null,
                    "plannedStartDate": "2024-08-14 08:00:00",
                    "plannedFinishDate": "2024-08-22 17:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12767169,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000066049",
                    "timeOutStatus": null,
                    "projectType": 2,
                    "owner":"",
                    "projectManager":"",
                    "name": "Ramp up（爬坡）阶段完成关口",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 5,
                    "description": null,
                    "plannedStartDate": null,
                    "plannedFinishDate": "2023-11-08 08:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "null",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "null",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12767170,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000066050",
                    "timeOutStatus": 0,
                    "projectType": 1,
                    "owner":"",
                    "projectManager":"",
                    "name": "MP（量产）阶段",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 0,
                    "description": null,
                    "plannedStartDate": "2024-08-22 08:00:00",
                    "plannedFinishDate": "2024-09-11 17:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12767244,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000065924",
                    "timeOutStatus": null,
                    "projectType": 2,
                    "owner":"",
                    "projectManager":"",
                    "name": "打样实施阶段完成关口",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 5,
                    "description": null,
                    "plannedStartDate": null,
                    "plannedFinishDate": "2024-05-10 17:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "null",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "null",
                    "progress": "0",
                    "ids": null
                },
                {
                    "id": 12767245,
                    "parentId": 12766412,
                    "rootParentId": null,
                    "number": "EPLM0000065925",
                    "timeOutStatus": 0,
                    "projectType": 1,
                    "owner":"",
                    "projectManager":"",
                    "name": "PVT及认证阶段",
                    "rootParentObject": "1234cecece",
                    "projectStatus": 1,
                    "modelClassification": "电子事业群",
                    "status": 0,
                    "description": null,
                    "plannedStartDate": "2024-05-10 08:00:00",
                    "plannedFinishDate": "2024-08-14 17:00:00",
                    "actualStartDate": null,
                    "actualFinishDate": null,
                    "clientName": "",
                    "productName": "12345",
                    "innerCode": null,
                    "innerOrderNumber": "",
                    "progress": "0",
                    "ids": null
                }
            ]
        }
    ]
}
```
告诉我可以怎么优化和美化这个组件