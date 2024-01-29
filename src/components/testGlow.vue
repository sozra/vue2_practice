<template>
    <div class="testGlow">
        <div class="card"></div>
    </div>
</template>


<script>
export default {
    name: "testGlow",
    mounted() {
        window.kk = this;
        document.addEventListener("mousemove", (e) => {
            document.documentElement.style.setProperty("--x", e.offsetX + "px");
            document.documentElement.style.setProperty("--y", e.offsetY + "px");
        });
    },
};
</script>


<style scoped>
:root {
    --x: 10px;
    --y: 10px;
}
.testGlow {
    width: 100vw;
    height: 100vh;
    background: lightcyan;
    /*   overflow:hidden; */
    /*   z-index: 3; */
}
.card {
    position: absolute;
    width: 300px;
    height: 500px;
    inset: 0;
    margin: auto;
    background-color: lightblue;
    background: lightblue;
    /*   right: var(--x); */
    /*   bottom: var(--y); */
    /*   width: 1000px; */
    /*   height: 1000px; */
    /* width: 100%; */
    /* height: 100%; */
    /* mask: radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%); */
    /* transition: 400ms mask ease; */
    border: 3px solid transparent;
    border-image: radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%);
    /*   z-index: 1; */
}
</style>