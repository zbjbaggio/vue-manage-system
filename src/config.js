import Vue from 'vue'

const p = Vue.prototype;
//邮箱email正则校验
p.REGULAR_EXPRESSION_CONSTANT_EMAIL = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
//用户校验
p.RULE_USERNAME = [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur'}
];
//密码
p.RULE_PASSWORD = [
    {required: true, message: '请输入密码', trigger: 'blur'}
];
//页数
p.pageSizes = [5,10,15,20];

export default Vue
