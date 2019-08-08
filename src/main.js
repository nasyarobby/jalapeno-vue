import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import Axios from "axios"
import jwt from "jwt-simple"

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';
const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("jtoken")
  }
})

Vue.prototype.$http = axios;
Vue.prototype.$jwt = jwt;
let token = localStorage.getItem("jtoken");
if (token)
  Vue.prototype.$user = jwt.decode(token, "", true);

Vue.prototype.$url = {
  main_api: API_URL
};

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
}).$mount('#app')