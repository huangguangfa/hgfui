<template>
    <div class="circleview">
        <div class="progress">
            <div v-for="item in 4" :key="item" class="block" :class="`block${item}`" :style="`background-color:${color};`">
                <div
                    v-if="percentage < 25 * item"
                    class="modal"
                    :class="`modal${item}`"
                    :style="{transform: getProgress(item)}">
                </div>
            </div>
        </div>
        <div class="circle-content">
            <div class="content-c-bg1">
                <div class="content-c-bg2">{{percentage}}{{unit}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "fcw-circleview",
    props:{
        //进度值
        percentage: {
            default: 0
        },
        //进度条颜色
        color:{
            type:String,
            default:'#64d3f6'
        },
        //显示单位
        unit:{
            type:String,
            default:'%'
        }
    },
    methods: {
        getProgress(index) {
            const { percentage } = this;
            if(percentage > 100){return false}
            if (index === 1){
                return `rotate(${(percentage / 25) * 90}deg)`;
            }
            if (index === 2){
                if (percentage > 25 && percentage < 50) {
                    return `rotate(${((percentage - 25) / 25) * 90}deg)`;
                }
            }
            if (index === 3){
                if (percentage > 50 && percentage < 75) {
                    return `rotate(${((percentage - 50) / 25) * 90}deg)`;
                }
            }
            if (index === 4) {
                if (percentage > 75) {
                    return `rotate(${((percentage - 75) / 25) * 90}deg)`;
                }
            }
        }
  }
};
</script>

<style scoped lang="less">
.circleview {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    overflow: hidden;
  .progress,
  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .progress {
    .block {
      position: absolute;
      width: 50%;
      height: 50%;
      overflow: hidden;
      &1 {
        left: 50%;
        top: 0;
      }
      &2 {
        left: 50%;
        top: 50%;
      }
      &3 {
        left: 0;
        top: 50%;
      }
      &4 {
        left: 0;
        top: 0;
      }
      .modal {
            transition: all 0.5s;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #ebeef5;
            overflow: hidden;
            &1 {
                transform-origin: 0 100%;
            }
            &2 {
                transform-origin: 0 0;
            }
            &3 {
                transform-origin: 100% 0;
            }
            &4 {
                transform-origin: 100% 100%;
            }
        }
    }
  }
  .circle-content{
       width: 100%; height: 100%;
      .content-c-bg1, .content-c-bg2 {
          position: absolute;
          left: 5%;
          top: 5%;
          width: calc(100% - 10%);
          height: calc(100% - 10%);
          background-color: #fff;
          border-radius: 100%;
      }
      .content-c-bg2 {
          background-color: #fff; font-size: 16px;
          text-align: center; display: flex; justify-content: center; align-items: center;
      }
  }
}
</style>