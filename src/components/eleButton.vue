<template>
    <!-- <div> -->
        <el-button type="info">{{ buttonText }}</el-button>
    <!-- </div> -->
</template>


<script>
export default {
    name: "eleButton",
    data() {
        return {
            tableData: [],
            column: [],
            buttonText: 'sozra'
        };
    },
    mounted() {

    },
    methods: {
        handleClick() {
            console.log('click');
        }
    }
};
</script>