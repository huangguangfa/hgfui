<template>
    <div class="fcw-tag">
        <span :class="getTypeClass()">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name:'fcw-tag',
        props:{
            type:String
        },
        data(){
            return {
                text:'标签一',
            }
        },
        methods:{
           getTypeClass(){
               return [
                    'fcw-tag-lignt',
                    this.type ? `fcw-tag-${this.type}` : '',
                    // tagSize ? `el-tag--${tagSize}` : '',
                    // effect ? `el-tag--${effect}` : '',
                    // hit && 'is-hit'
                ]
           }
        }
    }
</script>
<style lang="less" scoped>
.fcw-tag{
    .fcw-tag-lignt{
        background-color: #ecf5ff;
        display: inline-block;
        height: 32px;
        padding: 0 10px;
        line-height: 30px;
        font-size: 12px;
        color: #409eff;
        border: 1px solid #d9ecff;
        border-radius: 4px;
        box-sizing: border-box;
        white-space: nowrap;
    }
    .fcw-tag-success{
        background-color: #f0f9eb;
        border-color: #e1f3d8;
        color: #67c23a;
    }
    .fcw-tag-info{
        background-color: #f4f4f5;
        border-color: #e9e9eb;
        color: #909399;
    }
    .fcw-tag-warning{
        background-color: #fdf6ec;
        border-color: #faecd8;
        color: #e6a23c;
    }
    .fcw-tag-error{
        background-color: #fef0f0;
        border-color: #fde2e2;
        color: #f56c6c;
    }
}
</style>