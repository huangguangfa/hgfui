<template>
    <div class="demo">
       <fcw-upload 
            ref="upload"
            url="http://192.168.0.18:5000/oss/oss/storageObject"
            name="file"
            :headers="headers"
            @success="filesuccess"
            >
        </fcw-upload>
        
        <!-- <button @click="show = !show">异步请求选中</button> -->
        <!-- :headers="headers" -->
    </div>
</template>
<script>
import demo1 from './demo1';
import Emitter from '../utils/mixins/emitter.js';
import CollapseTransition from '../packages/transitions/collapse-transition.js'
export default {
    components:{
        demo1,CollapseTransition
    },
    name: 'demo',
    data(){
        return{
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
    methods:{
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
.demo{width: 400px; height: 100px; }
</style>