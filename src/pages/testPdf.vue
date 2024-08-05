<template>
  <div class="testPDF">
    <el-button type="primary" @click="downloadPdf">下载</el-button>
    <el-button type="primary" @click="fetchPdf">fetch</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TestPdf",
  data() {
    return {
      blob: null,
    };
  },
  mounted() {
    window.kk = this;
    this.cacheBlob();
  },
  methods: {
    downloadPdf() {
      let params = new FormData();
      // 将 public\template\齿轮出货报告模板.xlsx 附加到 FormData 实例中
      // params.append('file', new File([`/public/template/齿轮出货报告模板.xlsx`], '齿轮出货报告模板.xlsx'));
      // debugger;
      params.append("file", this.blob, "出货报告.pdf");
      // debugger;
      params.append("checkOrder", "IPQC202403191769993992686440448");
      params.append("batchNo", "123");
      params.append("shipmentQty", "123");
      params.append("reviewerName", "王五");
      params.append("approveName", "张三");
      params.append("material", "33");
      params.append("isPdf", "N");
      axios({
        url:
          "http://10.6.78.52:20003/sscl/mes/api/mesFqcChecklist/exportClProductReport",
        method: "POST",
        responseType: "blob",
        data: params,
        headers: {
          // "Content-Type": "application/json",
          token: "05b52a31-b911-458f-93d3-42bfe87ff3a4",
          // code: "FQC_REPORT",
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.xlsx");
        document.body.appendChild(link);
        link.click();
      });
    },
    // 使用fetch 重构downloadPdf
    async fetchPdf() {
      let params = new FormData();
      // 将 public\template\齿轮出货报告模板.xlsx 附加到 FormData 实例中
      // params.append('file', new File([`/public/template/齿轮出货报告模板.xlsx`], '齿轮出货报告模板.xlsx'));
      // debugger;
      params.append("file", this.blob, "出货报告.pdf");
      // debugger;
      params.append("checkOrder", "IPQC202403191769993992686440448");
      params.append("batchNo", "123");
      params.append("shipmentQty", "123");
      params.append("reviewerName", "王五");
      params.append("approveName", "张三");
      params.append("material", "33");
      params.append("isPdf", "N");
      try {
        // 使用fetch请求下载文件
        const response = await fetch(
          "http://10.6.78.52:20003/sscl/mes/api/mesFqcChecklist/exportClProductReport",
          {
            method: "POST",
            headers: {
              token: "05b52a31-b911-458f-93d3-42bfe87ff3a4",
            },
            body: params,
          }
        );
        // 将响应数据转换为Blob对象
        const blob = await response.blob();
        // 现在你可以使用这个blob对象进行后续处理
        console.log("File downloaded as blob:", blob);
        // 例如，你可以创建一个下载链接
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "齿轮出货报告模板.xlsx";
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("下载文件时出错:", error);
      }
    },

    async cacheBlob() {
      try {
        // 假设文件名为 example.pdf，位于 public 目录下
        const response = await axios.get("/齿轮出货报告模板.xlsx", {
          responseType: "blob",
        });

        // 将响应数据转换为Blob对象
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        this.blob = blob;
        // 现在你可以使用这个blob对象进行后续处理
        console.log("File downloaded as blob:", blob);

        // 例如，你可以创建一个下载链接
        // const url = window.URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = '齿轮出货报告模板.xlsx';
        // link.click();
        // window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("下载文件时出错:", error);
      }
    },
  },
};
</script>
