<template>
    <div class="fcw-tree">
        <div v-for="chiitem in treeData" :key="chiitem.nodeKey">
            <fcw-tree-node :data="chiitem" :show-checkbox="showCheckbox" :label="props.label" :node-key="nodeKey"></fcw-tree-node>
        </div>
    </div>
</template>

<script>
    import fcwTreeNode from './tree-node';
    import { valInDeep, flattenDeep, flattenDeepParents,familyDeepflatten,deepClone } from '../../../utils/array';
    export default{
        name:"fcw-tree",
        props:{
            data:Array,
            //显示勾选框
            showCheckbox: {
                type: Boolean,
                default: false
            },
            //默认选中
            defaultCheckedKeys:Array,
            //是否展开所有
            defaultExpandAll:Boolean,
            //默认展开的节点
            defalutExpandKeys:Array,
            nodeKey:{},
            props:{
                type:Object,
                default:()=>{
                    return {
                        children:'children',
                        label:'label'
                    }
                }
            }
        },
        data(){
            return {
                treeData:[]
            }
        },
        components:{
            fcwTreeNode
        },
        watch:{
            defaultCheckedKeys(newVal,oldVal){
                this.defaultChecked()
            },
            defalutExpandKeys(newVal,oldVal){
                this.defaultExpand()
            },
            data(newVal,oldVal){
                this.assembleData();
                this.defaultCheckedKeys && this.defaultChecked();
            }
        },
        created(){
            //组装数据
            this.assembleData();
            //回显勾选
            this.defaultCheckedKeys && this.defaultChecked();
            // 默认展开
            this.defalutExpandKeys && this.defaultExpand()
            //监听单行点击
            this.$on('nodeClick', ( value ) => {
                this.$emit('node-click', value );
            })
            //监听勾选
            this.$on('check', ( cValue ) => {
                this.$emit('check-change', value );
                // checkStatus 勾选状态
                // value 当前选中的数据
                let { checkStatus, value } = cValue;
                this.changCheckStatus(checkStatus,value.id);
            })
        },
        methods:{
            defaultExpand(){
                this.defalutExpandKeys.forEach( id =>{
                    let result = valInDeep(this.treeData,id, 'id',this.props.children);
                    result[0].show = true;
                })
            },
            assembleData(){
                if(!this.data){
                    return false
                }
                let allDataList = flattenDeep( this.data, this.props.children );
                allDataList.forEach( item =>{
                    this.defaultExpandAll 
                    ? item.show = true
                    : item.show = false;
                    item.check = false;
                    item.indeterminate = false;
                })
                //拷贝
                this.treeData = deepClone(this.data);

            },
            defaultChecked(){
                this.defaultCheckedKeys.forEach( id =>{
                    this.changCheckStatus(true,id);
                })
            },
            changCheckStatus(checkStatus,id){
                //递归找这条线所有父级
                let flattenResult = familyDeepflatten( this.treeData, id );
                flattenResult.forEach( item =>{
                    if( item.id === id ){
                        //找到当前勾选的数据把他下面的子级递归为一维数组、并且把子级全部设置为当前勾选的状态 true || false
                        let childrenFlaten = flattenDeep( [ item ], this.props.children );
                        childrenFlaten.forEach( item => { item.check = checkStatus } );
                    }else{
                        let check = true;
                        let indeterminate = false;
                        //判断他下面的children的个个状态、然后去设置父级的半选或者全选状态
                        item.children.find( childs => {
                            if( childs.check === false ){ check = false };
                            if( childs.check === true ){  indeterminate = true };
                            if( childs.indeterminate === true ){  indeterminate = true };
                        })
                        item.check = check;
                        item.indeterminate = check === false ? indeterminate : false;
                    }
                })
            }
        }
    }
</script>