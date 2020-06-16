<template>
   <div class="demo">
       <svg width="440" height="440" viewbox="0 0 440 440">
            <circle cx="220" cy="220" r="170" stroke-width="50" stroke="#FF0520" fill="none"></circle>
            <circle cx="220" cy="220" stroke-dasharray="500" r="170" stroke-width="50" stroke="#D1D3D7" fill="none"></circle>
        </svg>

        
       <!-- demo下
      {{count}}
      <button @click="$emit('another')">子组件按钮</button> 
      <demo1 v-bind="$attrs"  v-on='$listeners'/> -->
        <!-- <label class="weui-cell weui-check__label">
            <input type="checkbox" true-value="1" false-value="1" v-model="model" > 测试A
            <input type="checkbox" true-value="2" false-value="2" v-model="model"> 测试B 
        </label> -->

        <!-- <input type="checkbox" value="111" v-model="model">  -->

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
    data(){
        return{
            trueLabel:['0'],
            falseLabel:[]
        }
    },
    created () {
        this.$on('parantMessage', value => {
            console.log('接收子组件数据',value)
            // this.$emit('change', value);
        });
        // console.log(this.$attrs)
        // console.log(this.$listeners)
    },
    computed:{
        model:{
            get(){
                return ''
            },
            set(val){
                console.log(val)
            }
        }
    },
    methods:{
        handleChange(){
            this.dispatch('fcw-radio', 'radioChang', [this.value]);
        }
        
    }
}
</script>

<style lang="less" scoped>
circle {
    -webkit-transition: stroke-dasharray .25s;
    transition: stroke-dasharray .25s;
}
// .demo{border: 1px solid red;}
</style>