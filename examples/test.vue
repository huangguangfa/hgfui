<template>
    <div class="test">
        混入组件
    </div>
</template>

<script>
    export default{
        data(){
            return {
                aaa:'我是混入组件属性'
            }
        },
        created(){
            console.log('直接混入',this.time)
        }
    }
</script>