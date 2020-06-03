import MessageComponent from './src/main.vue';

const message = {
    install: function (Vue) {
        const MessageConstructor = Vue.extend( MessageComponent );
        let instance;
        //绑定
        Vue.prototype.$message = (msg, duration = 1500) => {
            // // 创建
            instance = new MessageConstructor()
            // 挂载
            instance.$mount(document.createElement('div'));
            document.body.appendChild( instance.$el );
            if ( Vue.prototype.$isServer ) return;
            instance.message = msg.message || '这是一个提示消息框';
            instance.type = msg.type || 'info';
            instance.visible = true;
            instance.showClose = msg.showClose || false;
            instance.onClose = msg.onClose || null;
            setTimeout(() => {
                instance.visible = false;
            }, duration);
        }
    }
}
export default message;