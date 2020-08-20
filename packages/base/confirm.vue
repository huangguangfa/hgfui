<template>
    <div class="fcw-picker-confirm">
        <fcw-button size="mini" style="margin-right:5px" type="info" @click.native="handleClear">取消</fcw-button>
        <fcw-button size="mini" @click.native="handleSuccess"  type="primary">确认</fcw-button>
    </div>
</template>

<script>
    const prefixCls = 'fcw-picker';
    import fcwButton from '../fcw-button/src/main.vue'
    export default{
        components:{
            fcwButton
        },
        methods:{
            handleClear () {
                this.$emit('on-pick-clear');
            },
            handleSuccess () {
                this.$emit('on-pick-success');
            },
        }
    }
</script>

<style lang="less" scoped>
    .fcw-picker-confirm{display: flex; justify-content: flex-end;padding-right: 5px;border-top: 1px solid #e3e8ee;}
    .mar-10{margin-right: 10px;}
</style>