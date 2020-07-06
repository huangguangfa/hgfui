<template>
    <div id="app">
        <router-view class="page"></router-view>
    </div>
</template>

<script>
import demo from './demo';
import demoText from './common/demo';
export default {
    components:{
        demo,demoText
    },
    name: 'App',
    data(){
        return {
            selectPath:'',
        }
    }
}
</script>
<style lang="less" src="./style/base/reaet.less"></style> 
<style lang="less" src="./style/commonCss/index.css"></style> 
