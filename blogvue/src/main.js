// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;
// axios.defaults.baseURL = 'http://127.0.0.1:8191/'; // 填写后台请求统一的地址
axios.defaults.baseURL = "/apihttp"; // 填写后台请求统一的地址
Vue.prototype.$axios = axios; //this.$axios

/* eslint-disable no-new */
axios.interceptors.request.use(
  config => {
    if (true) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      // config.headers["Content-Type"] =  "application/json;charset=UTF-8";
      // config.headers["X-CK-Appid"] =  "100014ba8f";
      console.log("interceptors config=", config);
      console.log("这个是请求拦截");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
