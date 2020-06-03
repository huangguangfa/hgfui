import message from './src/min.vue';  // 引入组件


export default function install(Vue){
    let newInstance;
    const messageInstance = Vue.extend(message);  //创建构造函数

    const initInstance = () => {
        newInstance = new messageInstance();  // 实例化
        document.body.appendChild(newInstance.$mount().$el); //插入
    }
    Vue.prototype.$confirm = options => {    
        if (!newInstance) {
            initInstance();     //挂载
        }
        Object.assign(newInstance, options);    //合并数据
        return newInstance.show();
    }
}