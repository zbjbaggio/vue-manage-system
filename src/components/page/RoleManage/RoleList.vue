<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_status" placeholder="筛选状态" class="handle-select mr10">
                <el-option key="0" :label="item.text" :value="item.value" v-for="item in role_status"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
            <el-button type="success" @click="add">新增</el-button>
        </div>
        <el-table :data="table" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" @sort-change="orderBy">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" sortable width="170">
            </el-table-column>
            <el-table-column prop="name" label="角色名称">
            </el-table-column>
            <el-table-column prop="availableStr" label="状态" width="100" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.row.id)">编辑
                    </el-button>
                    <el-button size="small" type="success"
                               @click="handlePermission(scope.row)">授权
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
                role_status: this.available,
                count: 0,
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
            add() {
                this.$router.push({name: 'roleManage/roleDetail'});
            },
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
                this.cur_page = 1;
                this.select_order = '';
                this.select_desc = false;
                this.getData();
            },
            //查询
            getData(){
                let self = this;
                self.$axios.get("/junjie/manage/user/role/list", {
                    params: {
                        limit: self.cur_pageSize,
                        offset: (self.cur_page - 1) * self.cur_pageSize,
                        status: self.select_status,
                        searchStr: self.select_word,
                        orderBy: self.select_order,
                        desc: self.select_desc
                    }
                }).then((res) => {
                    if (res.status === 200) {
                        self.tableData = res.data.list;
                        self.count = res.data.count;
                    } else {
                        this.$message.error("查询失败！");
                    }
                }, this.errorfun);
            },
            //编辑
            handleEdit(roleId) {
                this.$router.push({name: 'roleManage/roleDetail', query: {roleId: roleId}});
            },
            handleDelete(userId) {
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let idList = [];
                    idList[0] = userId;
                    this.deleteMenu(idList);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //批量删除
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                if (length > 0) {
                    let idList = [];
                    for (let i = 0; i < length; i++) {
                        idList[i] = self.multipleSelection[i].id;
                    }
                    this.$confirm('此操作将删除选中的角色, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteMenu(idList);
                    });
                } else {
                    self.$message.warning("请选择用户！")
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //授权
            handlePermission(row) {
                this.$router.push({name: 'roleManage/permissionDetail', query: {roleId: row.id}});
            },
            deleteMenu(idList){
                this.$axios.post("/junjie/manage/user/role/remove?roleIds=" + idList).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                        this.$message.success('删除成功！');
                        this.getData();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            formatter(row, column){
                let str = "";
                this.role_status.forEach(function (item) {
                    if (row.available === item.value) {
                        str = item.text;
                    }
                });
                return str;
            },
            orderBy(column){
                self.select_order = column.prop;
                if (column.order === "descending") {
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
