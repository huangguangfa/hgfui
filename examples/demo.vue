<template>
   <div class="demo">
       demo下
      {{count}}

      <button @click="$emit('another')">子组件按钮</button> 
      <demo1 v-bind="$attrs"  v-on='$listeners'/>
   </div>
</template>
<script>
import demo1 from './demo1';
export default {
    components:{
        demo1
    },
    name: 'demo',
    props: ['count'],
    interitAttrs:true,
    created () {
        // console.log(this.$attrs)
        console.log(this.$listeners)
    }
}
</script>

<style lang="less" scoped>
.demo{border: 1px solid red;}
</style>