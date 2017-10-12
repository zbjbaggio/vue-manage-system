<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/roleManager">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading="loading2" element-loading-text="拼命加载中">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name" @change="message = null" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="详情" prop="description">
                    <el-input type="textarea" v-model="form.description" rows=10></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="available">
                    <el-radio-group v-model="form.available">
                        <el-radio style="margin-left :10px" :label="item.value" v-for="item in role_status">{{item.text}}
                        </el-radio>
                    </el-radio-group>
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
            this.loading2 = true;
            if (!!this.$route.query.roleId) {
                this.$axios.get("/springbootbase/user/userManager/detail", {params: {roleId: this.$route.query.roleId}}).then((res) => {
                    this.loading2 = false;
                    this.form.id = res.data.id;
                    this.form.name = res.data.name;
                    this.form.available = res.data.available;
                    this.form.createTime = res.data.createTime;
                    this.form.description = res.data.description;
                });
            } else {
                this.loading2 = false;
            }
        },
        data: function () {
            return {
                test: true,
                rules: {
                    name: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                    ],
                    available: [
                        {required: true, message: '请选择状态', trigger: 'change', type: 'boolean'}
                    ],
                },
                form: {
                    id: '',
                    name: '',
                    description: '',
                    createTime: '',
                    available: true
                },
                role_status: [{text: '未启用', value: false}, {text: '启用', value: true}],
                loading2: false
            }
        },
        methods: {
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post("/springbootbase/user/roleManager/save", this.form).then((res) => {
                            if (res.status == 200) {
                                this.$message.success('提交成功！');
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
                this.$router.push("/roleManager");
            }
        }
    }
</script>
