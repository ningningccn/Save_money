import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"
import VueGoogleCharts from 'vue3-googl-chart'

createApp(App).use(router).use(VueGoogleCharts).mount('#app')

