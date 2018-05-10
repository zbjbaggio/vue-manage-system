<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/menuManage">菜单管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜单树详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading="loading" element-loading-text="拼命加载中">
            <div class="handle-box">
                <el-button type="primary" @click="save" size="mini">保存</el-button>
                <el-button @click="onReturn" size="mini">取消</el-button>
            </div>
            <div>
                <el-tree style="border: 1px solid #D1D1E8;margin-top: 15px;" :data="data" default-expand-all node-key="id" highlight-current draggable>
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.$axios.get("/junjie/manage/user/menu/getMenuTreeDetail", {params: {roleId: this.$route.query.roleId}}).then((res) => {
                this.data = res.data;
            });
            this.loading = false;
        },
        data: function () {
            return {
                loading: true,
                data: [],
                checked: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        methods: {
            save() {
                const self = this;
                self.loading = true;
                this.$axios.post("/junjie/manage/user/menu/saveMenuTree", self.data).then((res) => {
                    this.data = res.data;
                });
                self.loading = false;
            },
            onReturn() {
                this.$router.push("/menuManage");
            }
        }
    }
</script>
