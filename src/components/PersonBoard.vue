<template>
    <div class="PersonBoard">
      <el-button>sozra</el-button>
        <!-- <PersonCard v-for="(person,index) in personList" :key="index" :person="person" /> -->
        <PersonCard :person="personList[0]" />
    </div>
</template>

<script>
// import * as echarts from "echarts";
// import PersonCard from "./PersonCard.vue";
// import axios from "axios";
// import mockData from "../../public/api/personBoard.json";
export default {
  name: "PersonCard",
  components: {
    PersonCard: () => import("./PersonCard"),
  },
  data() {
    return {
      personList: [
        {
            "regularCount": 72,
            "employeeList": [
                {
                    "workNo": "voluptate Ut sunt",
                    "grade": null,
                    "productRate": "aliqua reprehenderit pariatur",
                    "workName": "秦磊",
                    "productCount": 93
                },
                {
                    "workNo": "non",
                    "grade": null,
                    "productRate": "qui consectetur",
                    "workName": "孟霞",
                    "productCount": 56
                },
                {
                    "workNo": "sit",
                    "grade": null,
                    "productRate": "voluptate sunt",
                    "workName": "姜涛",
                    "productCount": 5
                },
                {
                    "workNo": "sint in consequat laborum",
                    "grade": 0,
                    "productRate": "pariatur sed",
                    "workName": "熊超",
                    "productCount": 10
                },
                {
                    "workNo": "ipsum adipisicing Lorem qui",
                    "grade": null,
                    "productRate": "qui amet Ut veniam aute",
                    "workName": "叶娜",
                    "productCount": 43
                },
                {
                    "workNo": "sunt qui non",
                    "grade": 1,
                    "productRate": "culpa",
                    "workName": "范洋",
                    "productCount": 51
                }
            ],
            "processName": "i6(E%f4",
            "practiceCount": 16
        },
        {
            "regularCount": 23,
            "employeeList": [
                {
                    "workNo": "occaecat ea et laboris anim",
                    "grade": null,
                    "productRate": "Excepteur id nisi",
                    "workName": "彭涛",
                    "productCount": 70
                },
                {
                    "workNo": "irure do",
                    "grade": null,
                    "productRate": "sint ut consequat non esse",
                    "workName": "秦平",
                    "productCount": 78
                },
                {
                    "workNo": "elit",
                    "grade": 0,
                    "productRate": "reprehenderit Ut proident",
                    "workName": "李明",
                    "productCount": 87
                },
                {
                    "workNo": "aliquip nisi",
                    "grade": 0,
                    "productRate": "incididunt ipsum dolor ut in",
                    "workName": "谭明",
                    "productCount": 89
                },
                {
                    "workNo": "cupidatat pariatur do",
                    "grade": null,
                    "productRate": "in dolore",
                    "workName": "蔡强",
                    "productCount": 53
                },
                {
                    "workNo": "commodo exercitation cupidatat consequat aute",
                    "grade": 1,
                    "productRate": "ullamco veniam mollit et do",
                    "workName": "何娟",
                    "productCount": 46
                }
            ],
            "processName": "j7zP",
            "practiceCount": 91
        }
    ],
    };
  },
  created() {
    // this.getData();
  },
  mounted() {
    // console.log(mockData)
    window.kk = this;
    // this.getData();
    console.count("PersonBoard");
  },
  methods: {
    getData() {
      // axios
      //   .post("http://127.0.0.1:4523/m1/3456640-0-default/aldev/ms/api/mesCertificate/certificateProcessProductReport")
      //   .then((res) => {
      //     console.log(res.data);
      //     this.personList = res.data.DATA;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });



      // fetch("http://127.0.0.1:4523/m1/3456640-0-default/aldev/ms/api/mesCertificate/certificateProcessProductReport")
      //   .then((res) => res.json())
      //   .then((res) => {
      //     console.log(res);
      //     this.personList = res.DATA;
      //   });
    },
  },
};
</script>