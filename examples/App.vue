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

            <!-- 圆形进度条 -->
            <!-- <fcw-circleview percentage="10" unit="个" color="red"></fcw-circleview> -->

            <!-- 上传插件 -->
            <!-- <fcw-upload 
                ref="upload"
                url="http://121.37.7.216:5000/oss/oss/storageObject"
                name="object"
                :headers="{
                    Authorization:'e43241231'
                }"
                :autoUpload="false"
                @success="filesuccess"
                @previewfile="previewfile"
            ></fcw-upload>
            <button @click="upAll"> 上传</button> -->

            <!-- <fcw-calendar @change="change" v-model="day" currentDate="2020-04-01"></fcw-calendar>
            <button @click="all">点击查看</button> -->

            <!-- 按钮 -->
            <!-- <fcw-button type="info"   @click="buttonfn">信息按钮</fcw-button>
            <fcw-button type="success" size="mini"  @click="buttonfn">成功按钮</fcw-button>
            <fcw-button type="primary" size="small"  @click="buttonfn">主要按钮</fcw-button>
            <fcw-button type="warning" size="medium"  @click="buttonfn">警告按钮</fcw-button>
            <fcw-button type="danger"  @click="buttonfn">危险按钮</fcw-button>
            <fcw-button  @click="buttonfn">普通按钮</fcw-button>
            <fcw-button disabled type="warning"  @click="buttonfn">禁用按钮</fcw-button>
            <fcw-button  type="warning" size="small" :loading="true"  @click="buttonfn">加载中</fcw-button>
            <fcw-button  type="primary" size="small" icon="gf-tupian"  @click="buttonfn">照片</fcw-button> -->

            <!-- 消息弹窗 -->
            <!-- <button @click="mes">消息弹窗</button> -->

            <!-- <fcw-select v-model="selectText" :selectData="selectList" clearable :options="options"></fcw-select>

            <button @click="aaa">查询</button> -->

            <!-- <fcw-tag>标签二</fcw-tag>
            <fcw-tag type="success">标签一</fcw-tag>
            <fcw-tag type="info">标签三</fcw-tag>
            <fcw-tag type="warning">标签四</fcw-tag>
            <fcw-tag type="error">标签五</fcw-tag> -->
            
            <!-- show-password disabled clearable -->
            <!-- <fcw-input v-model="copy" placeholder="请输入内容" show-password @input="inputChange" >
                <i slot="prepend" class="iconfont gf-sousuo"></i>
            </fcw-input> -->
            <!-- <button @click="input">查询</button>

            <demo :count="count" :num="num" @changData="changData" v-on:another = 'another'></demo> -->

            <fcw-page 
                :current-page="currentPage"
                :page-size="pageSize"
                :total="100"
                @current-change="currentChange"
            >
            </fcw-page>
            <button @click="currentPage = 6">xaxa</button>
        </div>
    </div>
</template>

<script>
import demo  from './demo'
export default {
    components:{
        demo
    },
    name: 'app',
    data(){
        return {
            currentPage:1,
            pageSize:10,
            count: 'count message',
            num: 'num message',
            options:{
                label:'label',
                value:'value'
            },
            selectText:'',
            selectList:[
                    {
                        value:'2',
                        label:'bbb'
                    },
                    {
                        value:'1',
                        label:'aaa'
                    }
                ],
            copy:'',
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
            },
            fileList:[],
            day:['2020-04-01']
        }
    },
    created(){
        // setTimeout( () =>{
        //     this.selectText = undefined;
        //     // this.selectList = [
        //     //     {
        //     //         id:'0',
        //     //         name:'测试1',
        //     //         disable:true
        //     //     },
        //     //     {
        //     //         id:'1',
        //     //         name:'测试2'
        //     //     },
        //     //     {
        //     //         id:'3',
        //     //         name:'测试3'
        //     //     }
        //     // ]
        // },1500)
    },
    methods:{
        currentChange(page){
            console.log(page)
        },
        inputChange(value){
            console.log(value)
        },
        input(){
            console.log(this.copy)
        },
        aaa(){
            this.$message({
                type:'success',
                message:'操作成功！',
                showClose:true,
                onClose:(ev) =>{
                    console.log(ev)
                }
            })
        },
        mes(){
            this.$confirm({
                icon:'gf-loading',
                content:'测试消息'
            }).then( o =>{
                console.log(o)
            }).catch( x =>{
                console.log(x)
            })
        },
        buttonfn(){
            console.log('xaxas')
        },
        all(){
            console.log(this.day)
        },
        change(data){
            console.log(data)
        },
        upAll(){
            this.$refs.upload.moreUpload(this.fileList)
        },
        previewfile(file){
            this.fileList.push(file)
            console.log(file)
        },
        filesuccess(result){
            console.log(result)
        },
        changData(){
            console.log(this.copy)
        },
        another () {
            alert(2)
        }
    }
}
</script>
<style lang="less" src="./style/base/reaet.less"></style> 
<style lang="less">
  .demo{ width: 500px; height: 100px; margin: 0 auto;margin-top: 20px;}
</style>

