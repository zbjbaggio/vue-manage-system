<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box" >
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_status" placeholder="筛选状态" class="handle-select mr10">
                <el-option key="0" :label="item.text" :value="item.value" v-for="item in user_status"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="getData">搜索</el-button>
            <el-button type="primary" @click="reset" :disabled=true>重置</el-button>
        </div>
        <el-table :data="table" border style="width: 100%" ref="multipleTable"
                  @selection-change="handleSelectionChange" @sort-change="orderBy">
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
            <el-table-column prop="statusStr" label="状态" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.row.id)">编辑
                    </el-button>
                    <el-button size="small" type="warning" v-if="scope.row.status != 2"
                               @click="handleFreeze(scope.row)">冻结
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                :current-page="cur_page"
                :page-sizes="pageSizes"
                :page-size="cur_pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next, sizes"
                :total=count>
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                cur_pageSize: this.pageSizes[1],
                multipleSelection: [],
                select_status: '',
                select_word: '',
                select_order: '',
                select_desc: false,
                user_status: [{text: '未激活', value: 0}, {text: '正常', value: 1}, {text: '冻结', value: 2}],
                count: 0
            };
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
            handleSizeChange(val){
                this.cur_pageSize = val;
                this.getData();
            },
            //重置
            reset(){
                this.select_status = '';
                this.select_word = '';
                this.select_order = '';
                this.select_desc = false;
                this.cur_page = 1;
                this.getData();
            },
            //查询
            getData(){
                let self = this;
                self.$axios.get("/springbootbase/user/userManager/list", {
                    params: {
                        limit: self.cur_pageSize,
                        offset: (self.cur_page - 1) * self.cur_pageSize,
                        status: self.select_status,
                        searchStr: self.select_word,
                        orderBy: self.select_order,
                        desc: self.select_desc
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        self.tableData = res.data.list;
                        self.count = res.data.count;
                    } else {
                        this.$message.error("查询失败！");
                    }
                }, this.errorfun);
            },
            //编辑
            handleEdit(userId) {
                this.$router.push({name: 'userDetail', query: {userId: userId}});
            },
            handleDelete(userId) {
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var idList = [];
                    idList[0] = userId;
                    this.deleteUsers(idList);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //冻结
            handleFreeze(row) {
                this.$confirm('此操作将冻结该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/springbootbase/user/userManager/updateFreeze?userId=" + row.id).then((res) => {
                        if (res.status == 200) {
                            //隐藏按钮
                            row.status = 2;
                            this.$message.success('冻结成功！');
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                })
            },
            //批量删除
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                if (length > 0) {
                    var idList = [];
                    for (let i = 0; i < length; i++) {
                        idList[i] = self.multipleSelection[i].id;
                    }
                    this.$confirm('此操作将删除选中的用户, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteUsers(idList);
                    });
                } else {
                    self.$message.warning("请选择用户！")
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteUsers(idList){
                this.$axios.post("/springbootbase/user/userManager/delete?userIds=" + idList).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        this.$message.success('删除成功！');
                        this.getData();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            formatter(row, column){
                var str = "";
                this.user_status.forEach(function (item) {
                    if (row.status == item.value) {
                        str = item.text;
                    }
                });
                return str;
            },
            orderBy(column){
                self.select_order = column.prop;
                if (column.order == "descending") {
                    self.select_desc = true;
                }
                this.getData();
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
