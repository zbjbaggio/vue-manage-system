<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>邮费信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box" >
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
            <el-button type="success" @click="add">新增</el-button>
        </div>
        <el-table :data="table" border stripe style="width: 100%" ref="multipleTable" v-loading.body="loading" @selection-change="handleSelectionChange" @sort-change="orderBy">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="create_time" label="创建日期" sortable width="170">
            </el-table-column>
            <el-table-column prop="name" label="邮费名称">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="200">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.row.id)">编辑
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
                loading:true,
                tableData: [],
                cur_page: 1,
                cur_pageSize: this.pageSizes[1],
                multipleSelection: [],
                select_word: '',
                select_order: '',
                select_desc: false,
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
                this.select_word = '';
                this.cur_page = 1;
                this.getData();
            },
            //新增
            add(){
                this.$router.push({name: 'postageDetail', query: {type: "add"}});
            },
            //查询
            getData(){
                let self = this;
                this.loading = true;
                self.$axios.get("/junjie/manage/user/postageInfo/list", {
                    params: {
                        limit: self.cur_pageSize,
                        offset: (self.cur_page - 1) * self.cur_pageSize,
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
                    this.loading = false;
                }, this.errorfun);

            },
            //编辑
            handleEdit(postageId) {
                this.$router.push({name: 'postageDetail', query: {postageId: postageId,type: "modify"}});
            },
            handleDelete(postageId) {
                this.$confirm('此操作将永久删除该邮费, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var idList = [];
                    idList[0] = postageId;
                    this.deletePostage(idList);
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
                    var idList = [];
                    for (let i = 0; i < length; i++) {
                        idList[i] = self.multipleSelection[i].id;
                    }
                    this.$confirm('此操作将删除选中的邮费, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deletePostage(idList);
                    });
                } else {
                    self.$message.warning("请选择邮费！")
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deletePostage(idList){
                this.loading = true;
                this.$axios.post("/junjie/manage/user/postageInfo/delete?postageIds=" + idList).then((res) => {
                    if (res.status == 200) {
                        this.$message.success('删除成功！');
                        this.getData();
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.loading = false;
                });
            },
            formatter(row, column){
                var str = "";
                this.product_status.forEach(function (item) {
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
