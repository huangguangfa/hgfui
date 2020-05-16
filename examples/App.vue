<template>
    <div id="app">
        <div class="demo">
            <copycom v-model="copy"  />
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            copy:'测试复制内容'
        }
    },
}
</script>
<style lang="less" src="./style/base/reaet.less"></style> 
<style lang="less">
  .demo{margin-top: 20px;}
   
</style>

