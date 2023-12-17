import './assets/main.css';
import 'primeflex/primeflex.min.css';

import * as Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import CapitalizePlugin from './plugins/capitalize-plugin';

const app = Vue.createApp(App);

app.use(router);

axios.defaults.baseURL = 'https://localhost:7220/api';
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

const pinia = createPinia();
app.use(pinia);

app.use(CapitalizePlugin, { firstWordOnly: false });

app.mount('#app');
