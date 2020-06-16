<template>
    <div class="fcw-tree">
        <div v-for="chiitem in data" :key="chiitem.id">
            <fcw-tree-node :data="chiitem" @node-expand="handleNodeExpand" :show-checkbox="showCheckbox"></fcw-tree-node>
        </div>
    </div>
</template>

<script>
    import fcwTreeNode from './tree-node';
    export default{
        name:"fcw-tree",
        props:{
            data: {
                type: Array
            },
            showCheckbox: {
                type: Boolean,
                default: false
            },
        },
        components:{
            fcwTreeNode
        },
        data(){
            return{
                
            }
        },
        methods:{
            handleNodeExpand(value){
                console.log(value)
            }
        }
    }
</script>