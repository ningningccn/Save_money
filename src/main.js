import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import VueGoogleCharts from "vue3-googl-chart";
import VCalendar from "v-calendar";
import excel from 'vue-excel-export'

createApp(App)
  .use(router)
  .use(store)
  .use(VCalendar, {})
  .use(VueGoogleCharts)
  .use(excel)
  .mount("#app");
