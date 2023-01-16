<template>
  <div id="test_Reactive_Input">
    <!-- String(index) * Date.now() -->
    <div v-for="(item, index) in test" :key="index * 2705" class="inputs-group">
      <el-input v-model="item.value"></el-input>
      <el-button @click="remove(item, index)" type="danger">x</el-button>
    </div>
    <el-button @click="add">+</el-button>
    <el-button @click="minus">-</el-button>
    <br />
    <br />
    <ul>
      <li v-for="(item, index) in test" :key="index * 99">
        {{ item.value }}
      </li>
    </ul>
    <el-button @click="getList">@@@</el-button>
  </div>
</template>

<script>
export default {
  name: "reactInput",
  computed: {
    currentComponent() {
      return {
        Style1,
        Style2,
      }[this.current];
    },
  },
  data() {
    return {
      test: [{ value: "kairi" }],
      testArr: [],
      length: 0,
      testStr: "Ventus",
    };
  },
  methods: {
    add() {
      this.test.push({ value: "" });
    },
    minus() {
      this.test.pop();
    },
    remove(item, index) {
      this.$notify.info({
        title: "消息",
        message: "item: " + item.value + "\nindex: " + index,
      });
      if (this.test.length === 1) {
        this.test[0].value = "";
      } else {
        this.test.splice(index, 1);
      }
    },
    getList() {
this.testArr = [];
      this.test.forEach((el) => {
        if (el.value !== "" && el.value !== undefined) {
          this.testArr.push(el.value);
        }
      });
      this.$notify.info({
        title: "消息",
        message: JSON.stringify(this.testArr),
      });
    },
  },
};
</script>

<style>
.inputs-group {
  display: flex;
  width: 300px;
}
.inputs-group .el-input {
  flex-grow: 1;
}
</style>
