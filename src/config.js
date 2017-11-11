import Vue from 'vue'

const p = Vue.prototype;
//邮箱email正则校验
p.REGULAR_EXPRESSION_CONSTANT_EMAIL = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
p.REGULAR_EXPRESSION_CONSTANT_PRICE = /^[1-9]\d*(.\d{1,2})?$/;
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

//用户状态
p.USER_STATUS =  [{text: '未激活', value: 0}, {text: '正常', value: 1}, {text: '冻结', value: 2}];
//产品状态
p.PRODUCT_STATUS =  [ {text: '上架', value: 1}, {text: '下架', value: 2}];

export default Vue
