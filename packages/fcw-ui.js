/**
*   统一导出文件
*/
//导入字体iconfont
import '../style/index.css';

// 导入Vue组件
import fcwcopycom from './fcw-copy/src/main.vue';
import fcwimageViewer from './fcw-imageViewer/src/main.vue';
import fcwqrcode from './fcw-qrcode/src/main.vue';
import fcwcircleview from './fcw-circleview/src/main.vue';
import fcwupload from './fcw-upload/src/main.vue';
import fcwcalendar from './fcw-calendar/src/main.vue';
import fcwbutton from './fcw-button/src/main.vue';
import fcwselect from './fcw-select/src/main.vue';
import fcwinput from './fcw-input/src/main.vue';
import fcwtag from './fcw-tag/src/main.vue';
import fcwpage from './fcw-page/src/main.vue';
import fcwcrop from './fcw-crop/src/main.vue';
import fcwradiogroup from './fcw-radio/src/main.vue';
import fcwradio from './fcw-radio/src/radio.vue';
import fcwcheckboxgroup from './fcw-checkbox/src/main.vue';
import fcwcheckbox from './fcw-checkbox/src/checkbox.vue';

// 导入指令
import copy from '../directives/vcopy';
import clickoutside from '../directives/clickoutside';  //点击组件外的全局指令

//引入挂载原型方法
import fcwmessage from './fcw-message-box/index';
import fcwroast from './fcw-message/index';

//存储组件列表
const components = {
    fcwcopycom ,     //复制
    fcwimageViewer, //图片查看器
    fcwqrcode,      //二维码生成器
    fcwcircleview, //原型进度条
    fcwupload,     //上传
    fcwcalendar, //日历
    fcwbutton, //按钮
    fcwselect, //下拉选择
    fcwinput, //输入框
    fcwtag, //标签
    fcwpage, //分页
    fcwcrop, //裁剪组件
    fcwradiogroup,
    fcwradio, //单选
    fcwcheckboxgroup,
    fcwcheckbox, //多选
}

//定义原型方法组件
const vuePrototype = {
    fcwmessage, //消息对话提示框
    fcwroast, //消息提示
}

// 存储指令列表
const directives = {
    copy,  //v-copy
    clickoutside  //v-clickoutside
};

// 定义install方法
const install = function (Vue) {

    //注册原型方法组件
    Object.keys(vuePrototype).map( key => {
        Vue.use( vuePrototype[ key ] );
    })

    // 遍历注册所有的组件
    Object.keys(components).map( key => {
        Vue.component( components[ key ].name, components[key] );
    })

    // 遍历所有的指令
    Object.keys(directives).map( key => {
        Vue.directive( key, directives[ key ] );
    })

}

// 引入
if( typeof window !== 'undefined' && window.Vue ){
    install( window.Vue );
};

//导出整体
export default {
    install,
    // 组件列表
    ...components,
    // 指令列表
    ...directives
}
