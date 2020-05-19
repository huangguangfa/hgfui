/**
* 统一导出文件
*/
//导入字体iconfont
import '../style/index.css';

// 导入Vue组件
import fcwcopycom from './fcw-copy/src/main.vue';
import fcwimageViewer from './fcw-imageViewer/src/main.vue';
import fcwqrcode from './fcw-qrcode/src/main.vue';
import fcwcircleview from './fcw-circleview/src/main.vue'

// 导入指令
import copy from '../directives/vcopy';

// 存储组件列表
const components = {
    fcwcopycom ,     //复制
    fcwimageViewer, //图片查看器
    fcwqrcode, //二维码生成器
    fcwcircleview, //原型进度条
}

// 存储指令列表
const directives = {
    copy  //v-copy
};

// 定义install方法
const install = function (Vue) {

    // 遍历注册所有的组件
    Object.keys(components).map( key => {
        Vue.component( components[key].name, components[key] );
    })

    // 遍历所有的指令
    Object.keys(directives).map( key => {
        Vue.directive( key, directives[key] );
    })

}

// 引入
if( typeof window !== 'undefined' && window.Vue ){
    install( window.Vue )
};

//导出整体
export default {
    install,
    // 组件列表
    ...components,
    // 指令列表
    ...directives
}
