Vue.component('permission-button', {
    props:["click", "type"],
    template: '<el-button type="{{type}}" v-if="" @click="{{click}}}"><slot></slot></el-button>'
});
