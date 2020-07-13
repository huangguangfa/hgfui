<template>
    <div class="fcw-tree-node">
        <div class="fcw-tree-current" @click.stop="handleUnfoldClick">
            <span
                v-if="isChidren() && showCheckbox"
                class="iconfont gf-sanjiaoright fcw-tree-node__expand-icon"
                :class="{
                    'fcw-expanded':data.show
                }">
            </span>

            <span class="basis_tree" v-show="!showCheckbox">
                <i v-show="isChidren() && !data.show" class="iconfont gf-wenjianjia file_icon"></i>
                <i v-show="isChidren() && data.show" class="iconfont gf-wenjianjia1"></i>
                <i v-show="!isChidren()" class="iconfont gf-wenjian"></i>
            </span>
            
            <fcw-checkbox
                v-if="showCheckbox"
                v-model="data.check"
                @change="handleCheckChange"
                @click.native.stop
                :indeterminate="data.indeterminate"
            >
            </fcw-checkbox>

            <span class="fcw-tree-node__label" :class="!showCheckbox ?'tree_hover':''">{{ data[ label ] }}</span>

        </div>
        
        <div v-if="isChidren()">
            <fcw-collapse-transition>
                <div v-for="i in data.children" :key="i.nodeKey" class="fcw-tree-node__children" v-show="data.show">
                    <fcw-tree-node :data="i" :label="label" :show-checkbox="showCheckbox"></fcw-tree-node>
                </div>
            </fcw-collapse-transition>
        </div>
        
    </div>
</template>

<script>
    import fcwCheckbox from '../../fcw-checkbox/src/checkbox';
    import emitter from '../../../utils/mixins/emitter.js';
    import fcwCollapseTransition from '../../transitions/collapse-transition.js';
    export default{
        name:'fcw-tree-node',
        mixins:[ emitter ],
        components:{
            fcwCheckbox,fcwCollapseTransition
        },
        props:{
            label:{
                type:String,
                default:'name'
            },
            data:Object,
            showCheckbox: {
                type: Boolean,
                default: false
            },
            nodeKey:{},
        },
        methods:{
            handleUnfoldClick(){
                this.data.show = !this.data.show;
                this.dispatch('fcw-tree', 'nodeClick', this.data);
            },
            handleCheckChange(status, ev){
                this.dispatch('fcw-tree', 'check',{
                    checkStatus:status,
                    value:this.data
                });
            },
            isChidren(){
                return this.data.children && this.data.children.length 
            },
        }
    }
</script>

<style lang="less" scoped>
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
            .tree_hover:hover{ color: #72a7cf;}
        //    &:hover .fcw-tree-node__label{color: #409eff;}
        //    &:hover .fcw-tree-node__expand-icon{color: #409eff;}
        }
        .fcw-tree-node__children{ padding-left: 28px;}
    }
    
    .basis_tree{
        color: #72a7cf;
        .iconfont{margin-right: 5px;}
        .file_icon{
            color: #72a7cf;;
        }
    }
</style>
<style>
.collapse-transition {
  transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}
</style>