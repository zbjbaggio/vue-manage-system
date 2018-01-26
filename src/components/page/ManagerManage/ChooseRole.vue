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
            <el-button type="primary" @click="save" size="mini">保存</el-button>
            <el-button @click="onReturn" size="mini">取消</el-button>
        </div>
        <div style="margin-top: 15px;">
            <el-table :data="tableData" border stripe style="width: 356px" ref="multipleTable" v-loading.body="loading" @selection-change="handleSelectionChange" @sort-change="orderBy" width="355">
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
        created() {
            this.getData();
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

            }
        }
    }
</script>
