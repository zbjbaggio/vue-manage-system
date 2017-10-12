import Vue from './config';
import App from './App';
import {errorfun} from './utls/';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

Vue.use(ElementUI);
/*if (window.location.hostname = '127.0.0.1') {
    axios.defaults.baseURL = 'http://172.16.1.238:8090';
}*/
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = localStorage.getItem('token');
    config.headers.key = localStorage.getItem('key');
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    //登录校验不正确跳到登录界面
    switch (response.data.status) {
        case 50005:
            router.app.$message.error("重新登录！");
            router.app.$router.push('/login');
            return Promise.reject(response);
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
