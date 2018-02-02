<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/managerManage">管理员信息</el-breadcrumb-item>
                <el-breadcrumb-item>选择角色</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <permissionButton type="primary" @click="save" size="mini" name="/manage/user/managerInfo/saveRoles">保存</permissionButton>
            <el-button @click="onReturn" size="mini">取消</el-button>
        </div>
        <div style="margin-top: 15px;">
            <el-table ref="multipleTable" :data="tableData" border stripe style="width: 356px" v-loading.body="loading" @selection-change="handleSelectionChange" width="355">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="角色名称" width="300">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                tableData: [],
                multipleSelection: [],
            };
        },
        mounted () {
            let self = this;
            self.getData();
        },
        methods: {
            //查询
            getData() {
                let self = this;
                this.loading = true;
                self.$axios.get("/junjie/manage/user/managerInfo/listRole", {
                    params: {
                        userId: this.$route.query.userId
                    }
                }).then((res) => {
                    if (res.status === 200) {
                        self.tableData = res.data;
                        self.$nextTick(function(){
                            self.tableData.forEach(function (item) {
                                if (item.managerId) {
                                    self.$refs.multipleTable.toggleRowSelection(item);
                                }
                            });
                        });
                    } else {
                        this.$message.error("查询失败！");
                    }
                    this.loading = false;
                }, this.errorfun);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            save() {
                const self = this,
                    length = self.multipleSelection.length;
                let idList = [];
                for (let i = 0; i < length; i++) {
                    idList[i] = self.multipleSelection[i].id;
                }
                let params = {};
                params.managerId = this.$route.query.userId;
                params.roleIds = idList;
                this.$axios.post("/junjie/manage/user/managerInfo/saveRoles", params).then((res) => {
                    if (res.status === 200) {
                        this.$message.success('保存成功！');
                        this.getData();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            onReturn() {
                this.$router.push("/managerManage");
            }
        }
    }
</script>
