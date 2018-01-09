<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box" >
            <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_status" placeholder="筛选状态" class="handle-select mr10">
                <el-option key="0" :label="item.text" :value="item.value" v-for="item in product_status"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <permission-button name="/manage/user/managerInfo/delet" type="primary" icon="el-icon-search" @click="getData">搜索</permission-button>
            <el-button type="primary" @click="reset">重置</el-button>
        </div>
        <el-table :data="table" border stripe style="width: 100%" ref="multipleTable" v-loading.body="loading" @selection-change="handleSelectionChange" @sort-change="orderBy">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div v-for="orderDetailVO in props.row.orderDetailVOList">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品名称" style="margin-left :80px">
                                <span>{{ orderDetailVO.product_name }}</span>
                            </el-form-item>
                            <el-form-item label="商品价格" style="margin-left :100px">
                                <span>{{ orderDetailVO.price }}</span>
                            </el-form-item>
                            <el-form-item label="size" style="margin-left :100px">
                                <span>{{ orderDetailVO.size }}</span>
                            </el-form-item>
                            <el-form-item label="数量" style="margin-left :100px">
                                <span>{{ orderDetailVO.number }}</span>
                            </el-form-item>
                            <el-form-item label="总额" style="margin-left :100px">
                                <span>{{ orderDetailVO.amount }}</span>
                            </el-form-item>
                        </el-form>
                    </div >
                </template>
            </el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="payment_id" label="订单编号" width="160">
            </el-table-column>
            <el-table-column prop="create_time" label="下单日期" sortable width="115">
            </el-table-column>
            <el-table-column prop="amount" label="订单总价" width="100">
            </el-table-column>
            <el-table-column prop="productAmount" label="商品金额" width="100">
            </el-table-column>
            <el-table-column prop="postage" label="邮费金额" width="100">
            </el-table-column>
            <el-table-column label="收件人信息">
            <el-table-column prop="email" label="email" width="200">
            </el-table-column>
            <el-table-column prop="phone" label="电话" width="100">
            </el-table-column>
            <el-table-column prop="receiver_name" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="receiver_address1" label="地址1" width="200">
            </el-table-column>
            <el-table-column prop="receiver_address2" label="地址2" width="200">
            </el-table-column>
            <el-table-column prop="receiver_city" label="城市" width="100">
            </el-table-column>
            <el-table-column prop="receiver_country" label="国家" width="100">
            </el-table-column>
            <el-table-column prop="receiver_area" label="地区" width="100">
            </el-table-column>
            <el-table-column prop="postcode" label="邮编" width="100">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="statusStr" label="状态" :formatter="formatter">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150" >
                <template slot-scope="scope">
                    <el-button size="small" type="warning" v-if="scope.row.status != 4"
                               @click="success(scope.row.id)">完成
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
                loading: true,
                tableData: [],
                cur_page: 1,
                cur_pageSize: this.pageSizes[1],
                multipleSelection: [],
                select_status: '',
                select_word: '',
                select_order: '',
                select_desc: false,
                product_status: this.ORDER_STATUS,
                count: 0,
                test:false
            };
        },
        created(){
            //hasPermission("sssss")
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
            aaaa() {
              alert(2222);
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
                this.getData();
            },
            //查询
            getData(){
                let self = this;
                this.loading = true;
                self.$axios.get("/junjie/manage/user/orderInfo/list", {
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
                    this.loading = false;
                }, this.errorfun);

            },
            success(productId) {
                this.loading = true;
                this.$axios.post("/junjie/manage/user/orderInfo/success?orderId=" + productId).then((res) => {
                    if (res.status == 200) {
                        this.$message.success('订单完成！');
                        this.getData();
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.loading = false;
                });
            },
            //订单详情
            handleDetail(productId) {
                this.$router.push({name: 'orderDetail', query: {productId: productId, type: "modify"}});
            },
            handleDelete(productId) {
                this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var idList = [];
                    idList[0] = productId;
                    this.deleteUsers(idList);
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
                    this.$confirm('此操作将删除选中的订单, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteUsers(idList);
                    });
                } else {
                    self.$message.warning("请选择订单！")
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteUsers(idList){
                this.loading = true;
                this.$axios.post("/junjie/manage/user/orderInfo/delete?orderIds=" + idList).then((res) => {
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
    };
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
