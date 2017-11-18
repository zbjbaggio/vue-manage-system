<template>
        <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 产品管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品信息</el-breadcrumb-item>
                <el-breadcrumb-item>产品详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading="loading" element-loading-text="拼命加载中">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="产品编号" prop="productNo">
                    <el-input v-model="form.productNo" @change="message = null" placeholder="产品编号"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="name">
                    <el-input v-model="form.name" @change="message = null" placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" @change="message = null" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <div class="sub-title">价格格式为2.00</div>
                    <el-input v-model="form.price" @change="message = null" placeholder="请输入价格"></el-input>
                </el-form-item>
                <el-form-item v-if="type=='modify'" label="创建时间">
                    <el-input v-model="form.create_time" :disabled=true></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio style="margin-left :10px" :label="item.value" v-for="item in status">{{item.text}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="form.description" @change="message = null" placeholder="描述" :rows="10"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    <el-button @click="onReturn">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    //import {aaa} from '../../utls/index'
    export default {
        created(){
            this.type = this.$route.query.type;
            if (this.type == "modify") {
                this.loading = true;
                this.$axios.get("/junjie/manage/user/orderInfo/detail", {params: {productId: this.$route.query.productId}}).then((res) => {
                    this.loading = false;
                    this.form.id = res.data.id;
                    this.form.productNo = res.data.product_no;
                    this.form.name = res.data.name;
                    this.form.price = res.data.price;
                    this.form.title = res.data.title;
                    this.form.description = res.data.description;
                    this.form.create_time = res.data.create_time;
                    this.form.status = res.data.status;
                });
            }
        },
        data: function () {
            return {
                type:"",
                rules: {
                    productNo: [
                        {required: true, message: '请输入产品编号', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入产品名称', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 1, max: 100, message: '长度在 1 到 100 个字符！', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {pattern: this.REGULAR_EXPRESSION_CONSTANT_PRICE, message: '价格格式不正确！', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'change', type: 'number'}
                    ],
                },
                form: {
                    id: '',
                    productNo:'',
                    name: '',
                    title: '',
                    price: '',
                    description: '',
                    create_time: '',
                    status: 1
                },
                status: this.PRODUCT_STATUS,
                loading: false
            }
        },
        methods: {
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        if (this.type =="modify") {
                            this.$axios.post("/junjie/manage/user/productInfo/update", this.form).then((res) => {
                                if (res.status == 200) {
                                    this.$message.success('提交成功！');
                                } else {
                                    this.$message.success(res.msg);
                                }
                                this.loading = false;
                            });
                        } else if (this.type =="add"){
                            this.$axios.post("/junjie/manage/user/productInfo/add", this.form).then((res) => {
                                if (res.status == 200) {
                                    this.$message.success('提交成功！');
                                    this.type = "modify";
                                    this.form.id = res.data.id;
                                } else {
                                    this.$message.success(res.msg);
                                }
                                this.loading = false;
                            });
                        }
                    } else {
                        return false;
                    }
                });
            },
            onReturn() {
                this.$router.push("/productInfo");
            }
        }
    }
</script>
