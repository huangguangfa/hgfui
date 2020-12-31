<template>
    <div class="demo">
       <!-- <fcw-upload 
            ref="upload"
            url="http://192.168.0.18:5000/oss/oss/storageObject"
            name="file"
            :headers="headers"
            @success="filesuccess"
            >
        </fcw-upload> -->
        <!-- <fcw-select v-model="selectText" :select-data="selectList" :options="options"></fcw-select> -->
        <!-- <button @click="show = !show">异步请求选中</button> -->
        <!-- :headers="headers" -->
        <!-- <button @click="mes">查询</button> -->
        <!-- <fcw-time-picker 
            v-model="time" 
            type="timerange" 
            format="HH点mm分" 
            distinguish="至" 
            @on-ok="onok"
            confirm>
        </fcw-time-picker> -->
        <!-- <test v-model="text"></test> -->
        <!-- <fcw-time-picker v-model="time" format="HH:mm:ss" type="timerange" distinguish="至" ></fcw-time-picker> -->
        <!-- <Case v-model="time"></Case> -->
        <!-- <crop></crop> -->
        <!-- <fcw-crop></fcw-crop> -->
        <!-- <fcw-calendar v-model="day"> </fcw-calendar> -->
        <!-- <fcw-input></fcw-input> -->
        <div class="laoding" v-floading="loaidng">
            测试v-loading
        </div>

        <button @click="loaidng = !loaidng">更改loaidng</button>
    </div>
</template>
<script>
import Emitter from '../utils/mixins/emitter.js';
import CollapseTransition from '../packages/transitions/collapse-transition.js'
import test from './test'
import Case from './demoCom/demo.js'
import crop from './demoCom/crop';
export default {
    components:{
        CollapseTransition,test,Case,crop
    },
    name: 'demo',
    // mixins:[test],
    data(){
        return{
            loaidng:true,
            day:['2020-06-01'],
            // time:[],
            text:{},
            time:["00:00:00", "00:00:00"],
            // time:'05点03分04秒',
            options:{ label:'name', value:'id' },
            selectText:'',
            selectList:[
               { id:'2', name:'西瓜' },
               { id:'1', name:'菠萝' },
               { id:'3', name:'香蕉' }
            ],
            show:false,
            checkList:[7,3],
            treeList1:[],
            filmList:[
                {
                    id:1,
                    label:'青春偶像剧',
                    children:[
                        {
                            id:2,
                            label:'小明爬山记',
                            pid:1,
                        },
                        {
                            id:3,
                            label:'隐秘角落',
                            pid:1,
                        }
                    ]
                },
                {
                    id:4,
                    label:'电视剧',
                    children:[
                        {
                            id:5,
                            label:'迪迦奥特曼',
                            pid:4,
                            
                        },
                        {
                            id:6,
                            label:'火影忍者',
                            pid:4
                        }
                    ]
                }
            ],
            headers:{
                Authorization:'1282855124849242114'
            },
            treeList:[
                {
                    id:1,
                    label:'子级1',
                    children:[
                        {
                            id:2,
                            label:'子级1-1',
                            pid:1,
                            children:[
                                {
                                    label:'子级1-1-1',
                                    id:7,
                                    pid:2
                                }
                            ]
                        },
                        {
                            id:3,
                            label:'子级1-2',
                            pid:1
                        }
                    ]
                },
                {
                    id:4,
                    label:'子级2',
                    children:[
                        {
                            id:5,
                            label:'子级2-1',
                            pid:4
                        },
                        {
                            id:6,
                            label:'子级2-2',
                            pid:4
                        }
                    ]
                }
           ] 
        }
    },
    mounted(){
        // setTimeout(()=>{
        //     this.time = ["00:00:00", "00:00:00"]
        //     // this.text = {
        //     //     name:'异步数据'
        //     // }
        // },2000)
    },
    methods:{
        onok(time){
            console.log(time)
        },
        mes(){  
            this.$message({
                message:'测试消息',
                type:'success'
            })
        },
        filesuccess(result){
            console.log(result)
        },
        nodeClick(row){
            console.log(row)
        }
    }
}
</script>

<style lang="less" scoped>
circle {
    -webkit-transition: stroke-dasharray .25s;
    transition: stroke-dasharray .25s;
}
.demo{width: 1000px; height: 600px;display: flex;justify-items: center;align-items: center;margin: 0 auto; margin-left: 100px;}
.laoding{width: 120px; height: 30px;background: red;cursor: pointer;color: #fff; text-align: center;line-height: 30px;}
</style>