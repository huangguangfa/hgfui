<template>
    <div class="advertising">
        <fcw-button type="success" @click="openBlogs">点击按钮进入个人博客</fcw-button>
        <div class="applets_b">
             <p>扫码进入个人小程序</p>
            <img class="applets" src="https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/%E5%B0%8F%E7%A8%8B%E5%BA%8F/WechatIMG129.jpeg" alt="">
        </div>
       
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
    .advertising{position: fixed;right: 30px;top: 10px;}
    .applets_b{
        margin-top: 50px;
        .applets{width: 150px;height: 150px;margin-top: 30px;margin: 0 auto;}
        p{text-align: center;}
    }
    
</style>