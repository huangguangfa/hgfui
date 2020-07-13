<template>
    <div class="demo">
       <!-- <fcw-tree
            :data="treeList"
            show-checkbox
            :default-checked-keys="[2]"
            :defalut-expand-keys="[1]"
            @node-click="nodeClick">
        </fcw-tree> -->
        <button @click="show = !show">异步请求选中</button>
    <collapse-transition>
        <div v-show="show">
            <ul>
                <li>xasxas</li>
                <li>xasxas</li>
                <li>xasxas</li>
                <li>xasxas</li>
                <li>xasxas</li>
                <li>xasxas</li>
            </ul>
        </div>
    </collapse-transition>

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
// .demo{border: 1px solid red;}
</style>