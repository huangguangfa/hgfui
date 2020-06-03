<template>
    <div class="calendar-main">
        <div class="choose_year">
            <div class="iconfont gf-zuozuo-" @click="chooseYears(-1)"></div>
            <div class="iconfont gf-Left" @click="chooseMonth(-1)"></div>
            <div class="date">{{year}}年{{month.toString().padStart(2, '0')}}月</div>
            <div class="iconfont gf-right" @click="chooseMonth(1)"></div>
            <div class="iconfont gf-youyou-" @click="chooseYears(1)"></div>
        </div>
        
        <div class="days_area">
            <div class="days_area_title">
                <div class="day week" v-for=" week in weeks " :key="week">{{week}}</div>
            </div>
            <div class="days_area_content">
                <div class="day day-list" v-for="(dayItem, index) in days" @click="dayItem.lastMonth || dayItem.status ?'':chooseDay(dayItem)"  :key="index" >
                   <div class="day-list_box" 
                        :class="{ 'choose_day':dayItem.choose,'lastMonth':dayItem.lastMonth,'already_schedule':dayItem.status === true }">
                        <p>{{ dayItem.day.slice(0,1) === '0'?dayItem.day.slice(1):dayItem.day }}</p>
                        <span :class="{'Holiday':dayItem.Holiday === true}">{{ dayItem.lunar }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { sloarToLunar, getYearMonthDay } from "./calendar.js";
    import { HolidayFind } from '../../../utils/validate';
    export default {
        name: 'fcw-calendar',
        props:{
            //指定日期
            currentDate:{
                type:String
            },
            //是否多选
            isMuChoice:{
                type:Boolean,
                default:false
            },
            //禁用列表
            disableList:{
                type:Array,
                default:() =>{
                    return []
                }
            },
            //回显和选中的日期
            value:{
                type:Array,
                default:() =>{
                    return []
                }
            }
        },
        data(){
            return {
                year: 0, 
                month: 0,
                today: 0,
                days: [],
                weeks: ['一', '二', '三', '四', '五', '六','日'],
                todayDate:0,
                lastMonth:[], //上个月数据
                HolidayFind:null,
                current:{
                    year:null,  
                    month:null, 
                    today:null, 
                },
                SelectedData:{
                    Selected:[] , //选中的区间日期
                },
                radioIndex:0,
            }
        },
        mounted () {
            this.HolidayFind = new HolidayFind();
            this.todayDate = new Date().getDate();
            if(this.currentDate){
                const now = new Date(this.currentDate);
                this.year = now.getFullYear();
                this.month = now.getMonth() + 1;
                this.today = now.getDate();
            }else{
                const now = new Date();
                this.year = now.getFullYear();
                this.month = now.getMonth() + 1;
                this.today = now.getDate();
            }
            this.current.year = this.year;
            this.current.month = this.month;
            this.current.today = this.today;
            this.getDays();
        },
        methods: {
            //上个月数据
            lastMonthFun(){
                let lastMonth = [];
                let numbers = this.getWeek();
                const time = new Date();
                time.setFullYear(this.year, this.month -1, 0);
                for (let i = 1; i <= time.getDate(); i++) {
                    lastMonth.push({
                        day:i.toString().length === 1?`0${i}`:i.toString(), 
                        lunar: getYearMonthDay(this.year, this.month -1, i),
                        id:`${this.year}-${ this.month.toString().length === 1?`0${this.month}`:this.month }-${i.toString().length === 1?`0${i}`:i.toString() }`,
                        month:this.month.toString().length === 1?`0${this.month}`:this.month,
                        year:this.year,
                        lastMonth:true,
                        choose:false
                    })
                }
                if(numbers){
                    this.lastMonth = lastMonth.slice( - numbers );
                }else{
                    this.lastMonth = [];
                }
            },
            //获取1号属于星期几
            getWeek(){
                const time = new Date();
                time.setFullYear(this.year, this.month, 0);
                time.setDate(1);
                return time.getDay() === 0?6: time.getDay() -1;
            },
            //获取当前月份所有公历日期及其农历日期和节假日
            getDays () {
                this.lastMonthFun();    //获取上个月数据
                let monthData = [];
                const time = new Date();
                time.setFullYear(this.year, this.month, 0);
                //计算不在一周的剔除到下个月
                //let monthDataSum = (time.getDate() + numbers)  - (parseInt((numbers + time.getDate()) /7) * 7);
                let Nowadays = new Date().getDate()     //今天日期
                let monthFrequency = time.getDate()     //这个月有几天
                for ( let i = 1; i <= monthFrequency; i++ ) {
                    //组装日
                    let Holiday = this.HolidayFind.getHoliday(this.month,i);
                    let status = false;     //是否被禁用
                    let id = `${this.year}-${ this.month.toString().length === 1?`0${this.month}`:this.month }-${i.toString().length === 1?`0${i}`:i}`
                    let day = i.toString().length === 1?`0${i}`:i.toString();
                    let month = this.month.toString().length === 1?`0${this.month}`:this.month;
                    let choose = false;                                 //勾选状态
                    if(Array.isArray(this.value) === true && this.value.includes(id)){
                        choose = true
                    }
                    monthData.push({
                        status:status,
                        month:month,
                        year:this.year,
                        day:day,
                        lunar:Holiday ? Holiday.name:getYearMonthDay(this.year, this.month,i),
                        Holiday:Holiday ? true : false,         //是否活动日期
                        id:id,
                        choose:choose,
                    })
                }
                if(this.getWeek()){
                    this.days = [
                        ...this.lastMonth, //上个月数据
                        ...monthData       //这个月数据
                    ]
                }else{
                    this.days = monthData;  //一号是星期一就不用在添加上月数据了
                }
            },
            // 改变年份
            chooseYears (state) {
                this.year += state;
                if( new Date().getFullYear() === this.year && ( new Date().getMonth()+1) === this.month ){
                    this.today = this.todayDate;
                }else{
                    this.today = 0;
                }
                this.getDays();
            },
            // 改变月份
            chooseMonth (state) {
                this.month += state;
                if( new Date().getFullYear() === this.year && ( new Date().getMonth() + 1) === this.month ){
                    this.today = this.todayDate;
                }else{
                    this.today = 0;
                }
                if (this.month < 1) {
                    this.month = 12;
                    this.chooseYears(-1)
                } else if (this.month > 12) {
                    this.month = 1;
                    this.chooseYears(1) 
                } else {
                    this.getDays()
                }
                this.$emit('getDay',{
                    month:this.month,
                    year:this.year
                });
            },
            //点击选择
            chooseDay(item){
                //多选
                this.isMuChoice === true && this.multipleChoice(item);
                //单选
                this.isMuChoice === false && this.radioClick(item);
            },
            dateChange(days){
                //v-model
                this.$emit('input', days) 
                //改变
                this.$emit('change',days);
            },
            //多选事件
            multipleChoice(item){
                item.choose = !item.choose;
                if(item.choose){
                    this.SelectedData.Selected.push(item);
                }else{
                    let newSelected = this.SelectedData.Selected.filter( items => { 
                        if(items.id != item.id){ return items }
                    })
                    this.SelectedData.Selected = newSelected;
                }
                if(this.SelectedData.Selected.length === 0){
                    this.dateChange([])
                    return false
                }
                // 排序
                if(this.SelectedData.Selected.length){
                    this.SelectedData.Selected.sort(function(beforeitem,rearitem){
                        //判断年
                        if(beforeitem.year > rearitem.year){
                            return beforeitem.year - rearitem.year;
                        }
                        //判断月
                        if(beforeitem.month > rearitem.month){
                            return beforeitem.month - rearitem.month;
                        }
                        //判断日
                        if(beforeitem.day < rearitem.day){
                            return beforeitem.day - rearitem.day;
                        }
                    })
                }
                this.dateChange(this.SelectedData.Selected);
            },
            //单选
            radioClick(dayo){
                let status = !dayo.choose;
                this.days.forEach( item =>{
                    item.choose = false;
                    if(item.id === dayo.id){
                        item.choose = status;
                        if(status === true){
                            this.dateChange([item]);
                        }else{
                            this.dateChange([]);
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .calendar-main{
        -moz-user-select:none; /* Firefox私有属性 */
        -webkit-user-select:none; /* WebKit内核私有属性 */
        -ms-user-select:none; /* IE私有属性(IE10及以后) */
        -khtml-user-select:none; /* KHTML内核私有属性 */
        -o-user-select:none; /* Opera私有属性 */
        user-select:none; /* CSS3属性 */
        width:438px;
        /*height: 479px;*/
        background-color: #fff;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);*/
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        .choose_year{
            display: flex; justify-content: center; align-items: center;
            height: 52px; background: #1ca75f ; color:#fff; font-size: 14px; padding: 0 10px; box-sizing: border-box;
            .iconfont{
                width: 30px;
                height: 30px;
                text-align: center;
                font-size: 13px;
                cursor: pointer;
                display: flex; justify-content: center; align-items: center;
                &:hover{
                    background: rgba(0,0,0,0.2);
                    border-radius: 50%;
                }
            }
            .date{
                // width: 60%;
                width:319px;
                text-align: center;
                height: 35px;
                line-height: 35px;
                font-size: 14px;
            }
        }
        .lunar-detail-date{
            margin-top: 5px;
            line-height: 15px;
            text-align: center;
            color: #FF6800;
        }
        .days_area{
            padding: 0 10px;padding-bottom: 13px; padding-right:5px;
            border:1px solid #F7F7F7; box-sizing: border-box;
            border-top: none;
            .days_area_title{
                display: flex; 
            }
            .days_area_content{display: flex;flex-wrap: wrap; }
            .day{
                width:58px;
                height: 49px;
                line-height: 27px;
                text-align: center;
                cursor: pointer;
                display: flex; 
                align-items: center; 
                justify-content: center; flex-wrap: wrap;align-content:flex-start;
                p{
                    margin: 0;
                    font-size: 13px;
                    width: 100%;
                    display: inline-block;
                    line-height: 20px;
                    font-family: 'FONT_NUMBER';
                }
                span{
                    font-size: 13px;
                    line-height: 20px;
                }
            }
            .day-list{
                margin-top:1px;
                display: flex; justify-content: center; align-items: center;
                height: 59px;
                .day-list_box{
                    overflow: hidden;
                    width: 49px; height: 49px; display: flex; flex-wrap: wrap; justify-content: center;
                    padding:5px; box-sizing: border-box;color:#555555; position: relative; 
                    // &:hover{
                    //     color:#fff;
                    //     background-color:#f197a2;
                    //     -webkit-border-radius: 50%;
                    //     -moz-border-radius: 50%;
                    //     border-radius: 50%;
                    //     opacity: 0.6;
                    // }
                    .Holiday{
                        color: #57a7f6;
                        overflow: hidden;text-overflow:ellipsis;white-space: nowrap;
                    }
                }
                .already_schedule{color: #c5c2c2;}
                .already_schedule::after{
                    width: 0;
                    height: 0;
                    height: 0px;
                    border-color:   #4cbf83 transparent transparent #4cbf83;
                    border-width: 4px 4px 4px 4px;
                    border-style: solid;
                    content:''; 
                    position: absolute;
                    left:5px;
                    top:5px;
                }
                .lastMonth{
                    color:#c5c2c2;
                    .Holiday{
                        color: #c5c2c2;
                    }
                }
                .lastMonth::after{
                    width: 0;
                    height: 0;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    border-bottom: 6px solid #c5c2c2;
                    transform:rotate(-49deg);
                    content:''; 
                    position: absolute;
                    left:5px;
                    top:5px;
                }
            }
            .week{
                background-color: #fff;
                color: #19233c;
                font-weight: bold;
                height: 49px;
                line-height: 49px;
                margin: 0;
                font-size: 14px;
                width: 58px;
                color:#1ca75f;
            }
            .choose_day{
                background-color: #f197a2;
                color: #fff;
                font-weight: bold;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                width:58px; height:58px;
                span{
                    color: #fff;
                }
                p{
                    color: #fff;
                }
                .Holiday{color: #fff !important;}
               
            }

        }
        .bottom-btn{
            text-align: right;
            span{
                padding: 4px 8px;
                margin-right: 5px;
                cursor: pointer;
                border: 1px solid #999;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                &:hover{
                    color: dodgerblue;
                    border: 1px solid dodgerblue;
                }
            }
        }
    }
</style>
