<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" @change="message = null" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" @change="message = null" placeholder="密码" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <div class="el-form-item__error" v-if="!!message" style="position: static">{{message}}</div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                message: '',
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: this.RULE_USERNAME,
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        //登录
                        self.$axios.post("/springbootbase/login", {
                            username: self.ruleForm.username,
                            password: self.ruleForm.password
                        }).then(function (response) {
                            if (response.status == 200) {
                                localStorage.setItem('ms_username', self.ruleForm.username);
                                localStorage.setItem('key', response.data.key);
                                localStorage.setItem('token', response.data.token);
                                self.$router.push('/readme');
                            } else {
                                self.message = response.msg;
                            }
                        }).catch(function (err) {
                            console.log(err);
                            self.message = "连接服务器失败！"
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
