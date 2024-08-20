<template>
    <div class="TaskStatus">
        <div class="done status-block">
            <div class="status-inner">
                <i class="el-icon-s-flag"></i>
                <div class="status-inner-text">
                    <div>已完成</div>
                    <div>数量</div>
                    <div>{{ taskStatus.done }}</div>
                </div>
            </div>
        </div>
        <div class="todo status-block"></div>
        <div class="due status-block"></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    taskStatus: {
        type: Object,
        default: () => ({
            done: 0,
            todo: 0,
            due: 0,
        }),
    },
});
</script>


<style scoped>
.TaskStatus {
    height: 200px;
    display: flex;
    justify-content: space-between;
    /* margin: 15px 20px 0; */
    margin: 15px 0 0 ;
    padding: 10px 0;
    /* border-bottom: 1px solid #ebeef5; */
    column-gap: 10px;
}
.status-block {
    height: 100%;
    flex-grow: 1;
    border-radius: 5px;
}
.done {
    background-color: #5e74cd;
}
.todo {
    background-color: #59a2ed;
}
.due {
    background-color: #fde032;
}
</style>