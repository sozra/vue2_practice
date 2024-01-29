<template>
    <div class="testJSX">
        <JSX></JSX>
        <JSX2></JSX2>
        <el-button>sozra</el-button>
    </div>
</template>



<script>
export default {
    name: "testJSX",
    components: {
        'JSX': () => import('../components/jsx.jsx'),
        'JSX2': () => import('./jsx2.jsx')
    },
}
</script>