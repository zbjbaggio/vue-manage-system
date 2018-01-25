<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 系统管理</el-breadcrumb-item>
                <el-breadcrumb-item to="/menuManage">菜单管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box" v-loading="loading" element-loading-text="拼命加载中">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="菜单编码" prop="code">
                    <el-input v-model="form.code" @change="message = null" placeholder="菜单编码"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" prop="name">
                    <el-input v-model="form.name" @change="message = null" placeholder="菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="图标地址" prop="icon">
                    <el-input v-model="form.icon" @change="message = null" placeholder="图标地址"></el-input>
                </el-form-item>
                <el-form-item label="前端名称" prop="feUrl">
                    <el-input v-model="form.feUrl" @change="message = null" placeholder="前端名称"></el-input>
                </el-form-item>
                <el-form-item label="后端名称" prop="beUrl">
                    <el-input v-model="form.beUrl" @change="message = null" placeholder="后端名称"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="available">
                    <el-radio-group v-model="form.available">
                        <el-radio style="margin-left :10px" :label="item.value" v-for="item in available" :key="item.value">
                            {{item.text}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')" :loading="loading">提交</el-button>
                    <el-button @click="onReturn">取消</el-button>
                </el-form-item>
            </el-form>
            <div v-if="type === 'modify' && hasButton">
                <el-button type="text" @click="addButton">添加按钮</el-button>
                <el-table :data="table" border style="width: 100%">
                    <el-table-column prop="name" label="按钮名称" width="120">
                    </el-table-column>
                    <el-table-column prop="be_url" label="后端地址">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="按钮详情" :visible.sync="dialogFormVisible">
                    <el-form :model="buttonForm" label-width="80px" :rules="rules" ref="buttonForm">
                        <el-form-item label="按钮名称" prop="name">
                            <el-input v-model="buttonForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="后端地址" prop="beUrlButton">
                            <el-input v-model="buttonForm.beUrlButton"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="buttonOnSubmit('buttonForm')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            this.fetchData();
        },
        data: function () {
            return {
                type: "",
                table: [],
                rules: {
                    code: [
                        {required: true, message: '请输入菜单编号', trigger: 'blur'},
                        {min: 4, max: 255, message: '长度在 4 到 255 个字符', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
                    ],
                    icon: [
                        {max: 40, message: '长度不能超过 40 个字符', trigger: 'blur'}
                    ],
                    feUrl: [
                        {required: true, message: '请输入前端地址', trigger: 'blur'},
                        {max: 100, message: '长度不能超过 100 个字符', trigger: 'blur'}
                    ],
                    beUrl: [
                        {max: 100, message: '长度不能超过 100 个字符', trigger: 'blur'}
                    ],
                    beUrlButton: [
                        {required: true, message: '请输入后端地址', trigger: 'blur'},
                        {max: 100, message: '长度不能超过 100 个字符', trigger: 'blur'}
                    ],
                    available: [
                        {required: true, message: '请选择状态', trigger: 'change', type: 'boolean'}
                    ],
                },
                form: {
                    id: '',
                    code: '',
                    name: '',
                    feUrl: '',
                    beUrl: '',
                    createTime: '',
                    available: true
                },
                buttonForm: {
                    id: '',
                    parentId: '',
                    name: '',
                    beUrlButton: '',
                    available: true
                },
                hasButton: false,
                available: this.available,
                loading: false,
                dialogFormVisible: false
            }
        },
        methods: {
            fetchData() {
                this.type = this.$route.query.type;
                if (this.type === "modify") {
                    this.loading = true;
                    this.$axios.get("/junjie/manage/user/menu/detail", {params: {menuId: this.$route.query.menuId}}).then((res) => {
                        this.loading = false;
                        this.form.id = res.data.id;
                        this.form.name = res.data.name;
                        this.form.icon = res.data.icon;
                        this.form.available = res.data.available;
                        this.form.code = res.data.code;
                        this.form.feUrl = res.data.fe_url;
                        this.form.beUrl = res.data.be_url;
                        this.table = res.data.button;
                        this.hasButton = res.data.hasButton;
                    });
                }
            },
            onSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.loading = true;
                        this.$axios.post("/junjie/manage/user/menu/save", this.form).then((res) => {
                            if (res.status === 200) {
                                this.$message.success('提交成功！');
                                this.type = "modify";
                                this.form.id = res.data.id;
                            } else {
                                this.$message.error(res.msg);
                            }
                            self.loading = false;
                        }).catch((error) => {
                            console.log(error);
                            this.$message.error('提交失败！');
                            self.loading = false;
                        });
                    }
                    return false;
                });
            },
            onReturn() {
                this.$router.push("/menuManage");
            },
            addButton() {
                this.dialogFormVisible = true;
                this.buttonForm = {};
            },
            buttonOnSubmit(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.loading = true;
                        this.buttonForm.parentId = this.form.id;
                        this.buttonForm.beUrl = this.buttonForm.beUrlButton;
                        this.$axios.post("/junjie/manage/user/menu/saveButton", this.buttonForm).then((res) => {
                            if (res.status === 200) {
                                this.$message.success('提交成功！');
                                this.fetchData();
                                this.dialogFormVisible = false;
                            } else {
                                this.$message.error(res.msg);
                            }
                            self.loading = false;
                        }).catch((error) => {
                            console.log(error);
                            this.$message.error('提交失败！');
                            self.loading = false;
                        });
                    }
                    return false;
                });
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该按钮以及用户权限下的该按钮, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post("/junjie/manage/user/menu/removeButton?permissionId=" + row.id).then((res) => {
                        if (res.status === 200) {
                            this.$message.success('删除成功！');
                            this.table.remove(row);
                        } else {
                            this.$message.error(res.msg);
                        }
                        self.loading = false;
                    }).catch((error) => {
                        console.log(error);
                        this.$message.error('提交失败！');
                        self.loading = false;
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleEdit(row) {
                this.dialogFormVisible = true;
                this.buttonForm = row;
                this.buttonForm.beUrlButton = row.be_url;
            }
        }
    }
</script>
