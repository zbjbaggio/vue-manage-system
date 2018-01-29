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
            children: [
                {
                    path: '/managerManage',
                    component: resolve => require(['../components/page/ManagerManage/ManagerList.vue'], resolve)
                },
                {
                    path: '/managerManage/managerDetail',
                    name: 'managerManage/managerDetail',
                    component: resolve => require(['../components/page/ManagerManage/ManagerDetail.vue'], resolve)
                },
                {
                    path: '/managerManage/chooseRole',
                    name: 'managerManage/chooseRole',
                    component: resolve => require(['../components/page/ManagerManage/ChooseRole.vue'], resolve)
                },
                {
                    path: '/menuManage',
                    component: resolve => require(['../components/page/MenuManage/MenuList.vue'], resolve)
                },
                {
                    path: '/menuManage/menuDetail',
                    name: 'menuManage/menuDetail',
                    component: resolve => require(['../components/page/MenuManage/MenuDetail.vue'], resolve)
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
                    meta: {
                        permission: ['out']
                    },
                    component: resolve => require(['../components/page/OrderInfo/OrderInfoList.vue'], resolve)
                },
                {
                    path: '/roleManage',
                    component: resolve => require(['../components/page/RoleManage/RoleList.vue'], resolve)
                },
                {
                    path: '/roleManage/permissionDetail',
                    name: 'roleManage/permissionDetail',
                    component: resolve => require(['../components/page/RoleManage/PermissionDetail.vue'], resolve)
                },
                {
                    path: '/roleManage/chooseUser',
                    name: 'roleManage/chooseUser',
                    component: resolve => require(['../components/page/RoleManage/ChooseUser.vue'], resolve)
                },
                {
                    path: '/roleManage/roleDetail',
                    name: 'roleManage/roleDetail',
                    component: resolve => require(['../components/page/RoleManage/RoleDetail.vue'], resolve)
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
    next();
});

export default router
