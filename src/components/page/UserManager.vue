<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_status" placeholder="筛选状态" class="handle-select mr10">
                <el-option key="0" label="未激活" value=0></el-option>
                <el-option key="1" label="正常" value=1></el-option>
                <el-option key="2" label="冻结" value=2></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="getData">搜索</el-button>
        </div>
        <el-table :data="table" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="create_time" label="创建日期" sortable width="170">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="200">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="200">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="200">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="250">
            </el-table-column>
            <el-table-column prop="statusStr" label="状态">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.row.id)">编辑
                    </el-button>
                    <el-button size="small" type="warning" v-if="scope.row.status != 2"
                               @click="handleFreeze(scope.row.id)">冻结
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total=count>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_status: '',
                select_word: '',
                del_list: [],
                is_search: false,
                user_status: [{text: '未激活', value: 0}, {text: '正常', value: 1}, {text: '冻结', value: 2}],
                count: 0,
                pageSize: 10
            }
        },
        created(){
            this.getData();
        },
        computed: {
            table(){
                const self = this;
                return self.tableData;
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                self.$axios.get("/springbootbase/user/userManager/list", {params: {page: self.cur_page,status:self.select_status}}).then((res) => {
                    if (res.status == 200) {
                        if (!!res.data.list) {
                            for (var i = 0; i < res.data.list.length; i++) {
                                if (res.data.list[i].status == 1) {
                                    res.data.list[i].statusStr = "正常";
                                }
                            }
                        }
                        self.tableData = res.data.list;
                        console.log(self.tableData);
                        self.count = res.data.count;
                    } else {
                        this.$message.fail("查询失败！")
                    }
                })
            },
            search(){
                this.is_search = true;
            },
            handleEdit(userId) {
                this.$router.push({name: 'userDetail', query: {userId: userId}});
            },
            handleDelete(userId) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleFreeze(userId) {
                this.$confirm('此操作将冻结该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/springbootbase/user/userManager/updateFreeze?userId=" + userId).then((res) => {
                        if (res.status == 200) {
                            //隐藏按钮
                            this.$message.success('冻结成功！');
                        } else {
                            this.$message.success(res.msg);
                        }
                    });
                }).catch(() => {

                });
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了' + str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
