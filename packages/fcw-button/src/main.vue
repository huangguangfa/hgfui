<template>
    <button
        @click="$emit('click')"
        class="fcw-button"
        :disabled="disabled || loading"
        :class="[
            type ? 'fcw-button--' + type : '',
            size ? 'fcw-button--' + size : '',
            {
                'fcw-is-disabled': disabled,
            }
        ]"
    >
        <i class="iconfont gf-loading" v-if="loading"></i>
        <i class="iconfont fcw-button-icon" :class="icon" v-if="icon && !loading"></i>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name:'fcw-button',
    props:{
        //按钮类型
        type:String,
        //是否禁用
        disabled:Boolean,
        //按钮大小 mini超小 small小型 medium中等
        size:String,
        //加载loading
        loading:Boolean,
        //icon
        icon:String
    }
}
</script>

<style scoped lang="less">
    .fcw-button-icon{margin-right: 5px;}
    .gf-loading{
        color: #fff;
        animation: rotate 2s linear infinite;
        font-size: 12px;
        transition: 0.5s;
        display: inline-block;
        margin-right: 5px;
    }
    .fcw-button{
        text-decoration: none;
        color: #606266;
        display: inline-block;
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        margin:5px 0px;
        padding: 8px 20px;
        white-space: nowrap;
        display: flex; justify-content: center; align-items: center;
        &:hover{
            color: #409eff;
            background-color: #ecf5ff;
            border-color: #c6e2ff;
        }
    }
    .fcw-button:active{background:	#F5F5F5;}
    .fcw-button--danger{
        color:#fff;
        background: #f56c6c;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#f56c6c), to(#f56c6c));
        background: -webkit-linear-gradient(#f56c6c 0%, #f56c6c 100%);
        background: -moz-linear-gradient(#f56c6c 0%, #f56c6c 100%);
        background: -o-linear-gradient(#f56c6c 0%, #f56c6c 100%);
        background: linear-gradient(#f56c6c 0%, #f56c6c 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fa5a5a', endColorstr='#e85151', GradientType=0 );
        &:active {background: rgba(250,90,90,0.7)}
        &:hover{ color: #fff;}
    }
    .fcw-button--primary {
        color:#fff;
        background: #409eff;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#409eff), to(#409eff));
        background: -webkit-linear-gradient(#409eff 0%, #409eff 100%);
        background: -moz-linear-gradient(#409eff 0%, #409eff 100%);
        background: -o-linear-gradient(#409eff 0%, #409eff 100%);
        background: linear-gradient(#409eff 0%, #409eff 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1bbcc2', endColorstr='#18a3a8', GradientType=0);
        &:active {background: rgba(64,158,255,0.7) }
        &:hover{ color: #fff;}
    }
    .fcw-button--success{
        color:#fff;
        background: #67c23a;
        background: -moz-linear-gradient(top, #67c23a 0%, #67c23a 100%);
        background: -webkit-gradient(left top, left bottom, color-stop(0%, #67c23a), color-stop(100%, #67c23a));
        background: -webkit-linear-gradient(top, #67c23a 0%, #67c23a 100%);
        background: -o-linear-gradient(top, #67c23a 0%, #67c23a 100%);
        background: -ms-linear-gradient(top, #67c23a 0%, #67c23a 100%);
        background: linear-gradient(to bottom, #67c23a 0%, #67c23a 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#82c8a0', endColorstr='#82c79e', GradientType=0 );
        &:active {background:rgba(103,194,58,0.7)}
       &:hover{ color: #fff;}
    }
    .fcw-button--warning{
        color:#fff;
        background: #e6a23c;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#e6a23c), to(#e6a23c));
        background: -webkit-linear-gradient(#e6a23c 0%, #e6a23c 100%);
        background: -moz-linear-gradient(#e6a23c 0%, #e6a23c 100%);
        background: -o-linear-gradient(#e6a23c 0%, #e6a23c 100%);
        background: linear-gradient(#e6a23c 0%, #e6a23c 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0d264', endColorstr='#e5c960', GradientType=0 );
        &:active {background-color:rgba(2230,162,60,0.7);}
        &:hover{ color: #fff;}
    }
    .fcw-button--info{
        color:#fff;
        background: #909399;
        background: -webkit-gradient(linear, 0 0, 0 100%, from(#909399), to(#909399));
        background: -webkit-linear-gradient(#909399 0%, #909399 100%);
        background: -moz-linear-gradient(#909399 0%, #909399 100%);
        background: -o-linear-gradient(#909399 0%, #909399 100%);
        background: linear-gradient(#909399 0%, #909399 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0d264', endColorstr='#e5c960', GradientType=0 );
        &:active {background:rgba(144,147,153,0.7) }
        &:hover{ color: #fff;}
    }
    .fcw-is-disabled{
        cursor: not-allowed;
        opacity: 0.6;
    }
    .fcw-button--mini{
        padding: 4px 10px;
    }
    .fcw-button--small{
        padding: 6px 15px;
    }
    .fcw-button--medium{
        padding: 7px 17px;
    }
</style>