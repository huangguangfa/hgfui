<template>
    <div class="fcw-tree">
        <div v-for="chiitem in treeList" :key="chiitem.id">
            <fcw-tree-node :data="chiitem"></fcw-tree-node>
        </div>
    </div>
</template>

<script>
    import fcwTreeNode from './tree-node';
    export default{
        name:"fcw-tree",
        components:{
            fcwTreeNode
        },
        data(){
            return{
                treeList:[
                    {
                        name:'树形组件1',
                        id:1,
                        show:false,
                        children:[
                            {
                                name:'子树形组件1-1',
                                id:2,
                                show:false
                            }
                        ]
                    },
                    {
                        name:'树形组件2',
                        id:3,
                        show:false,
                        children:[
                            {
                                name:'子树形组件2-2',
                                id:4,
                                show:false
                            }
                        ]
                    },
                ]
            }
        }
    }
</script>