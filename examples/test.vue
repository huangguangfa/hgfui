<template>
    <div class="test">
        
        <button @click="submit">提交数据</button>

        <component :is="panel"></component>

    </div>
</template>

<script>
    export default{
        props:{
            value:Object
        },  
        created(){
            console.log('created监听是否有值---->',this.value)
        },
        watch:{
            value(newVal,oldVal){
                console.log('监听到有数据变化----->',newVal)
            }
        },
        data(){
            return {
                panel:'demoTwo',
            }
        },
        methods:{
            submit(){
                this.panel = 'demoOne'
                // let obj = { name:'修改后的数据'}
                // this.$emit('input',obj)
            },
            deepClone(obj){
                let target = {};
                for( let key in obj){
                    if(Object.prototype.hasOwnProperty.call(obj,key)){
                        if(typeof obj[key] === 'object'){
                            target[key] = this.deepClone(obj[key])
                        }else{
                            arget[key] = obj[key]
                        }
                    }
                }
                return target
            }
        }
    }
</script>