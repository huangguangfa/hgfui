<template>
    <div class="timePicker" v-clickoutside="handleClose">
        <fcw-input v-model="inputValue" @focus="inputFocus" placeholder="选择时间" @clear="timeClear" :clearable="clearable" :disabled="disabled" @input="changInput"> 
            <i slot="append" class="iconfont gf-shijian00"></i>
        </fcw-input>
        <transition name="timefade">
            <timeSelectBox 
                :confirm="confirm" 
                v-show="timeSelect" 
                @timeSelectClick="timeSelectClick" 
                v-model="value" 
                :isConstraint="isConstraint" 
                :format="format" 
                :type="type"
                @on-pick-success-notice="onPickSuccessNotice"></timeSelectBox>
        </transition>
    </div>
</template>

<script>
    import fcwInput from '../../fcw-input';
    import timeSelectBox from './timeSelectBox';
    import emitter from '../../../utils/mixins/emitter.js';
    export default{
        props:{
            //绑定的value
            value:[String,Array],
            //时间格式
            format:{
                type:String,
                default:'HH点mm分ss秒'
            },
            //类型-支持单时间和时间范围
            type:{
                type:String,
                default:'time'
            },
            //清空显示
            clearable:{
                type:Boolean,
                default:true
            },
            //范围区分符(只支持范围选择器)
            distinguish:{
                type:String,
                default:'-'
            },
            //是否需要约束
            isConstraint:{
                type:Boolean,
                default:true
            },
            //是否禁用
            disabled:Boolean,
            //是否支持提交按钮
            confirm:Boolean
        },
        mixins:[ emitter ],
        name:"fcwTimePicker",
        components:{
            fcwInput,timeSelectBox
        },
        data(){
            return {
                inputValue:null,
                timeSelect:false,
                timeValue:null
            }
        },
        methods:{
            //获得焦点
            inputFocus(){
                this.timeSelect = true;
                this.$emit('focus');
                this.noticeTimeSelect();
            },
            //空白处
            handleClose(){
                this.timeSelect = false;
            },
            //输入
            changInput(val){
                // let time = this.type === 'time'?val:val.split('-');
                // this.updateTime(time);
            },
            //清空
            timeClear(){
                this.$emit('input',this.type === 'time'?'':[]);
                this.$emit('clear','');
                this.noticeTimeSelect();
            },
            //派发修改
            timeSelectClick(time){
                if(this.checkType(time) === 'time'){
                    this.inputValue = time;
                }
                if(this.checkType(time) === 'timerange'){
                    this.inputValue = time.join( " " + this.distinguish + " " );
                }
                this.updateTime(time)
            },
            //校验类型
            checkType(value){
                if(this.type === 'time' && typeof(value) === 'string'){
                    return 'time'
                }else if(this.type === 'timerange' && value instanceof Array){
                    return 'timerange'
                }
            },
            updateTime(time){
                this.$emit('input',time);
                this.$emit('change',time);
            },
            //通知
            noticeTimeSelect(){
                this.$nextTick( ()=>{
                    this.broadcast('timeValue','inputFocus',true)
                })
            },
            onPickSuccessNotice(){
                this.$emit('on-ok',this.value);
            }
        }
    }
</script>

<style lang="less" scoped>
    .timePicker{width: 240px; position: relative;}
    .timefade-enter-active, .timefade-leave-active {
        transition: opacity .3s;
    }
    .timefade-enter, .timefade-leave-to {
        opacity: 0;
    }
</style>