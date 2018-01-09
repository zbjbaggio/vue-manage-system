<template>
    <div>
        <el-button v-if="isPermission" @click="handleClick">
            <slot></slot>
        </el-button>
    </div>
</template>

<script>
    export default {
        name: "permission",
        props: {
            name: {
                type: String,
                default: ''
            }
        },
        created() {
            this.isPermission = function () {
                console.log(this.name);
                let buttonList = JSON.parse(localStorage.getItem('buttonList'));
                console.log(buttonList);
                return buttonList && buttonList.length && buttonList.includes(this.name);
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
