<template>
  <div>
    <el-form ref="form" :model="form" inline>
      <el-form-item label="SN" prop="sn">
        <el-input
          v-model.trim="form.sn"
          clearable
          @keydown.prevent.native.enter
        />
        <!-- <el-input v-model.trim="form.sn" clearable @keydown.prevent.native.enter="formEnter" /> -->
      </el-form-item>

      <el-form-item class="button-form-item">
        <el-button @click="search" type="primary" icon="el-icon-search"
          >查询
        </el-button>
      </el-form-item>
    </el-form>


    <form action="">
        <label for="uname">输入一个用户名：</label>
        <!-- <input id="uname" name="uname" v-model.trim="form.sn" type="text" @keydown.enter="prevent"   placeholder="一个小写单词"  /> -->
        <input  v-model.trim="form.sn" type="text" @keydown.enter="prevent"  />
    </form>
  </div>
</template>

<script>
export default {
  name: "element",
  data() {
    return {
      tableData: [],
      column: [],
      form: {
        sn: "",
      },
    };
  },
  mounted() {},
  methods: {
    search() {
      console.log(this.form);
    },
    formEnter() {
      console.log("enter");
      this.$message({
        title: "提示",
        message: "Enter",
        type: "info",
      });
      this.search();
    },
    prevent(e) {
        console.log("prevent");
        e.preventDefault();
    }
  },
};
</script>
