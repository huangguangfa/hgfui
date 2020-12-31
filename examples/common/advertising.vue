<template>
    <div class="advertising">
        <div class="applets_b">
             <p>扫码进入个人小程序</p>
            <img class="applets" src="https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F/WechatIMG129.jpeg" alt="">
        </div>
        <fcw-button type="success" @click="openBlogs">点击进入个人博客</fcw-button>
    </div>
</template>
<script>
    export default{
        methods:{
            openBlogs(){
                window.open('https://www.huangguangfa.cn')
            }
        }
    }
</script>
<style lang="less" scoped>
    .advertising{position: fixed;right: 30px;top: 0px;}
    .applets_b{
        margin-top: 141px;border:1px solid #e2ecf4;padding:10px; box-sizing: border-box; position: relative;padding-bottom:140px;
        .applets{width: 125px;height: 125px;margin-left: 3px;position: absolute;left: 0;top: 40px;}
        p{text-align: center;}
    }
    
</style>