import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap";
import VueGoogleCharts from "vue3-googl-chart";
import VCalendar from "v-calendar";
// import JsonExcel from "vue-json-excel";
import excel from 'vue-excel-export'

createApp(App)
  .use(router)
  .use(VCalendar, {})
  .use(VueGoogleCharts)
  .use(excel)
  .mount("#app");
