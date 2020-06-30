<template>
    <transition name="fcw-message-fade" @after-leave="handleAfterLeave">
        <div v-if="visible" class="fcw-message"
            :class="[ `message-gf-${type}` ]">
            <i class="iconfont" :class="[ `gf-${type}` ]"></i>
            <span class="fcw-message-content" :class="showClose === true?'pad30':''">{{ message }}</span>
            <span class="fcw-message-close iconfont gf-cuo" v-show="showClose" @click="close"></span>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
            message: null,
            type:null,
            showClose:false,
            onClose:null,
        }
    },
    methods:{
        handleAfterLeave(){
            this.$destroy(true);
            this.$el.parentNode.removeChild( this.$el );
        },
        keydown(e) {
            if (e.keyCode === 27) { // esc关闭消息
                if (!this.closed) {
                    this.visible = false;
                }
            }
        },
        close(){
            if (typeof this.onClose === 'function') {
                this.onClose(this);
            }
            this.visible = false;
        }
    },
    mounted() {
        document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keydown);
    }
}
</script>

<style scoped lang="less">
.fcw-message {
    min-width: 200px;
    color: #fff;
    text-align: center;
    position: fixed;
    z-index: 99999;
    pointer-events: all;
    padding: 15px 15px;
    cursor: pointer;
    border-radius: 4px;
    left: 50%;
    margin-left: -100px;
    top: 20px;
    display: flex; align-items: center;
    border: 1px solid #2d8cf0;
    .fcw-message-content{color: #515a6e; font-size: 12px; margin-left: 5px; width: 100%; text-align: left;}
    .gf-cuo{ color: #c0c4cc; position: relative; left: 5px; cursor: pointer; font-size: 15px;}
    .pad30{ padding-right: 30px;}
}
.message-gf-info{
    color:#2d8cf0;
    background-color: #effaff;
    border-color: rgba(45,140,240,0.2);
    .fcw-message-content{color: #2d8cf0;}
}
.message-gf-success{
    color:#67c23a;
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    .fcw-message-content{color: #67c23a;}
}
.message-gf-warning{
    color:#e6a23c;
    background-color: #fdf6ec;
    border-color: #faecd8;
    .fcw-message-content{color: #e6a23c;}
}
.message-gf-error{
    color:#f56c6c;
    background-color: #fef0f0;
    border-color: #fde2e2;
    .fcw-message-content{color: #f56c6c;}
}

.fcw-message-fade-enter-active {
  transition: all .3s ease;
}
.fcw-message-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fcw-message-fade-enter, .fcw-message-fade-leave-to{
  transform: translateY(-20px);
  opacity: 0;
}

</style>