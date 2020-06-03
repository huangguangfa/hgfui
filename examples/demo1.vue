<template>
    <div class="demo1">
        demo1下的
        {{count}} 
        {{num}}
        <button @click="$listeners.another">孙组件按钮</button>
    </div>
</template>

<script>
export default {
    props : [ 'count' , 'num'],
    created(){
        console.log('孙组件$listeners',this.$listeners)
        console.log('孙组件$attrs',this.$attrs)
    }
}
</script>

<style lang="less" scoped>
    .demo1{border: 1px solid blue;}
</style>