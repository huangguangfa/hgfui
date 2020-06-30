<template>
    <div id="app">
        <router-view class="page"></router-view>
    </div>
</template>

<script>
import demo from './demo';
import demoText from './common/demo';
import navData from './nav.config.json'
export default {
    components:{
        demo,demoText
    },
    name: 'app',
    data(){
        return {
            navList:navData,
            selectPath:'',
        }
    },
    created(){
        
    },
    methods:{
        
    }
}
</script>
<style lang="less" src="./style/base/reaet.less"></style> 
<style lang="less" src="./style/commonCss/index.css"></style> 
