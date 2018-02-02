<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="managerManage">管理员信息</el-breadcrumb-item>
                <el-breadcrumb-item>管理员详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading="loading" element-loading-text="拼命加载中">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" @change="message = null" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item v-if="type === 'add'" label="密码" prop="password">
                    <el-input type="password" v-model="form.password" @change="message = null" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item v-if="type === 'add'" label="确认密码" prop="password2">
                    <el-input type="password" v-model="form.password2" @change="message = null" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" @change="message = null" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="form.phone" @change="message = null" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" @change="message = null" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item v-if="type === 'modify'" label="创建时间">
                    <el-input v-model="form.createTime" :disabled=true></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-radio-group v-model="form.status">
                        <el-radio style="margin-left :10px" :label="item.value" v-for="item in status" :key="item.value">{{item.text}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <permissionButton type="primary" @click="onSubmit('form')" name="/manage/user/managerInfo/save">提交</permissionButton>
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
            if (this.type === "modify") {
                this.loading = true;
                this.$axios.get("/junjie/manage/user/managerInfo/getDetail", {params: {userId: this.$route.query.userId}}).then((res) => {
                    this.loading = false;
                    this.form = res.data;
                });
            }
        },
        data: function () {
            return {
                type:"",
                rules: {
                    username: this.RULE_USERNAME,
                    password: this.RULE_PASSWORD,
                    password2: this.RULE_PASSWORD,
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {min: 11, max: 11, message: '手机号格式不正确！', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                        {pattern: this.REGULAR_EXPRESSION_CONSTANT_EMAIL, message: '邮箱格式不正确！', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'change', type: 'number'}
                    ],
                },
                form: {
                    id: '',
                    username: '',
                    name: '',
                    phone: '',
                    email: '',
                    createTime: '',
                    status: 0
                },
                status: this.USER_STATUS,
                loading: false
            }
        },
        methods: {
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.form.password !== this.form.password2) {
                            this.$message.error("密码与确认密码不一致！");
                            return;
                        }
                        this.loading = true;
                        this.$axios.post("/junjie/manage/user/managerInfo/save", this.form).then((res) => {
                            if (res.status === 200) {
                                this.$message.success('提交成功！');
                                this.form.id = res.data.id;
                            } else {
                                this.$message.error(res.msg);
                            }
                            this.loading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            onReturn() {
                this.$router.push("/managerManage");
            }
        }
    }
</script>
