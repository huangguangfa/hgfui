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
import Emitter from '../utils/mixins/emitter.js';
export default {
    components:{
        demo1
    },
    mixins:[ Emitter],
    name: 'demo',
    props: ['count'],
    interitAttrs:true,
    created () {
        this.$on('parantMessage', value => {
            console.log('接收子组件数据',value)
            // this.$emit('change', value);
        });
        // console.log(this.$attrs)
        // console.log(this.$listeners)
    },
    methods:{
        handleChange(){
            this.dispatch('fcw-radio', 'radioChang', [this.value]);
        }
        
    }
}
</script>

<style lang="less" scoped>
.demo{border: 1px solid red;}
</style>