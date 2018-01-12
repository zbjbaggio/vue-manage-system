<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/postageInfo">邮费信息</el-breadcrumb-item>
                <el-breadcrumb-item>邮费详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading="loading" element-loading-text="拼命加载中">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="邮费名称" prop="name">
                    <el-input v-model="form.name" @change="message = null" placeholder="邮费名称"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <div class="sub-title">价格格式为2.00</div>
                    <el-input v-model="form.price" @change="message = null" placeholder="请输入价格"></el-input>
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
                this.$axios.get("/junjie/manage/user/postageInfo/detail", {params: {postageId: this.$route.query.postageId}}).then((res) => {
                    this.loading = false;
                    this.form.id = res.data.id;
                    this.form.name = res.data.name;
                    this.form.price = res.data.price;
                });
            }
        },
        data: function () {
            return {
                type:"",
                rules: {
                    name: [
                        {required: true, message: '请输入邮费名称', trigger: 'blur'},
                        {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {pattern: this.REGULAR_EXPRESSION_CONSTANT_PRICE, message: '价格格式不正确！', trigger: 'blur'}
                    ]
                },
                form: {
                    id: '',
                    name: '',
                    price: ''
                },
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
                            this.$axios.post("/junjie/manage/user/postageInfo/update", this.form).then((res) => {
                                if (res.status == 200) {
                                    this.$message.success('提交成功！');
                                } else {
                                    this.$message.success(res.msg);
                                }
                                this.loading = false;
                            });
                        } else if (this.type =="add"){
                            this.$axios.post("/junjie/manage/user/postageInfo/add", this.form).then((res) => {
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
                this.$router.push("/postageInfo");
            }
        }
    }
</script>
