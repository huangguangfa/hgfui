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
            <!-- <fcw-circleview percentage="10" unit="个" color="yellow"></fcw-circleview> -->

            <!-- 上传插件 -->
            <fcw-upload 
                ref="upload"
                url="http://192.168.1.117:5000/oss/oss/storageObject"
                name="object"
                :headers="{
                    Authorization:'1272714003127820290'
                }"
                :limit="10"
                :isDrag="true"
                @success="filesuccess"
                @previewfile="previewfile">
            </fcw-upload>
            <button @click="upAll"> 上传</button>

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

            <!-- <fcw-select v-model="selectText" :selectData="selectList" clearable :options="options"></fcw-select> -->

            <!-- <button @click="aaa">查询</button> -->

            <!-- <fcw-tag>标签二</fcw-tag>
            <fcw-tag type="success">标签一</fcw-tag>
            <fcw-tag type="info">标签三</fcw-tag>
            <fcw-tag type="warning">标签四</fcw-tag>
            <fcw-tag type="error">标签五</fcw-tag> -->
            
            <!-- show-password disabled clearable -->
            <!-- <fcw-input v-model="copy" placeholder="请输入内容" show-password @input="inputChange" >
                <i slot="prepend" class="iconfont gf-sousuo"></i>
            </fcw-input> -->
            <!-- <button @click="input">查询</button> -->

            <!-- <demo :count="count" :num="num" @changData="changData" v-on:another = 'another'></demo> -->

            <!-- <fcw-page 
                :current-page="currentPage"
                :page-size="pageSize"
                :total="100"
                show-total
                @current-change="currentChange"
                sizes
                :page-sizes="[10,20,30,100]"
            >
            </fcw-page>
            <button @click="currentPage = 6">xaxa</button> -->

            <!-- <fcw-crop v-model="obj"></fcw-crop> -->

            <!-- <fcw-radio-group v-model="radio">
                <fcw-radio label="1">测试1</fcw-radio>
                <fcw-radio label="2">测试2</fcw-radio>
                <fcw-radio label="3" v-model="radio" disabled>禁用单选</fcw-radio>
            </fcw-radio-group> -->
            
            <!-- <button @click="radio = '2'">切换</button>

            <fcw-radio label="1" v-model="radio">单选1</fcw-radio>
            <fcw-radio label="2" v-model="radio" disabled>禁用单选</fcw-radio>
            <fcw-radio label="3" v-model="radio">单选2</fcw-radio> -->

            <!-- <fcw-checkbox label="10" v-model="checkAll" :indeterminate="indeterminate"  @change="checkboxChangAll">全选</fcw-checkbox>
            -----------------
            <fcw-checkbox-group v-model="checkList" @change="checkboxChang">
                <fcw-checkbox label="1">多选A</fcw-checkbox>
                <fcw-checkbox label="2">多选B</fcw-checkbox>
                <fcw-checkbox label="3">多选C</fcw-checkbox>
            </fcw-checkbox-group> -->

            <!-- <fcw-checkbox label="3" >多选C</fcw-checkbox> -->
            <!-- <fcw-checkbox label="1" :value="cheListData[1].show">多选B</fcw-checkbox>
            <fcw-checkbox label="4" :value="cheListData[2].show">多选B</fcw-checkbox> -->
            <!-- <fcw-checkbox v-for="i in cheListData" :key="i.id" label="2" v-model="i.show">{{ i.name }}</fcw-checkbox>
            <button @click="findCheckStatus">查询</button> -->
            <!-- <fcw-checkbox label="3" disabled>多选C</fcw-checkbox> -->
            
            <!-- <button @click="radioChang">查看</button> -->

            <!-- <fcw-table :columns="columns" :data="tableData"> </fcw-table> -->


            
            <!-- <demo-text :age="19"></demo-text> -->
            
            <!-- <fcw-tree @node-click="nodeClick" showCheckbox :data="treeList"></fcw-tree>  -->

        </div>
    </div>
</template>

<script>
import demo from './demo';
import demoText from './common/demo';
export default {
    components:{
        demo,demoText
    },
    name: 'app',
    data(){
        return {

            cheListData:[
                {
                    id:1,
                    name:'测试1',
                    show:false,
                    check:false,
                    indeterminate:false,
                },
                {
                    id:2,
                    name:'测试2',
                    show:false,
                    check:false,
                    indeterminate:false,
                },
                {
                    id:3,
                    name:'测试3',
                    show:false,
                    check:false,
                    indeterminate:false,
                },
            ],
            treeList:[
                {
                    name:'树形组件1',
                    id:1,
                    show:false,
                    check:false,
                    indeterminate:false,
                    children:[
                        {
                            name:'子树形组件1-1',
                            id:2,
                            show:false,
                            check:false,
                            indeterminate:false,
                        }
                    ]
                },
                {
                    name:'树形组件2',
                    id:3,
                    show:false,
                    check:false,
                    children:[
                        {
                            name:'子树形组件2-2',
                            id:4,
                            show:false,
                            check:false
                        }
                    ]
                },
            ],
            indeterminate:false,
            checkAll:false,
            tableData:[
                {
                    name:'张三',
                    age:'18',
                    address:'深圳市南山区'
                },
                {
                    name:'李四',
                    age:'22',
                    address:'深圳市龙岗区'
                }
            ],
            columns:[
                {
                    title:'年龄',
                    key:'age'
                },
                {
                    title:'名称',
                    key:'name',
                    width:200
                },
                {
                    title:'地址',
                    key:'address'
                }
            ],
            checkList:[],
            obj:{},
            radio:true,
            currentPage:1,
            pageSize:10,
            count: 'count message',
            num: 'num message',
            options:{
                label:'name',
                value:'id'
            },
            selectText:'',
            selectList:[
                {
                    id:'2',
                    name:'西瓜'
                },
                {
                    id:'1',
                    name:'菠萝'
                },
                {
                    id:'3',
                    name:'香蕉'
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
        findCheckStatus(){
            console.log(this.cheListData)
        },  
        nodeClick(val){
            console.log('节点别点击',val)
        },
        checkboxChangAll(val){
            if(val){
                this.checkList = ['1','2','3']
            }else{
                this.checkList = []
                this.indeterminate = false;
            }
        },
        checkboxChang(value){
            if(value.length){
               this.indeterminate = true;
               if(value.length === 3){
                   this.checkAll = true;
               }else{
                   this.checkAll = false;
               }
            }else{
                this.checkAll = false;
                this.indeterminate = false;
            }
        },
        findRadio(){
            console.log(this.radio)
        },
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
                showClose:false,
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
  .demo{ width: 800px; height: 100px; margin: 0 auto;margin-top: 20px;}
</style>

