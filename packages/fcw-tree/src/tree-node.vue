<template>
    <div class="fcw-tree-node">
        
        <div class="fcw-tree-current"   @click.stop="handleUnfoldClick(data)">
            <span 
                v-if="isChidren()" 
                class="iconfont gf-sanjiaoright fcw-tree-node__expand-icon"
                :class="{
                    'fcw-expanded':data.show
                }">
            </span>

            <fcw-checkbox 
                v-if="showCheckbox" 
                v-model="data.check" 
                @change="handleCheckChange" 
                @click.native.stop
                :indeterminate="data.indeterminate"
            >
            </fcw-checkbox>

            <span class="fcw-tree-node__label">{{ data.name }}</span>
        </div>
        
        <div v-if="isChidren()">
            <div v-for="i in data.children" :key="i.id" class="fcw-tree-node__children" v-show="data.show">
                <fcw-tree-node :data="i" :show-checkbox="showCheckbox"></fcw-tree-node>
            </div>
        </div>
        
    </div>
</template>

<script>
    import fcwCheckbox from '../../fcw-checkbox/src/checkbox';
    export default{
        name:'fcw-tree-node',
        components:{
            fcwCheckbox
        },
        props:{
            data:{},
            showCheckbox: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                
            }
        },
        methods:{
            handleUnfoldClick(val){
                this.$emit('nodeClick',val)
                this.data.show = !this.data.show;
            },
            handleCheckChange(value, ev){
                this.$emit('node-expand',data);
                console.log(value,ev)
            },
            isChidren(){
                return this.data.children && this.data.children.length
            },
            handleNodeExpand(value){
                console.log(value)
            }
        }
    }
</script>

<style lang="less">
    .fcw-tree-node{
        margin: 10px;
        .fcw-tree-current{ 
            cursor: pointer; display: flex; align-items: center;
            .fcw-tree-node__expand-icon{
                cursor: pointer;
                color: #c0c4cc;
                font-size: 12px;
                transform: rotate(0deg);
                transition: transform .3s ease-in-out;
                margin-right: 7px;
            }
            .fcw-expanded{transform: rotate(90deg);}
            .fcw-tree-node__label{font-size: 14px;color: #606266;}
        //    &:hover .fcw-tree-node__label{color: #409eff;}
        //    &:hover .fcw-tree-node__expand-icon{color: #409eff;}
        }
        .fcw-tree-node__children{ padding-left: 28px;}
    }
    

</style>