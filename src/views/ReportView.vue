<template>
  <div>
    <div>
      {{ toDay }}
    </div>
    <DatePicker v-model="toDay">
      <template #default="{ inputValue, inputEvents }">
        <input
          class="px-3 py-1 border rounded"
          :value="inputValue"
          v-on="inputEvents"
        />
      </template>
    </DatePicker>
    <div>
      <button @click="getReportData(1)">年</button>
      <button @click="getReportData(2)">月</button>
      <button @click="getReportData(3)">日</button>
    </div>
    <div class="col-9 mx-auto">
      <BarChart />
    </div>
  </div>
</template>

<script>
import { DatePicker } from "v-calendar";
import BarChart from "../components/BarChart.vue";
import { ref,onMounted } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    BarChart,
    DatePicker,
  },
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch("getLocalStorageData"));
    onMounted(() => getReportData(2))
    // const dickPick = ref(new Date())
    const toDay = ref(new Date());
    // const masks = {input: 'YYYY-MM-DD'}
    function seletedReportDate() {
      console.log(toDay)
      console.log(toDay.value.toISOString().slice(0, 10))
      // store.dispatch("seletedReportDate", toDay.value.toISOString().slice(0, 10));
      store.dispatch("seletedReportDate", toDay.value);
    }
    function getReportData(num) {
      seletedReportDate();
      store.dispatch("getReportData",num);
    }
    // const seletedReportDate = computed(() => store.getters.seletedReportDate);
    return {
      // masks,
      getReportData,
      seletedReportDate,
      // dickPick,
      toDay,
    };
  },
};
</script>
