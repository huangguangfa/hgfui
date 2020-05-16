/**
 * 统一导出文件
 */

//导入字体iconfont
import '../style/index.css';

// 导入Vue组件
import Copycom from './vCopy/index.vue';

// 导入指令
import copy from '../directives/vcopy';

// 存储组件列表
const components = [
    Copycom  //复制
];

// 存储指令列表
const directives = {
    copy  //v-copy
};

// 定义install方法
const install = function (Vue) {
    // 遍历注册所有的组件
    components.map( com => {
        Vue.component( com.name, com );
    })

    // 遍历所有的指令
    Object.keys(directives).map( key => {
        console.log(directives[key]);
        Vue.directive( key, directives[key] );
    })
}

// 引入
if( typeof window !== 'undefined' && window.Vue ){
    install( window.Vue )
};

export default {
    install,
    // 组件列表
    ...components,
    // 指令列表
    ...directives
}