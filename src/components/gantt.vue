<template>
  <div class="gantt">
    <svg id="gantt"></svg>
  </div>
</template>

<script>
import Gantt from "frappe-gantt";
import "frappe-gantt/dist/frappe-gantt.css";
export default {
  name: "gantt",
  data() {
    return {};
  },
  mounted() {
    window.kk = this;
    var tasks = [
      {
        id: "Task 1",
        name: "Redesign website",
        start: "2016-12-28",
        end: "2016-12-31",
        progress: 20,
        dependencies: "Task 2, Task 3",
      },
    ];
    var gantt = new Gantt("#gantt", tasks);
  },
};
</script>
