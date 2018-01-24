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
            <div class="handle-box">
                <el-button type="primary" @click="save" size="mini">保存</el-button>
                <el-button @click="onReturn" size="mini">取消</el-button>
                <el-button type="default" @click="allChecked" size="mini">全选</el-button>
                <el-button @click="resetChecked" size="mini">清空</el-button>
            </div>
            <div>
                <el-tree style="border: 1px solid #D1D1E8;margin-top: 15px;" :data="data" show-checkbox=""
                         default-expand-all="" node-key="id" ref="tree" highlight-current :props="defaultProps"
                         :default-checked-keys="checked">
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            if (this.$route.query.roleId) {
                this.$axios.get("/junjie/manage/user/role/getPermissionDetail", {params: {roleId: this.$route.query.roleId}}).then((res) => {
                    this.data = res.data.treeVOS;
                    this.checked = res.data.check;
                });
            }
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
                const nodes = self.$refs.tree.getCheckedNodes();
                let param = {};
                param.roleId = self.$route.query.roleId;
                let permissionIds = [];
                for (let i = 0; i < nodes.length; i++) {
                    permissionIds[i] = nodes[i].id;
                }
                param.permissionIds = permissionIds;
                this.$axios.post("/junjie/manage/user/role/savePermission", param).then((res) => {
                    if (res.status === 200) {
                        this.$message.success('提交成功！');
                    } else {
                        this.$message.error(res.msg);
                    }
                    self.loading = false;
                });
            },
            onReturn() {
                this.$router.push("/roleManage");
            },
            resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
            },
            allChecked() {
                let ids = [];
                for (let i = 0; i < this.data.length; i++) {
                    ids[i] = this.data[i].id;
                }
                console.log(ids);
                this.$refs.tree.setCheckedKeys(ids);
            }
        }
    }
</script>
