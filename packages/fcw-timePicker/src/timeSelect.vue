<template>
    <div class="fcw-time-select">
        <timeValue 
            v-for="item in timeList" 
            :valueNumber="item.sum"
            :key="item.type"
            v-model="item.value"
            @timeSelect="timeSelect">
        </timeValue>
        {{ hoursList }}
    </div>
</template>

<script>
    import timeValue from './timeValue.vue';
    export default{
        components:{
            timeValue
        },
        props:{
            format:String,
            timeValue:[String,Array]
        },
        data(){
            return{
                timeList:[
                    {
                        sum:24,
                        type:'hour',
                        value:null
                    },
                    {
                        sum:60,
                        type:'minute',
                        value:null
                    },
                    {
                        sum:60,
                        type:'second',
                        value:null
                    }
                ],
                currentTime:null
            }
        },
        watch:{
            timeValue(){
                this.currentTime !== this.timeValue && this.getFormatTime(this.timeValue);
            }
        },
        created(){
            //时间处理
            this.timeValue && this.getFormatTime(this.timeValue);
        },
        // computed:{
        //     timeList(){
        //         let timeList = [];
        //         timeList.push( { sum:24, type:'hour', value:null })
        //         timeList.push( { sum:60, type:'minute',value:null })
        //         this.format.includes('s') &&  timeList.push( { sum:60, type:'second',value:null })
        //         return timeList;
        //     }
        // },
        methods:{
            timeSelect(){
                let timeArrValue = this.timeList.map( item =>{
                    if(!item.value) item.value = 0;
                    return item.value || 0;
                })
                let time = this.handleTime(timeArrValue);
                this.submitTime(time);
            },
            submitTime(data){
                this.currentTime = data;
                this.$emit('submitTime',data);
            },
            //组装数据
            handleTime(time){
                //判断是否是双还是单、并获取动态name
                let {type,value} = this.checkFormat();
                //时分秒--->00时00分00秒
                let hourMinuteSecond = '';
                time.forEach( (item,index) =>{
                    hourMinuteSecond += this.formatFn(type,item) + ( value[index] || '' );
                })
                return hourMinuteSecond;
            },
            //验证是否真确格式
            checkFormat(){
                let status = this.format.length === 9 || this.format.length === 6 || this.format.length === 8 || this.format.length === 3 || this.format.length === 5;
                //最基本都没匹配成功
                if(!status){ 
                    return this.getCheckFormat('double','HH点mm分ss秒');
                }
                //双
                if(this.format[0] === this.format[1]){
                    return this.getCheckFormat();
                }else{
                //单
                    return this.getCheckFormat('single')
                }
            },
            //获取数据的形式
            getCheckFormat(type,format){
                return {
                    type:type || 'double',
                    value:this.getFormatName(format || this.format)
                }
            },
            //格式组装
            formatFn(type,value){   //double - single
                if(type === 'double' && value < 10) { return '0' + value;} else { return value; }
            },
            //拆出动态的时-分-秒 
            getFormatName(value){
                let val = value.split('').filter( item =>{
                    if(item !== "H" && item !== "m" && item !== "s"){ return item }
                })
                return val;
            },
            //拆出动态的时间
            getFormatTime(value){
                let hms = value.match(/\d+/g);
                hms && hms.find( (item,index) =>{
                    let value = Number(item);
                    //05 -> 5
                    if(this.timeList[index]){
                        this.timeList[index].value =  value;
                    }
                })
                //没有就清空
                if(!hms){
                    this.timeList.forEach( item =>{
                        item.value = null
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .fcw-time-select{
        display: flex; width: 240px;border-radius: 4px;
        div:nth-child(2){border-left: 1px solid #e3e8ee;}
        div:nth-child(3){border-left: 1px solid #e3e8ee;}
    }
</style>