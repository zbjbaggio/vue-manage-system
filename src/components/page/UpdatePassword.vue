<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading="loading" element-loading-text="拼命加载中">
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword" @change="message = null" placeholder="旧密码" ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="form.newPassword" @change="message = null" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="newPassword2">
                    <el-input type="password" v-model="form.newPassword2" @change="message = null" placeholder="确认新密码"></el-input>
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
        data: function () {
            return {
                rules: {
                    oldPassword: this.RULE_PASSWORD,
                    newPassword: this.RULE_PASSWORD,
                    newPassword2: this.RULE_PASSWORD,
                },
                form: {
                    oldPassword: '',
                    newPassword: '',
                    newPassword2: ''
                }
            }
        },
        methods: {
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/junjie/manager/user/userManager/updatePassword", this.form).then((res) => {
                            if (res.status == 200) {
                                this.$message.success('提交成功！');
                                this.form.oldPassword = '';
                                this.form.newPassword = '';
                                this.form.newPassword2 = '';
                            } else {
                                this.$message.success(res.msg);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            onReturn() {
                this.$router.push("/userManager");
            }
        }
    }
</script>
