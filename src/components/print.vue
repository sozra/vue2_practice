<template>
    <div>
        <el-button @click="getDialogData">dialog</el-button>

<!-- <el-button style="display:unset;"  icon="el-icon-download" @click="dialogfExport()">export</el-button> -->
    <!-- <div > -->
        <el-dialog title='' :visible.sync="dialogVisible" width="1350px" @close="onDialogClose">
      <div slot="title">
        <el-button style="display:unset;"  icon="el-icon-download" @click="dialogfExport()">export</el-button>
      </div> 
      <div id="printJS-form">
      <div class="header1" style="">
        <img src="@/assets/logo_red.png" height="36" alt="byd-logo" style="scale:0.5; transform-origin:left;" />
        <h1 style="font-size:20px;">生产进仓交货单</h1>
        <div class="header1-right" style=""> 
          <div>
            <span>签单时间：</span>
            <span>{{dialogHeader.updateTime}}</span>
          </div>
          <div>
            <span>SAP凭证号：</span>
            <span>{{dialogHeader.sapReceipt}}</span>
          </div>
        </div>
      </div>
      <div class="header2">
        <div>
            <span>公司：</span>
            <span>{{mesSysConfig['公司']}}</span>
          </div>
          <div>
            <span>事业部：</span>
            <span>{{mesSysConfig['事业部']}}</span>
          </div>
        <div>
            <span>工厂：</span>
            <span>{{mesSysConfig['工厂']}}</span>
          </div>
          <div>
            <span>交货单号：</span>
            <span>{{dialogHeader.deliveryNo}}</span>
          </div>
          <div>
            <span>创建时间：</span>
            <span>{{dialogHeader.createTime}}</span>
          </div>
      </div>
      <div></div>
      <!-- <el-table ref="table" v-loading="dialogLoading"  element-loading-text="加载中" header-row-class-name="nowrap"  border :row-style="{height:'40px'}" :cell-style="{padding:'0px'}"
      :data="dialogTableData" style="width: 100%">
        <el-table-column   type="index" label="id" align="center" width="0"
        :index="indexMethod">
        </el-table-column>
        <el-table-column  label="托盘号" prop="palletNo" align="center" min-width="150"></el-table-column>
        <el-table-column  label="物料号" prop="matNo" align="center" min-width="120"></el-table-column>
        <el-table-column  label="物料描述" prop="description" align="center" min-width="300"></el-table-column>
        <el-table-column  label="包数" prop="boxNum" align="center" ></el-table-column>
        <el-table-column  label="数量" prop="snNum" align="center" ></el-table-column>
        <el-table-column  label="单位" prop="unit" align="center" ></el-table-column>
        <el-table-column  label="订单号" prop="order" align="center" ></el-table-column>
        <el-table-column  label="接收库位" prop="receiveLocation" align="center" ></el-table-column>
        <el-table-column  label="备注" prop="desc" align="center" ></el-table-column>
      </el-table> -->
      <table>
                <thead>
                    <tr>
                        <td style="width: 50px;">id</td>
                        <td>托盘号</td>
                        <td>物料号</td>
                        <td>物料描述</td>
                        <td style="width: 50px;">包数</td>
                        <td style="width: 50px;">数量</td>
                        <td style="width: 50px;">单位</td>
                        <td>订单号</td>
                        <td style="width: 100px;">接收库位</td>
                        <td>备注</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in dialogTableData" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.palletNo }}</td>
                        <td>{{ item.matNo }}</td>
                        <td style="text-align:left;">
                            <!-- <p style="text-align:left; display: flex; justify-content: center;"> -->
                                
                            {{ item.description }}
                            <!-- </p> -->
                            </td>
                        <td>{{ item.boxNum }}</td>
                        <td>{{ item.snNum }}</td>
                        <td>{{ item.unit }}</td>
                        <td>{{ item.order }}</td>
                        <td>{{ item.receiveLocation }}</td>
                        <td>{{ item.desc }}</td>
                    </tr>
                </tbody>
            </table>



      <div style="display: flex; margin-top:10px;">
        <span style="width:1000px;">第一联 存根； 第二联 仓库； 第三联 成本； 第四联 物控；</span>
        <span style="width:400px;">入仓单位签名：</span>
        <span style="width:400px;">收货单位签名：</span>
      </div>
      </div>
    <!-- </div> -->
    </el-dialog>
    </div>
</template>

<script>
import data from './print.json'
import printJS from 'print-js'
export default {
    data() {
        return {
            dialogVisible: false,
            dialogLoading: false,
            dialogHeader: {
                updateTime: '2020-10-10',
                sapReceipt: '123456789',
                deliveryNo: '123456789',
                createTime: '2020-10-10',
            },
            dialogTableData: [],
            mesSysConfig: {
                '公司': 'BYD',
                '事业部': 'BYD',
                '工厂': 'BYD',
            },
        }
    },
    methods: {
        dialogfExport() {
            // this.$refs.table.exportCsv({
            //     filename: '生产进仓交货单',
            //     original: false
            // });
            printJS({
                printable: 'printJS-form',
                type: 'html',
                maxWidth: '100%',
                targetStyles: ['*'],
                documentTitle: '生产进仓交货单',
                header: ' ',
            })
        },
        onDialogClose() {
            this.dialogVisible = false;
            // this.dialogLoading = false;
            // this.dialogHeader = {};
            // this.dialogTableData = [];
        },
        indexMethod(index) {
            return index + 1;
        },
        async getMesSysConfig() {
            // const res = await this.$api.getMesSysConfig();
            // if (res.code === 0) {
            //     this.mesSysConfig = res.data;
            // }
        },
        async getDialogData() {
            // this.dialogLoading = true;
            // const res = await this.$api.getDialogData();
            // if (res.code === 0) {
            //     this.dialogHeader = res.data.header;
            //     this.dialogTableData = res.data.table;
                this.dialogVisible = true;
            // }
            // this.dialogLoading = false;
        },
    },
    mounted() {
        // this.$nextTick(() => {
        //     //获取el-table的thead dom节点
        //     let thead = this.$refs.table.$el.querySelector('.el-table__header-wrapper thead');
        //     //追加到el-table的内容里去
        //     this.$refs.table.$el.querySelector('.el-table__body-wrapper table').appendChild(thead)
        // })
        // this.getMesSysConfig();
        this.dialogTableData = data.DATA.slice(0, 250);

    },
}
</script>

<style scoped>
.header1 {
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.header1-right {
  display:flex;
  flex-direction:column;
}
.header1-right>div {
  width: 250px;
}
.header2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-bottom: 20px;
}
::v-deep .el-dialog__body {
  padding-top: 0px;
}
#printJS-form {
    width: 1300px;
}
td {
    text-align: center;
}
table, th, td {
    border: 1px solid;
}

/* 隐藏咱们dom操作添加的节点，不影响el-table原功能 */
    .el-table .el-table__body-wrapper table thead{
        display:none;
    }
    /* 在打印的时候隐藏el-table的表头，开放咱们dom操作添加的节点 */
    @media print{
        .el-table .el-table__header-wrapper{
            display:none;
        }
        .el-table .el-table__body-wrapper table thead{
            display:table-header-group;
        }
        #printJS-form {
            width: 500px !important;
        }
    }
    @page {
        size: a4 landscape;
    }
    
</style>