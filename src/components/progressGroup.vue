<template>
    <div class="progress-group">
        <!-- <div class="progress-group__title">Progress Group</div> -->
        <div class="progress-group__content">
            <progressbar
                v-for="(item, index) in progressData"
                :key="index"
                :projectData="item"
            ></progressbar>
        </div>
    </div>
</template>

<script>
import totalData from "./getProjectTaskBoard.json";
export default {
    name: "progressGroup",
    components: {
        progressbar: () => import("./progress.vue"),
    },
    data() {
        return {
            progressData: [],
        };
    },
    created() {
        // this.initProgressGroup();
        this.progressData = totalData.DATA;
    },
    mounted() {
        window.kk = this;
        // this.initProgressGroup();
    },
}
</script>

<style scoped>
/* .progress-group__content {
    margin-top: 20px;
} */
</style>