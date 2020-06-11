<template>
    <div class="fcw-tree-node">

        <div class="fcw-tree-current" @click.stop="unfoldClick">
            <span class="iconfont gf-sanjiaoright fcw-tree-node__expand-icon"></span>
            
            <span class="fcw-tree-node__label"> {{ data.name }}</span>
        </div>

        <div v-if="data.children && data.children.length">
            <div v-for="i in data.children" :key="i.id" class="fcw-tree-node__children" v-show="data.show">
                <fcw-tree-node :data="i"></fcw-tree-node>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default{
        name:'fcw-tree-node',
        props:{
            data:{}
        },
        data(){
            return{
                
            }
        },
        methods:{
            unfoldClick(){
                this.data.show = !this.data.show;
            }
        }
    }
</script>

<style lang="less">
    .fcw-tree-node{
        margin: 10px;
        .fcw-tree-current{ 
            cursor: pointer;
            .fcw-tree-node__expand-icon{
                cursor: pointer;
                color: #c0c4cc;
                font-size: 12px;
                transform: rotate(0deg);
            }
            .fcw-tree-node__label{font-size: 14px;color: #606266;
                
            }
           &:hover .fcw-tree-node__label{color: #409eff;}
           &:hover .fcw-tree-node__expand-icon{color: #409eff;}
        }
        .fcw-tree-node__children{ padding-left: 20px;}
    }
    

</style>