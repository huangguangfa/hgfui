<template>
    <transition name="msgbox-fade">
        <div class="mes-box-wrap" v-show="showFlag" @click="hide">
            <div class="mes-box" @click.stop>
                <div class="mes-box-head">
                    <div class="title">提示</div>
                    <div @click="hide" class="clear iconfont gf-cuo"></div>
                </div>
                <div class="mes-box-content">
                    <i class="iconfont" :class="icon"></i>
                    <p>{{ content }}</p>
                </div>
                <div class="mes-box-action">
                    <fcw-Button size="mini" class="mar-r10" @click="hide">取 消</fcw-Button>
                    <fcw-Button size="mini" type="primary" @click="confirm">确 定</fcw-Button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import fcwButton from '../../fcw-button/src/main';
export default {
    name:'fcw-message',
    components:{
        fcwButton
    },
    data() {
        return {
            showFlag: false,
            icon:'gf-shanchu',
            content:'是否要删除'
        };
    },
    methods: {
        show(cb){
            this.showFlag = true;
            // typeof cb === "function" && cb.call(this, this);
            return new Promise((resolve, reject) => {
                this.reject = reject;
                this.resolve = resolve;
            });
        },
        cancel() {
            this.reject("cancel");
            this.hide();
        },
        confirm() {
            this.resolve("confirm");
            this.hide();
        },
        hide() {
            this.showFlag = false;
            this.reject("cancel");
            // document.body.removeChild(this.$el);
            // this.$destroy(); //消除实列
        }
     }
};
</script>

<style scoped lang="less">
.mes-box-wrap{
    z-index: 2001;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    .mes-box{
        width: 420px;
        padding: 15px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 5px;
        box-sizing: border-box;
        .mes-box-head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #303133;
            .clear{
                font-size: 18px;
                cursor: pointer;
                color: #ccc;
            }
            .gf-cuo{font-size: 20px;}
            .title{
                display: flex;
                align-items: center;
                color: #303133;
                font-size: 15px;
            }
            .title::before{
                font-size: 22px;
                margin-right: 5px;
                color: #F78989;
            }
        }
        .mes-box-content{
            margin-top: 15px;
            line-height: 24px;
            color: #606266;
            font-size: 14px;
            padding-left: 10px;
            display: flex;
            > i{
                font-size: 22px;
                margin-right: 10px;
                color: #F78989;
            }
        }
        .mes-box-action{
            margin-top: 15px;
            display: flex;
            justify-content: flex-end;
        }
    }
}

.msgbox-fade-enter-active {
    animation: msgbox-fade-in .3s;
}

.msgbox-fade-leave-active {
    animation: msgbox-fade-out .3s;
}

@keyframes msgbox-fade-in {
0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
}
100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
}
@keyframes msgbox-fade-out {
0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
}
}
.mar-r10{margin-right: 5px !important;}
</style>
