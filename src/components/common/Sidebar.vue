<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" background-color="#324157"
                 text-color="#bfcbd9"  unique-opened router >
            <template v-for="item in menuList">
                <template v-if="item.children">
                    <el-submenu :index="item.feUrl">
                        <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
                        <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.feUrl">{{subItem.name}}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.feUrl">
                        <i :class="item.icon"></i>{{item.name}}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        computed: {
            onRoutes() {
                return "/" + this.$route.path.split("/")[1]
            },
            menuList() {
                return JSON.parse(localStorage.getItem('permissionList'));
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        width: 210px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
