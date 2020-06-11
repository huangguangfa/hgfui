<template>
    <div class="fcw-table">
        
        <div class="fcw-table__header-wrapper">
            <table>
                <colgroup>
                    <col v-for="(cols,index) in columns" :key="index" :width="cols.width"/>
                </colgroup>
                <thead>
                    <tr>
                        <th colspan="1" rowspan="1" v-for="(columnS,index) in columns" :key="index">
                            <div class="fcw-table-cell"> {{ columnS.title }} </div> 
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        
        <div class="fcw-table__body">
            <table>
                <colgroup>
                    <col v-for="(cols,index) in columns" :key="index" :width="cols.width"   />
                </colgroup>
                <tbody>
                    <tr v-for="(item,index) in data" :key="index">
                        <td colspan="1" rowspan="1" v-for="(tds, index) in item" :key="index">
                            <div class="fcw-table-cell"> {{ tds }} </div> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    export default{
        name:'fcw-table',
        props:{
            columns:Array,
            data:Array
        },
        data(){
            return{
                
            }
        },
    }
</script>

<style lang="less" scoped>
    .fcw-table{
        width: 100%;
        .fcw-table__header-wrapper{
            width: 100%;
        }
    }
    .fcw-table{
        table{
            table-layout:fixed;
            width: 100%;
            thead{ color: #909399; font-weight: 500; font-size: 14px;}
            tbody{font-size: 14px; color: #606266;}

            tr{
                th{
                    padding: 12px 0;
                    min-width: 0;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    position: relative;
                    text-align: left;
                    border-bottom: 1px solid #ebeef5;
                }
                td{
                    padding: 12px 0;
                    min-width: 0;
                    box-sizing: border-box;
                    text-overflow: ellipsis;
                    vertical-align: middle;
                    position: relative;
                    text-align: left;
                }
                .fcw-table-cell{
                    box-sizing: border-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 23px;
                    padding-left: 10px;
                    padding-right: 10px;
                    
                }
            }
        }
    }   
</style>