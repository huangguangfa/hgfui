<template>
    <div class="timeSelectBox">
        <!-- 单个时间模式 -->
        <timeSelect v-if="type === 'time'" @submitTime="submitTime" :format="format" :timeValue="time"></timeSelect>
        <!-- 时间范围 -->
        <div class="timerange-dropdown" v-else>
            <div class="start-timerange">
                <p class="fcw-time-picker-header">开始时间</p>
                <timeSelect @submitTime="handleTimerange($event,'startTime')" :format="format" :isConstraint="isConstraint" :timeValue="startTime"></timeSelect>
            </div>
            <div class="end-timerange">
                <p class="fcw-time-picker-header">结束时间</p>
                <timeSelect @submitTime="handleTimerange($event,'endTime')" :format="format" :isConstraint="isConstraint" :timeValue="endTime"></timeSelect>
            </div>
        </div>
    </div>
</template>
<script>
    import timeSelect from './timeSelect.vue';
    export default{
        props:{
            value:[String,Array],
            format:String,
            type:String,
            isConstraint:Boolean,
        },
        components:{
            timeSelect
        },
        data(){
            return {
                startTime:null,
                endTime:null,
                time:null,
            }
        },
        created(){
           this.value && this.setTimeValue();
        },
        watch:{
            value(){
                this.setTimeValue();
            }
        },
        methods:{
            //范围时间Click
            handleTimerange(time,type){
                if(type === 'startTime'){
                    this.startTime = time;
                }else{
                    this.endTime = time;
                }
                let spliceTime = [];
                this.startTime && spliceTime.push(this.startTime);
                this.endTime && spliceTime.push(this.endTime);
                this.submitTime(spliceTime);
                this.timeConstraint(time,type);

            },
            //通知
            submitTime(time){
                this.$emit('timeSelectClick',time);
            },
            //根据不同type设置绑定值
            setTimeValue(){
                if(this.type === 'time' && typeof(this.value) === 'string'){
                    this.time = this.value
                }else if(this.type === 'timerange' && this.value instanceof Array){
                    let [ startTime,endTime ] = this.value;
                    this.startTime = startTime || '';
                    this.endTime = endTime || '';
                }
            },
            //拆出动态的时-分-秒
            getFormatName(value){
                let val = value.split('').filter( item =>{
                    if(item !== "H" && item !== "m" && item !== "s"){ return item }
                })
                return val;
            },
            //时间约束
            timeConstraint(time,type){
                let [ startH,startM,startS ] =  this.startTime.match(/\d+/g).map( item => { return Number(item) });
                let [ endH,endM,endS ] = this.endTime.match(/\d+/g).map( item => { return Number(item) });
                let pType = this.getFormatName(this.format);
                let startData = [ startH,startM,startS ];
                let endData = [ endH,endM,endS ];
                let flag = false;
                if(type === 'startTime'){
                    if(endH < startH ){
                        flag = true;
                        endData[0] = startH;
                    }
                    if(endH < startH || endH === startH && endM < startM ){
                        flag = true;
                        endData[1] = startM;
                    }
                    if(endH < startH || endH === startH && endM < startM || endM === startM && endS < startS){
                        flag = true;
                        endData[2] = startS;
                    }
                }
                if(type === 'endTime'){
                    if(endH < startH ){
                        flag = true;
                        endData[0] = startH;
                    }
                    if(endH < startH || endH === startH && endM < startM ){
                        flag = true;
                        endData[1] = startM;
                    }
                    if(endH < startH || endH === startH && endM < startM || endM === startM && endS < startS){
                        flag = true;
                        endData[2] = startS;
                    }
                }
                //只有变动了才去改变
                if(flag){
                    let hour = endData[0] + (pType[0] || '');
                    let minute = endData[1] + (pType[1] || '');
                    let second = endData[2] + (pType[2] || '');
                    //这里我很难受、又走了一遍遍历、有时间我要优化一下
                    this.$nextTick( () =>{
                        this.endTime = `${hour}${minute}${second}`;
                    })
                }

            }
        }
    }
</script>
<style lang="less" scoped>
    .timeSelectBox{
        position: absolute;top: 45px;background: #fff;right: 0;
        box-shadow: 0 1px 6px rgba(0,0,0,.2); border-radius: 5px;z-index:99999999999999999;
        .timerange-dropdown{
            display: flex;
            .start-timerange{width: 50%;}
            .end-timerange{width: 50%;border-left: 1px solid #e3e8ee;}
            .fcw-time-picker-header{
                height: 32px;
                line-height: 32px;
                text-align: center;
                border-bottom: 1px solid #e3e8ee;
                font-size: 12px;color: #657180;
            }
        }
    }
</style>