<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/roleManage">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>选择用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" @click="save" size="mini">保存</el-button>
            <el-button @click="onReturn" size="mini">取消</el-button>
        </div>
        <div style="margin-top: 15px;">
            <el-table ref="multipleTable" :data="tableData" border stripe style="width: 956px" v-loading.body="loading" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="username" label="用户名称" width="300"></el-table-column>
                <el-table-column prop="name" label="姓名" width="300"></el-table-column>
                <el-table-column prop="phone" label="手机号" width="300"></el-table-column>
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
                self.$axios.get("/junjie/manage/user/role/listUser", {
                    params: {
                        roleId: this.$route.query.roleId
                    }
                }).then((res) => {
                    if (res.status === 200) {
                        self.tableData = res.data;
                        self.$nextTick(function(){
                            self.tableData.forEach(function (item) {
                                if (item.roleId) {
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
                params.roleId = this.$route.query.roleId;
                params.managerIds = idList;
                this.$axios.post("/junjie/manage/user/role/saveUsers", params).then((res) => {
                    if (res.status === 200) {
                        this.$message.success('保存成功！');
                        this.getData();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            onReturn() {
                this.$router.push("/roleManage");
            }
        }
    }
</script>
