<template>
    <div class="fcw-time-picker-cells-list" ref="timeContent">
        <ul class="fcw-time-picker-cells-ul">
            <li class="fcw-time-picker-cells-cell" 
                v-for="(item,index) in valueNumber" 
                :key="index"
                :id="getId(index)"
                @click="goAnchor(index)"
                :class="{'fcw-time-picker-cells-cell-selected':currentItem == index}">
                {{ index >= 10 ? index : `0${index}` }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        name:'timeValue',
        props:{
            valueNumber:Number,
            value:String
        },
        data(){
            return{
                currentItem:null
            }
        },
        watch:{
            value(newVal,oldVal){
                if(newVal !== this.currentItem){
                    this.currentItem = this.value;
                    this.goAnchor(this.value);
                }   
            },
        },
        created(){
            //监听勾选
            this.$on('inputFocus', ( cValue ) => {
                this.goAnchor(this.value)
            })
        },
        mounted(){
            this.value && this.goAnchor(this.value)
        },
        methods:{
            //过渡效果+点击事件
            goAnchor(val){
                this.$emit('input',val);
                this.$emit('timeSelect',val);
                this.currentItem  = val;
                let id ='#'+ this.getId(val);
                this.$refs.timeContent.scrollTop = val * 24;
            },
            getId(index){
                let value = index >=10?index:`0${index}`;
                return 'anchor-'+value
            }
        }
    }
</script>

<style lang="less" scoped>
    .fcw-time-picker-cells-list{
        width: 100%;
        max-height: 144px;
        overflow: hidden;
        scroll-behavior: smooth;
        &:hover{ overflow-y: overlay;}
        transition: all 2s;
        .fcw-time-picker-cells-ul{
            width: 100%;
            margin: 0;
            padding: 0 0 120px;
            list-style: none;
            .fcw-time-picker-cells-cell{
                color: rgb(101, 113, 128);
                font-size: 12px;
                width: 100%;
                height: 24px;
                line-height: 24px;
                margin: 0;
                text-indent: 20px;
                box-sizing: content-box;
                text-align: left;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                cursor: pointer;
                list-style: none;
                transition: all .2s ease-in-out;
                &:hover { background: #f3f3f3;}
            }
            .fcw-time-picker-cells-cell-selected{
                color: #39f;
                background: #f3f3f3;
            }
        }
    }
    /*修改滚动条样式*/
    .fcw-time-picker-cells-list::-webkit-scrollbar{
        width:7px;
        height:7px;
    }
    .fcw-time-picker-cells-list::-webkit-scrollbar-track{
        background: #fff;
        border-radius:2px;
    }
    .fcw-time-picker-cells-list::-webkit-scrollbar-thumb{
        background: rgba(0,0,0,0.3);
        border-radius:10px;
    }
    .fcw-time-picker-cells-list::-webkit-scrollbar-corner{
        background: #fff;
    }
    .fcw-time-picker-cells-list::-webkit-scrollbar-track-piece{ background: #fff;}
    .xsxsa{position: fixed; left: 10px;}
</style>
