<template>
    <div class="fcw-select"  
        :class="{
            'fcw-select-medium':size === 'medium',
            'fcw-select-small':size === 'small',
            'fcw-select-mini':size === 'mini'
        }"
        @click.stop="selectShow = !selectShow" 
        v-clickoutside="handleClose">

        <div class="fcw-select-input"  @mouseover="showclose(true)" @mouseout="showclose(false)">
            <input type="text" v-model="selectLabel" readonly placeholder="请选择">
            <i v-if="closeStatus === false" class="iconfont gf-xiala" :class="{ 'i-rotate':selectShow}"></i>
            <i v-if="closeStatus === true" class="iconfont gf-cuo" @click="close"></i>
        </div>
        
        <div class="select-content" v-show="selectShow"
            :class="{
               'fadeInDown':selectShow === true,
                'fcw-content-medium':size === 'medium',
                'fcw-content-small':size === 'small',
                'fcw-content-mini':size === 'mini'
            }">
            <ul>
                <li  
                    v-for="item in selectData" :key="item[ options.label ]"
                    :class="{
                        'select-selected':item.select,
                        'select-disable':item.disable
                    }"
                    @click.stop="!item.disable?getSelectedItem( item[ options.value ] ):''"> {{ item[ options.label ] }} 
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name:'fcw-select',
    props:{
        // v-model
        value:'',
        //数据
        selectData:{
            type:Array,
            default:() => {return []}
        },
        //替换循环的key value
        options:{
            type:Object,
            default:()=>{
                return{
                    label:'label',
                    value:'value',
                }
            }
        },
        size:String,
        clearable:Boolean
    },
    created(){
        this.getSelectData();
    },
    data(){
        return{
            selectShow:false,
            selectValue:'',
            selectLabel:'',
            seleData:[],
            closeStatus:false
        }
    },
    //监听变化
    watch:{
        options:function(value){
            this.getSelectedItem(value);
        },
        selectData:function(value){
            this.getSelectedItem(this.value);
        },
        value:function(value){
            if(value !== this.selectValue){
                this.getSelectedItem(value);
            }
        }
    },
    methods:{
        close(){
            this.$emit('input', '');
            this.selectValue = '';
            this.selectLabel = '';
            this.closeStatus = false;
            this.getSelectedItem()
        },
        showclose(status){
            if(this.clearable && this.selectLabel){
                this.closeStatus = status;
            }
        },
        handleClose(){
            this.selectShow = false;
        },
        getSelectedItem(sel){
            let key = this.options.label;
            let value = this.options.value;
            this.selectData.find( item =>{
                if( item[ value ] === sel ){
                    item[ 'select' ] = true;
                    this.$emit('input', item[ value ]);
                    this.selectValue = item[ value ];
                    this.selectLabel = item[ key ];
                }else{
                    item[ 'select' ] = false;
                }
            })
            this.selectShow = false;
        },
        getSelectData(){
            this.value && this.getSelectedItem(this.value);
        }
    }
}
</script>

<style scoped lang="less">
    .fcw-select{
        width: 100%; height: 40px; padding: 0 10px; box-sizing: border-box;
        border: 1px solid #dcdfe6; border-radius: 5px; position: relative;
        .fcw-select-input{
            width: 100%; height: 100%; display: flex;align-items: center;
            >input{
                outline: none; display:block;  width: 100%; height: 100%; font-size: 12px; color: #606266; cursor: pointer;
            }
            input::-webkit-input-placeholder{
                color:#dcdfe6;
            }
            input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color:#dcdfe6;
            }
            input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color:#dcdfe6;
            }
            input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
                color:#dcdfe6;
            }
            .gf-xiala{
                font-size: 25px;
                color: #c0c4cc;
                transition: transform .3s;
                cursor: pointer;
            }
            .gf-cuo{
                font-size: 15px;
                color: #c0c4cc;
                cursor: pointer;
                position: relative;
                right: 5px;
            }
            .i-rotate{
                transform: rotate(180deg);
            }
        }
        .select-content{
            position: absolute;
            left: 0px;
            top: 45px;
            border: 1px solid #e4e7ed;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            box-sizing: border-box;
            width: 100%;
            transform-origin: center top;
            z-index: 2024;
            >ul{
                overflow: hidden;
                padding: 10px 0; box-sizing: border-box;
                max-height: 200px;
                &:hover{overflow: auto;}
                li{
                    font-size: 14px;
                    padding: 0 20px;
                    position: relative;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #606266;
                    height: 34px;
                    line-height: 34px;
                    box-sizing: border-box;
                    cursor: pointer;
                    &:hover{
                        background-color: #f5f7fa;
                    }
                }
                .select-selected{
                    color: #409eff;
                    font-weight: 700;
                }
                .select-disable{
                    color: #c0c4cc;
                    cursor: not-allowed;
                }
            }
        }
        .select-content::after{
            position: absolute;
            top: -5px;
            content: "";
            left: 50%;
            margin-left: -5px;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid rgba(0,0,0,.1);
        }
        .select-content::before{
            position: absolute;
            top: -4px;
            content: "";
            left: 50%;
            margin-left: -5px;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #fff;
            z-index: 5;
            filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
        }
        .fcw-content-mini{top: 35px;}
        .fcw-content-small{top: 38px;}
        .fcw-content-medium{top: 43px;}
    }
    .fcw-select-mini{ height: 28px; }
    .fcw-select-small{ height: 32px;}
    .fcw-select-medium{ height: 36px;}
    
</style>