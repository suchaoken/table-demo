import { createApp } from 'vue'
import App from './App.vue'
import './assets/bootstrap-5.1.0-dist/css/bootstrap.css'
import '../index.css'
import axios from 'axios'
const app =createApp(App)
axios.defaults.baseURL='https://www.escook.cn'
app.config.globalProperties.$http=axios
app.mount('#app')
