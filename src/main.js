import Vue from './config';
import App from './App';
import router from './router';
import axios from 'axios';
import {errorfun,remove} from './utls/';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';   // 默认主题
import "babel-polyfill";
import PermissionButton from './components/common/PermissionButton'

Vue.use(ElementUI);
Vue.component('PermissionButton', PermissionButton);
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

const hasPermission = {
    install (Vue, options){
        Vue.mixin({
            methods:{
                hasPermission(data){
                    let permissionList = this.$route.meta.permission;
                    return permissionList && permissionList.length > 0 && permissionList.includes(data);

                }
            }
        })
    }
}

export default hasPermission

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
