<template>
  <div id="wmsWorkOrderSendMaterials">
    <el-form ref="maForm" id="maForm" :model="maForm" :rules="validateRules" label-width="80px">
      <el-form-item label="备料类型" prop="type">
        <el-select
          v-model="maForm.type"
          placeholder="请选择"
          @change="typeChange"
        >
          <el-option
            v-for="(item, index) in typeOptionList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="线别" prop="line">
        <el-select
          v-model="maForm.line"
          placeholder="请选择"
          @change="getWorkOrderInformation"
        >
          <el-option
            v-for="(item, index) in lineOptionList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工单号" prop="shopOrder">
        <el-select v-model="maForm.shopOrder" placeholder="请选择">
          <el-option
            v-for="(item, index) in shopOrderOptionList"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="面别" prop="face">
        <el-select
          v-model="maForm.face"
          placeholder="请选择"
          :disabled="flflDisabled"
clearable
        >
          <el-option
            v-for="(item, index) in faceOptionList"
            :key="index"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="模组" prop="module">
        <el-select
          v-model="maForm.module"
          placeholder="请选择"
          :disabled="flflDisabled"
clearable
        >
          <el-option
            v-for="(item, index) in moduleOptionList"
            :key="index"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="站位" prop="zhanwei">
        <el-select
          v-model="maForm.zhanwei"
          placeholder="请选择"
          :disabled="flflDisabled"
clearable
        >
          <el-option
            v-for="(item, index) in zhanweiOptonList"
            :key="index"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
<el-form-item >
<el-button type="primary" @click="rootSubmit">确认</el-button>
</el-form-item>
    </el-form>

    <el-button @click="dialogTableVisible = true" >Diag 1</el-button>
    <el-button>Diag 2</el-button>
    <el-dialog :visible.sync="dialogTableVisible" fullscreen>
      <page2 propC="Ventus" @diag1-callback="diag1Callback" />
    </el-dialog>

    
  </div>
</template>


<script>
import axios from "axios";
// import page2 from "@/views/pda/h093/page_2.vue";
import page2 from "@/components/H093/page_2.vue"

export default {
  name: "wmsWorkOrderSendMaterials",
  components: {
    page2,
  },
  created() {
    // this.token = this.$http.token;
this.token = '';
    this.getLineList();
  },
  mounted() {},
  data() {
var validateType = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入备料类型"));
      } else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
        callback();
      }
    };
var validateLine= (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入线别"));
      } else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
        callback();
      }
    };
var validateShopOrder= (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入工单号"));
      } else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
        callback();
      }
    };

    var validateFace = (rule, value, callback) => {
      if (this.maForm.type == "CFWL" && value == "") {
        callback(new Error("请输入面别"));
      } else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
        callback();
      }
    };
var validateModule = (rule, value, callback) => {
      if (this.maForm.type == "CFWL" && value == "") {
        callback(new Error("请输入模组"));
      } else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
        callback();
      }
    };
var validateZhanwei = (rule, value, callback) => {
      if (this.maForm.type == "CFWL" && value == "") {
        callback(new Error("请输入站位"));
      } else {
        //   if (this.ruleForm.checkPass !== '') {
        //     this.$refs.ruleForm.validateField('checkPass');
        //   }
        callback();
      }
    };
    return {
      baseURL: 'http://rap2api.taobao.org/app/mock/309120',
      dialogTableVisible: false,
      token: "",
      validateRules: {
type: [{ validator: validateType, trigger: ['blur', 'change'] }],
line: [{ validator: validateLine, trigger: ['blur', 'change'] }],
shopOrder: [{ validator: validateShopOrder, trigger: ['blur', 'change'] }],

        face: [{ validator: validateFace, trigger: ['blur', 'change'] }],
module: [{ validator: validateModule, trigger: ['blur', 'change'] }],
zhanwei: [{ validator: validateZhanwei, trigger: ['blur', 'change'] }],
      },
      typeOptionList: [
        {
          label: "首套料备料",
          value: "STLBL",
        },
        {
          label: "次套料备料",
          value: "CTLBL",
        },
        {
          label: "辅料发料",
          value: "FLFL",
        },
        {
          label: "超发物料",
          value: "CFWL",
        },
      ],
      lineOptionList: [],
      shopOrderOptionList: [],
      faceOptionList: [
        {
          label: "a",
          value: "a",
        },
        {
          label: "b",
          value: "b",
        },
        {
          label: "c",
          value: "c",
        },
        {
          label: "d",
          value: "d",
        },
      ],
      moduleOptionList: [
        {
          label: "1",
          value: "1",
        },
        {
          label: "2",
          value: "2",
        },
        {
          label: "3",
          value: "3",
        },
        {
          label: "4",
          value: "4",
        },
      ],
      zhanweiOptonList: [
        {
          label: "sora",
          value: "sora",
        },
        {
          label: "riku",
          value: "riku",
        },
        {
          label: "kairi",
          value: "kairi",
        },
        {
          label: "ventus",
          value: "ventus",
        },
      ],
      maForm: {
        type: "",
        line: "",
        shopOrder: "",
        face: "",
        module: "",
        zhanwei: "",
      },
    };
  },
  computed: {
    flflDisabled() {
      return this.maForm.type == "FLFL";
    },
  },
  methods: {
    // 线体接口
    getLineList() {
      // var pre_url = this.$http.pre_url;
      // var pre_url = "http://10.12.5.188:20016/wms3.0/wms";
var pre_url = this.baseURL;

      var url = "/api/wmsLinecodeRelationStoragelocation/getList";
      var querys = "?token=" + this.token;
      var params = {
        warehouseId: 20106301,
      };
      // this.$http.axios.post(pre_url + url + querys, params).then((res) => {
axios.get(pre_url + url + querys, params).then((res2) => {
const res = res2.data;
// console.log(`res is: ${JSON.stringify(res)}`)
        if ("PASS" === res.RESULT) {
          console.log("getLineList DATA: " + JSON.stringify(res.DATA));
          this.lineOptionList = [];
          for (var i = 0; i < res.DATA.length; i++) {
            this.lineOptionList.push(res.DATA[i].lineCode);
          }
        }
      });
    },
    // 工单接口
    getWorkOrderInformation() {
      // var pre_url = this.$http.pre_url;
      var pre_url = "http://10.12.5.188:20016/wms3.0/wms";

      //   var line = "S201_H6";
      var line = this.maForm.line;
      var warehouseGroupId = "";
      var url = "/api/wmsWorkOrderSendMaterials/getWorkOrderInformation";
      var querys =
        "?token=" + this.token + "&line=" + line + "&warehouseGroupId=20103801";
      this.$http.axios.post(pre_url + url + querys).then((res) => {
        if ("PASS" === res.RESULT) {
          console.log("shopOrder DATA: " + JSON.stringify(res.DATA));
          this.shopOrderOptionList = [];
          for (var i = 0; i < res.DATA.length; i++) {
            this.shopOrderOptionList.push(res.DATA[i].SAP_SHOPORDER);
          }
        }
      });
    },
    // 获取工单数据，好像是同一个接口 - -
    getScheduling() {
      // var pre_url = this.$http.pre_url;
      var pre_url = "";

      //   var line = "S201_H6";
      var line = this.maForm.line;
      var url =
        "http://10.6.80.47/MES2/Service.action?method=GetScheduling&param=";
      var querys = "{LOGIN_ID:-1,CLIENT_ID:1,LINE:" + line + "}";
      this.$http.axios.post(pre_url + url + querys).then((res) => {
        if ("PASS" === res.RESULT) {
          console.log("getScheduling DATA: " + JSON.stringify(res.DATA));
        }
      });
    },
    // 面别、模组、站位接口
    getListString() {
      console("getListString CallBack");
    },
    typeChange() {
      if (this.maForm.type == "FLFL") {
        this.maForm.face = "";
        this.maForm.module = "";
        this.maForm.zhanwei = "";
      }
    },
    rootSubmit() {
      console.log(`maForm is: ${JSON.stringify(this.maForm)}`);

      this.$refs['maForm'].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
diag1Callback(arg1='', arg2='') {
this.$notify({
          title: arg1,
          message: arg2,
          type: 'success'
        });
this.maForm.zhanwei = 'kairi';
this.dialogTableVisible = false;
},
    // validate() {
    //     if (this.maForm.type == "FLFL") {
    //     if (this.maForm.line == "")

    //   }
    //   else if(this.maForm.type == "FLFL") {
    //     null;
    //   }
    // },
  },
};
</script>


<style scoped>
.wmsWorkOrderSendMaterials .required::before {
content: '*';
font-size: 20px;
}
</style>