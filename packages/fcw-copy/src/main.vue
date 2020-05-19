<template>
    <div class="copy">
        <i class="iconfont" :class="icon" v-copy="value"></i>
    </div>
</template>

<script>
export default {
    name:'fcw-copy',
    props:{
        value:{
            type:String,
            default:''
        },
        icon:{
            type:String,
            default:'gf-fuzhi'
        }
    },
}
</script>

<style scoped lang="less">
    .copy{ display: inline; margin-left: 3px; position: relative; bottom: 3px;}
    .gf-fuzhi{color: #5491fc; cursor: pointer; font-size: 15px;}
</style>