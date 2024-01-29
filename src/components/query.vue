<template>
    <div class="query">
        <!-- <el-button>sozra</el-button> -->
        <div style="background-color: white; white-space: break-spaces;">{{queryData}}</div>
    </div>
</template>
<script>
export default {
    name: "query",
    data() {
        return {
            queryData: {},
            // tableData: [],
            // column: [],
            // dialogVisible: false,
            // dialogData: "",
        };
    },
    // mounted() {
    //     window.kk = this;
    //     // this.query();
    //     this.$message({
    //         message: 'Kairi',
    //         type: 'success'
    //     });
    // },
    mounted() {
        window.kk = this;
        // this.initTable();
        this.queryData = (JSON.stringify(this.$route.query, null, 4));
    },
    methods: {
        // query() {
        //     this.$axios.get("/api/query").then((res) => {
        //         this.tableData = res.data;
        //         this.column = Object.keys(this.tableData[0]);
        //     });
        // },
        // showJson(data) {
        //     this.dialogData = JSON.stringify(data, null, 2);
        //     this.dialogVisible = true;
        // },
    },
}
</script>


<style scoped>
.query {
    background: white;
    background-color: white;
    width: 1500px;
    height: 800px;
}
</style>