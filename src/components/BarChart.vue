<template>
  <div>{{ShowReportContext.showReportDate}}</div>
  <div>
    <GChart type="ColumnChart" :data="ShowReportContext.payReport" :options="chartOptions" />
    <!-- {{ShowReportContext.payReport}} -->
  </div>
  <div class="col-8 mx-auto">
  <table class="table">
    <thead>
      <tr v-if="ShowReportContext.payReport.length>0">
        <th scope="col">{{ ShowReportContext.payReport[0][0] }}</th>
        <th scope="col">{{ ShowReportContext.payReport[0][1] }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item ,index) in ShowReportContext.payReport" :key="item">
        <td v-if="index >=1"> {{item[0]}}</td>
        <td v-if="index >=1"> ${{item[1]}}</td>
      </tr>
    </tbody>
  </table>
  </div>
  <div>{{ShowReportContext.showReportDate}}</div>
  <div>
    <GChart type="ColumnChart" :data="ShowReportContext.incomeReport" :options="chartOptions" />
    {{ShowReportContext.incomeReport}}
  </div>
  <div class="col-8 mx-auto">
    <table class="table">
      <thead>
        <tr v-if="ShowReportContext.incomeReport.length>0">
          <th scope="col">{{ ShowReportContext.payReport[0][0] }}</th>
          <th scope="col">{{ ShowReportContext.payReport[0][1] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item ,index) in ShowReportContext.incomeReport" :key="item">
          <td v-if="index >=1"> {{item[0]}}</td>
          <td v-if="index >=1"> ${{item[1]}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// import {reactive} from 'vue'
import { GChart } from "vue3-googl-chart";
import {reactive, computed} from "vue"
import {useStore} from "vuex"

export default {
  components: {
    GChart,
  },
  setup(){
    const store = useStore();
    const chartData = reactive(
      [
        ["Year", "Sales"],
        ["2014", 1000],
        ["2015", 1170],
        ["2016", 660],
        ["2017", 1030],
      ],
    )
    const chartOptions = reactive({
      chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
      }
    })
    const ShowReportContext = computed(() => store.getters.ShowReportContext);
    console.log('ShowReportContext: ', ShowReportContext.value.incomeReport);
    return{
      chartOptions,
      chartData,
      ShowReportContext,
    }
  }
  // data() {
  //   return {
  //     // Array will be automatically processed with visualization.arrayToDataTable function
  //     chartData: [
  //       // ["Year", "Sales"],
  //       // ["2014", 1000],
  //       // ["2015", 1170],
  //       // ["2016", 660],
  //       // ["2017", 1030],
  //     ],
  //     chartOptions: {
  //       chart: {
  //         title: "Company Performance",
  //         subtitle: "Sales, Expenses, and Profit: 2014-2017",
  //       },
  //     },
  //   };
  // },
};
</script>
