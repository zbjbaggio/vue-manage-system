<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'productManage',
                        title: '产品管理',
                        subs: [
                            {
                                index: 'productInfo',
                                title: '产品信息'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'OrderManage',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'orderInfo',
                                title: '订单信息'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'systemManage',
                        title: '系统管理',
                        subs: [
                            {
                                index: 'managerManage',
                                title: '用户管理'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
