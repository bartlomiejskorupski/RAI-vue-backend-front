import './assets/main.css'
import 'primeflex/primeflex.min.css';

import * as Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = Vue.createApp(App);

app.use(router);

axios.defaults.baseURL = 'https://localhost:7220/api';
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

app.config.globalProperties.test = 'TEST WORKS';
app.config.globalProperties.$filters = {
  capitalize(value: string) {
    return value.toUpperCase();
  }
}

app.mount('#app');
