export default {
  name: "MyJsxComponent",
  data() {
    return {
      form: {
        issueId: "",
        module: "",
        faultCategory: "",
        province: "",
        vehicleModel: "",
        whetherIqc: "",
        problemwhethersolve: "",
        faultDate: "",
        faultDescription: "",
        produceDate: "",
        saleDate: "",
        mileageDriven: "",
        vehiclevin: "",
        sn: "",
        whetherNeedReplacement: "",
        processingMethod: "",
        returnDate: "",
        inspection: "",
        functionalTesting: "",
        exception: "",
        causeAnalysis: "",
        reportWhetherValid: "",
        measureWhetherValid: "",
        whetherReconsider: "",
        reconsiderResult: "",
        problemWhetherClose: "",
        processState: "",
        createName: "",
        createTime: "",
        updateName: "",
        updateTime: "",
      },
      formConfig: [
        {
          key: "issueId",
          label: "申请编码",
          type: "select",
          options: [
            { value: "1", label: "sozra" },
            { value: "43", label: "kairi" },
          ],
        },
        {
          key: "module",
          label: "模块",
          type: "select",
          options: [
            { value: "1", label: "sozra" },
            { value: "43", label: "kairi" },
          ],
        },
        // ... 其他 select 和 datepicker 类型的配置
        { key: "faultDescription", label: "故障描述", type: "input" },
        // ... 其他 input 类型的配置
      ],
      loading: false,
    };
  },
  methods: {
    handleChange(key, value) {
      this.form[key] = value;
    },
    getAuth() {
      let pageAuth = this.$root.findMenuItem(
        this.$root.getMatchedPath(this.$route),
        this.$root.auth
      );
      if (pageAuth && pageAuth.subs && pageAuth.subs.length) {
        this.authDo = true;
      }
    },
    load(id) {
      this.$http
        .getById(`quality/api/moduleFaultTrace`, id)
        .then((response) => {
          if (response.RESULT == "PASS") {
            this.editObj = response.DATA;
            // Object.keys(response.DATA).forEach(key => {
            //   this.form[key] = response.DATA[key];
            // });
            Object.keys(this.form).forEach((key) => {
              this.form[key] = this.editObj[key];
            });
          } else {
            alert(response.DATA);
          }
        });
    },
    checkform() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.save();
        } else {
          //console.log('error submit!!');
          return false;
        }
      });
    },
    save() {
      Object.keys(this.form).forEach((key) => {
        this.editObj[key] = this.form[key];
      });
      if (this.actionType == "add") {
        this.$http
          .save(`${this.$http.quality_url}moduleFaultTrace`, this.editObj)
          .then((response) => {
            if (response.RESULT == "PASS") {
              this.$message.success(this.$t("L40005"));
              this.goback();
            } else alert(response.DATA);
          });
      } else {
        this.$http
          .updateById(`${this.$http.quality_url}moduleFaultTrace`, this.editObj)
          .then((response) => {
            if (response.RESULT == "PASS") {
              this.$message.success(this.$t("L40006"));
              this.goback();
            } else alert(response.DATA);
          });
      }
    },
    goback() {
      this.$router.push({ path: `/AfterSalesProcess` });
    },
  },
  render(h) {
    const renderFormItem = (item) => {
      const { key, label, type, options, remote, remoteMethod } = item;
      const value = this.form[key];

      switch (type) {
        case "input":
          return (
            <ElInput
              value={value}
              onInput={(val) => this.handleChange(key, val)}
            />
          );
        case "select":
          return (
            <ElSelect
              value={value}
              filterable
              remote={remote}
              remoteMethod={() => this[remoteMethod]()}
              onChange={(val) => this.handleChange(key, val)}
            >
              {options.map((opt) => (
                <ElOption key={opt.value} label={opt.label} value={opt.value} />
              ))}
            </ElSelect>
          );
        case "datepicker":
          return (
            <ElDatePicker
              value={value}
              onChange={(val) => this.handleChange(key, val)}
            />
          );
        default:
          return null;
      }
    };

    return (
      <ElForm {...{ props: { model: this.form } }}>
        {this.formConfig.map((item) => (
          <ElFormItem key={item.key} label={item.label}>
            {renderFormItem(item)}
          </ElFormItem>
        ))}
        {/* 其他 JSX 元素 */}
      </ElForm>
      // <button>kairi</button>
    );
  },
};
