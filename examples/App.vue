<template>
    <div id="app">
        <div class="demo">
            <!-- copy组件 -->
            <!-- <fcw-copy v-model="copy"></fcw-copy> -->
            <!-- 图片查看器 -->
            <!-- <fcw-imageViewer 
                :ismultiple="true"
                :imgList="imgList">
            </fcw-imageViewer> -->

            <!-- 二维码生成 -->
            <!-- <fcw-qrcode 
                :size="300" 
                :islogo="true"
                :logo="{
                    src:require('./assets/logo.png'),
                    borderColor:'#fff',
                    bgColor:'transparent',
                    borderRadius:10,
                    logoSize:40,
                }"
                :content="{
                    name:'31231231',
                    age:19
                }"
            ></fcw-qrcode> -->

            <fcw-circleview percentage="10" unit="个" color="red"></fcw-circleview>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data(){
        return {
            copy:'测试复制内容',
            imgList:[
                {
                    name:'测试1号',
                    url:'https://boya-subway.obs.cn-south-1.myhuaweicloud.com:443/202005160447560424.jpg'
                },
                {
                    name:'测试2号',
                    url:'https://boya-subway.obs.cn-south-1.myhuaweicloud.com:443/202005180437150879.jpg'
                }
            ],
            imgUrl:'https://boya-subway.obs.cn-south-1.myhuaweicloud.com:443/202005160447560424.jpg',
            //qrcode
            logo:{
                src:require('./assets/logo.png'),
                borderColor:'#fff',
                bgColor:'red',
                borderRadius:10,
                logoSize:0.15
            }
        }
    }
}
</script>
<style lang="less" src="./style/base/reaet.less"></style> 
<style lang="less">
  .demo{ width: 100px; height: 100px; margin: 0 auto;margin-top: 20px;}
</style>

