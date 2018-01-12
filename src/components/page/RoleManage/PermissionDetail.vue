<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/roleManage">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>权限详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading="loading" element-loading-text="拼命加载中">
            <el-tree :data="data" show-checkbox="" default-expand-all="" node-key="id" ref="tree" highlight-current :props="defaultProps" :default-checked-keys="default1">
            </el-tree>
        </div>
    </div>
</template>

<script>
    export default {
        created(){
            if (this.$route.query.roleId) {
                this.$axios.get("/junjie/manage/user/role/permissionDetail", {params: {roleId: this.$route.query.roleId}}).then((res) => {
                    this.data = res.data.treeVOS;
                    this.default1 = res.data.check;
                    console.log(this.default1);
                });
            }
            this.loading = false;
        },
        data: function () {
            return {
                loading: true,
                data: [],
                default1:[],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            setTree() {

            }
        }
    }
</script>
