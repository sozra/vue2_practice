<template>
    <div id="testpdf">
        <el-button  @click="exportToPDF">export</el-button>
        <el-progress type="circle" :percentage="percentage"></el-progress>
        <div id="eee">
            <el-table header-row-class-name="nowrap"  border  :row-style="{height:'40px'}" :cell-style="{padding:'0px'}"
                :data="dialogTableData" style="width: 100%">
            <el-table-column show-overflow-tooltip  type="index" label="序号" align="center" width="0"
                :index="indexMethod">
            </el-table-column>
            <el-table-column show-overflow-tooltip label="托盘号" prop="palletNo" align="center" min-width="150"></el-table-column>
            <el-table-column show-overflow-tooltip label="物料号" prop="matNo" align="center" min-width="120"></el-table-column>
            <el-table-column show-overflow-tooltip label="物料描述" prop="description" align="center" min-width="300"></el-table-column>
            <el-table-column show-overflow-tooltip label="包数" prop="boxNum" align="center" ></el-table-column>
            <el-table-column show-overflow-tooltip label="数量" prop="snNum" align="center" ></el-table-column>
            <el-table-column show-overflow-tooltip label="单位" prop="unit" align="center" ></el-table-column>
    <!-- 订单号 -->
            <el-table-column show-overflow-tooltip label="订单号" prop="order" align="center" ></el-table-column>
            <el-table-column show-overflow-tooltip label="接收库位" prop="receiveLocation" align="center" ></el-table-column>
            <!-- 备注 -->
            <el-table-column show-overflow-tooltip label="备注" prop="desc" align="center" ></el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {DATA} from './testpdf.json';
export default {
    name: "testpdf",
    data() {
        return {
            percentage: 0,
            dialogTableData: [],
        };
    },
    created() {
        this.dialogTableData = DATA.map((el,index)=>{el.palletNo = index+1;return el;});
    },
    mounted() {

    },
    methods: {
        indexMethod(index) {
            // return index + (this.currentPage - 1) * this.pageSize + 1;
            return index + 1;
        },
        async  exportToPDF() {
            const rowsPerPage = 20; // 每页显示的行数
            const tableData = this.dialogTableData; // 你的全部数据
            const pages = this.chunkData(tableData, rowsPerPage); // 分批数据
            console.log("pages", pages);
            console.log(`pages.length: ${pages.length}`);
            const pdf = new jsPDF('l', 'mm', 'a4');
            // const pdf = new jsPDF('', 'pt', 'a4');

            for (let i = 0; i < pages.length; i++) {
                this.dialogTableData = pages[i]; // 更新Vue组件中的数据
                await this.$nextTick(); // 等待Vue更新DOM

                const table = document.getElementById('eee');
                await html2canvas(table).then(canvas => {


                const imgData = canvas.toDataURL('image/png');
                // const imgData = canvas.toDataURL('image/jpeg', 1.0);
                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, 0);


                });

                // 可选：更新进度条或状态
                // updateProgress((i + 1) / pages.length);
                this.percentage = (i + 1) / pages.length * 100;
            }

            pdf.save('table.pdf');
        },
        chunkData(data, size) {
            const result = [];
            for (let i = 0; i < data.length; i += size) {
                result.push(data.slice(i, i + size));
            }
            return result;
        },

    },
};
</script>