import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/managerManage',
                    component: resolve => require(['../components/page/ManagerManage/ManagerList.vue'], resolve)
                },
                {
                    path: '/managerDetail',
                    name: 'managerDetail',
                    component: resolve => require(['../components/page/ManagerManage/ManagerDetail.vue'], resolve)
                },
                {
                    path: '/postageInfo',
                    component: resolve => require(['../components/page/PostageInfo/PostageInfoList.vue'], resolve)
                },
                {
                    path: '/postageDetail',
                    name: 'postageDetail',
                    component: resolve => require(['../components/page/PostageInfo/PostageDetail.vue'], resolve)
                },
                {
                    path: '/productInfo',
                        component: resolve => require(['../components/page/ProductInfo/ProductInfoList.vue'], resolve)
                },
                {
                    path: '/productDetail',
                    name: 'productDetail',
                    component: resolve => require(['../components/page/ProductInfo/ProductDetail.vue'], resolve)
                },
                {
                    path: '/orderInfo',
                        component: resolve => require(['../components/page/OrderInfo/OrderInfoList.vue'], resolve)
                },
                {
                    path: '/orderDetail',
                    name: 'orderDetail',
                    component: resolve => require(['../components/page/OrderInfo/OrderDetail.vue'], resolve)
                },
                {
                    path: '/roleManager',
                    component: resolve => require(['../components/page/RoleManager/RoleManagerList.vue'], resolve)
                },
                {
                    path: '/roleDetail',
                    name: 'roleDetail',
                    component: resolve => require(['../components/page/RoleManager/RoleDetail.vue'], resolve)
                },
                {
                    path: '/menuManager',
                    component: resolve => require(['../components/page/MenuManager.vue'], resolve)
                },
                {
                    path: '/userOnline',
                    component: resolve => require(['../components/page/UserOnline.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/updatePassword',
                    component: resolve => require(['../components/page/UpdatePassword.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
});

router.beforeEach((to, from, next) => {
    // ...
    next();
});

export default router
