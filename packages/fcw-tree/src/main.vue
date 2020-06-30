<template>
    <div class="fcw-tree">
        <div v-for="chiitem in data" :key="chiitem.nodeKey">
            <fcw-tree-node :data="chiitem" :show-checkbox="showCheckbox" :node-key="nodeKey"></fcw-tree-node>
        </div>
    </div>
</template>

<script>
    import fcwTreeNode from './tree-node';
    import { valInDeep, flattenDeep, flattenDeepParents,familyDeepflatten } from '../../../utils/array';
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
            nodeKey:{},
            props:{
                type:Object,
                default:()=>{
                    return {
                        children:'children',
                        label:'id'
                    }
                }
            }
        },
        components:{
            fcwTreeNode
        },
        created(){
            //监听单行点击
            this.$on('nodeClick', ( value ) => {
                this.$emit( 'node-click', value );
            })
            //监听勾选
            this.$on('check', ( cValue ) => {
                // checkStatus 勾选状态
                // value 当前选中的数据
                let { checkStatus, value } = cValue;
                let flattenResult = familyDeepflatten( this.data, value.id );
                flattenResult.forEach( item =>{
                    if( item.id === value.id ){
                        let childrenFlaten = flattenDeep( [ item ], 'children' );
                        childrenFlaten.find( item => { item.check = checkStatus } );
                    }else{
                        let check = true;
                        let indeterminate = false;
                        item.children.find( childs => {
                            if( childs.check === false ){ check = false };
                            if( childs.check === true ){  indeterminate = true };
                            if( childs.indeterminate === true ){  indeterminate = true };
                        })
                        item.check = check;
                        item.indeterminate = check === false ? indeterminate : false;
                    }
                })
            })
        }
    }
</script>