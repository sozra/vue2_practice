 <template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <el-descriptions
      title="垂直带边框列表"
      direction="vertical"
      :column="4"
      border
    >
      <el-descriptions-item label="propC">{{propC}}</el-descriptions-item>
    </el-descriptions>
<el-button @click="submit">确认</el-button>
  </div>
</template>

  <script>
import { emit } from 'process';

export default {
  name: "page2",
  props: {
    propC: {
      type: String,
      required: false,
      default: '100'
    },
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
methods: {
submit() {
this.$emit('diag1-callback', 'Xehanort','Xion')
},
}
};
</script>