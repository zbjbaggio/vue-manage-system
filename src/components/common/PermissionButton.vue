<template>
    <el-button v-if="isPermission" @click="handleClick" :type="type" :icon="icon" :size="size">
        <slot></slot>
    </el-button>
</template>

<script>
    export default {
        name: "permission-button",
        props: {
            name: {
                type: String,
                default: ''
            },
            type:{
                type: String,
                default: ''
            },
            icon:{
                type: String,
                default: ''
            },
            size:{
                type: String,
                default: ''
            }
        },
        computed: {
            isPermission () {
                let buttonList = JSON.parse(localStorage.getItem('buttonList'));
                return buttonList && buttonList.length > 0 && buttonList.includes(this.name);
            }
        },
        data:function () {
            return {
                clazz : this.type
            }
        },
        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            },
        }
    }
</script>

<style scoped>

</style>
