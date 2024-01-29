<!--
@author: qiu.yuanyan
@since : 2023-07-11 15:30:19
-->
<template>
  <div class="AfterSalesProcessPallet">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <!-- 循环创建表单项 -->
      <el-form-item v-for="item in formConfig" :key="item.key" :label="item.label" :prop="item.key">
        <template v-if="item.type === 'input'">
          <el-input v-model="form[item.key]" style="width:200px" clearable></el-input>
        </template>
        <template v-else-if="item.type === 'select'">
          <el-select v-model="form[item.key]" style="width:200px" clearable filterable :remote="item.remote"
            :remote-method='this[item.remoteMethod]' >
            <el-option v-for="option in `${item.options}`" :key="option.value" :label="option.label" :value="option.value">
            </el-option>
          </el-select>
        </template>
        <template v-else-if="item.type === 'datepicker'">
          <el-date-picker v-model="form[item.key]" type="datetime" style="width:200px" clearable></el-date-picker>
        </template>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="checkform">提交</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "AfterSalesProcessPallet",
  created() {
    this.actionType = this.$route.params.type;
    if (this.actionType != "add") {
      this.getAuth();
      this.load(this.$route.params.id);
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
  },
  data() {
    return {
      form: {
        issueId: '',
        module: '',
        faultCategory: '',
        province: '',
        vehicleModel: '',
        whetherIqc: '',
        problemwhethersolve: '',
        faultDate: '',
        faultDescription: '',
        produceDate: '',
        saleDate: '',
        mileageDriven: '',
        vehiclevin: '',
        sn: '',
        whetherNeedReplacement: '',
        processingMethod: '',
        returnDate: '',
        inspection: '',
        functionalTesting: '',
        exception: '',
        causeAnalysis: '',
        reportWhetherValid: '',
        measureWhetherValid: '',
        whetherReconsider: '',
        reconsiderResult: '',
        problemWhetherClose: '',
        processState: '',
        createName: "",
        createTime: "",
        updateName: "",
        updateTime: "",
      },
      labelMap: {
        issueId: '申请编码',
        module: '模块',
        faultCategory: '故障类别',
        province: '省份',
        vehicleModel: '车型',
        whetherIqc: '是否IQC',
        problemwhethersolve: '问题是否解决',
        faultDate: '故障日期',
        faultDescription: '故障描述',
        produceDate: '生产日期',
        saleDate: '销售日期',
        mileageDriven: '行驶里程',
        vehiclevin: '车辆VIN',
        sn: '产品S/N',
        whetherNeedReplacement: '是否需要换件',
        processingMethod: '处理方式',
        returnDate: '返回日期',
        inspection: '外观检查',
        functionalTesting: '功能测试',
        exception: '异常类型',
        causeAnalysis: '原因分析',
        reportWhetherValid: '报告是否有效',
        measureWhetherValid: '措施是否有效',
        whetherReconsider: '是否复议',
        reconsiderResult: '复议结果',
        problemWhetherClose: '问题是否关闭',
        processState: '状态',
        createName: "创建人",
        createTime: "创建时间",
        updateName: "更新人",
        updateTime: "更新时间",
      },
      formConfig: [
        { key: 'issueId', label: '申请编码', type: 'select', remote: true, remoteMethod: 'remoteIssueId', options: 'issueIdOptions', loading: 'issueIdLoading'},
        { key: 'module', label: '模块', type: 'select', remote: true, remoteMethod: 'remoteModule', options: 'moduleOptions', loading: 'moduleLoading'},
        { key: 'faultCategory', label: '故障类别', type: 'select', remote: true, remoteMethod: 'remoteFaultCategory', options: 'faultCategoryOptions', loading: 'faultCategoryLoading'},
        { key: 'province', label: '省份', type: 'select', remote: true, remoteMethod: 'remoteProvince', options: 'provinceOptions', loading: 'provinceLoading'},
        { key: 'vehicleModel', label: '车型', type: 'select', remote: true, remoteMethod: 'remoteVehicleModel', options: 'vehicleModelOptions', loading: 'vehicleModelLoading'},
        { key: 'whetherIqc', label: '是否IQC', type: 'select', options: [{ label: '是', value: '是' }, { label: '否', value: '否' }], },
        { key: 'problemwhethersolve', label: '问题是否解决', type: 'select', options: [{ label: '是', value: '是' }, { label: '否', value: '否' }] },
        { key: 'faultDate', label: '故障日期', type: 'datepicker' },
        { key: 'faultDescription', label: '故障描述', type: 'input' },
        { key: 'produceDate', label: '生产日期', type: 'datepicker' },
        { key: 'saleDate', label: '销售日期', type: 'datepicker' },
        { key: 'mileageDriven', label: '行驶里程', type: 'input' },
        { key: 'vehiclevin', label: '车辆VIN', type: 'input' },
        { key: 'sn', label: '产品S/N', type: 'input' },
        { key: 'whetherNeedReplacement', label: '是否需要换件', type: 'select', options: [{ label: '是', value: '是' }, { label: '否', value: '否' }] },
        { key: 'processingMethod', label: '处理方式', type: 'input' },
        { key: 'returnDate', label: '返回日期', type: 'datepicker' },
        { key: 'inspection', label: '外观检查', type: 'input' },
        { key: 'functionalTesting', label: '功能测试', type: 'input' },
        { key: 'exception', label: '异常类型', type: 'input' },
        { key: 'causeAnalysis', label: '原因分析', type: 'input' },
        { key: 'reportWhetherValid', label: '报告是否有效', type: 'select', options: [{ label: '是', value: '是' }, { label: '否', value: '否' }] },
        { key: 'measureWhetherValid', label: '措施是否有效', type: 'select', options: [{ label: '是', value: '是' }, { label: '否', value: '否' }] },
        { key: 'whetherReconsider', label: '是否复议', type: 'select', options: [{ label: '是', value: '是' }, { label: '否', value: '否' }] },
        { key: 'reconsiderResult', label: '复议结果', type: 'input' },
        { key: 'problemWhetherClose', label: '问题是否关闭', type: 'select', options: [{ label: '是', value: '是' }, { label: '否', value: '否' }] },
        { key: 'processState', label: '状态', type: 'input' },
        { key: 'createName', label: "创建人", type: 'input' },
        { key: 'createTime', label: "创建时间", type: 'input' },
        { key: 'updateName', label: "更新人", type: 'input' },
        { key: 'updateTime', label: "更新时间", type: 'input' },
        // ... 其他 select 和 datepicker 类型的配置
        
        // ... 其他 input 类型的配置
      ],
      actionType: "",
      rules: {
      },
      remoteMap: {
        issueId: {
          url: "getIssueIdOption?issueId",
          key: "issueIdOptions",
          query: "issueId",
        },
        province: {
          url: "getProvinceOption?province",
          key: "provinceOptions",
          query: "province",
        },
        faultCategory: {
          url: "getCategoryOption?category",
          key: "faultCategoryOptions",
          query: "category",
        },
        vehicleModel: {
          url: "getVehicleModelOption?vehicleModel",
          key: "vehicleModelOptions",
          query: "vehicleModel",
        },
        module: {
          url: "getModuleOption?module",
          key: "moduleOptions",
          query: "module",
        },
      },
      issueIdOptions: [],
      moduleOptions: [],
      faultCategoryOptions: [],
      provinceOptions: [],
      vehicleModelOptions: [],
      factoryOptions: [],
      issueIdLoading: false,
      provinceLoading: false,
      faultCategoryLoading: false,
      vehicleModelLoading: false,
      moduleLoading: false,
      editObj: {},
      authDo: false || !this.$root.authCheck
    }
  },
  methods: {
    getAuth() {
      let pageAuth = this.$root.findMenuItem(this.$root.getMatchedPath(this.$route), this.$root.auth);
      if (pageAuth && pageAuth.subs && pageAuth.subs.length) {
        this.authDo = true;
      }
    },
    load(id) {
      this.$http.getById(`quality/api/moduleFaultTrace`, id).then(response => {
        if (response.RESULT == "PASS") {
          this.editObj = response.DATA;
          // Object.keys(response.DATA).forEach(key => {
          //   this.form[key] = response.DATA[key];
          // });
          Object.keys(this.form).forEach(key => {
            this.form[key] = this.editObj[key];
          });
        } else {
          alert(response.DATA);
        }
      })
    },
    checkform() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.save();
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    save() {
      Object.keys(this.form).forEach(key => {
        this.editObj[key] = this.form[key];
      });
      if (this.actionType == "add") {
        this.$http.save(`${this.$http.quality_url}moduleFaultTrace`, this.editObj).then(response => {
          if (response.RESULT == "PASS") {
            this.$message.success(this.$t('L40005'));
            this.goback();
          }
          else alert(response.DATA);
        })
      } else {
        this.$http.updateById(`${this.$http.quality_url}moduleFaultTrace`, this.editObj).then(response => {
          if (response.RESULT == "PASS") {
            this.$message.success(this.$t('L40006'));
            this.goback();
          }
          else alert(response.DATA);
        })
      }
    },
    goback() {
      this.$router.push({ path: `/AfterSalesProcess` })
    },
    remoteIssueId(query) {
      console.log(111)
      this.remoteMethod(query, "issueId");
    },
    remoteProvince(query) {
      this.remoteMethod(query, "province");
    },
    remoteFaultCategory(query) {
      this.remoteMethod(query, "faultCategory");
    },
    remoteVehicleModel(query) {
      this.remoteMethod(query, "vehicleModel");
    },
    remoteModule(query) {
      this.remoteMethod(query, "module");
    },
    remoteMethod(query, type) {
      console.log(222)
      let typeObj = this.remoteMap?.[type];
      if (query !== '' && this.remoteMap[type]) {
        // let typeObj = this.remoteMap[type];
        this[typeObj.key + "Loading"] = true;
        this.$http.axios
          // .get(`quality/api/moduleFaultTrace/${typeObj.url}?${typeObj.query}=${query}`).then((res) => {
          .get(`quality/api/moduleFaultTrace/${typeObj.url}=${query}`).then((res) => {
            console.log(3333)
            if (res.RESULT == "PASS") {
              this[typeObj.key] = _.get(res, 'DATA', []);
            }
          }).finally(() => {
            this[typeObj.key + "Loading"] = false;
          });
      } else {
        this[typeObj.key] = [];
      }
    },
  }
}
</script>
