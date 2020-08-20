import Vue from 'vue'
import App from './App.vue'
import router from './router'
import demoBlock from './common/demo-block.vue'
Vue.component('demo-block', demoBlock);


// console.log('进来了')
//模拟按需组件引入
// import { fcwroast }  from '../packages/index';
// console.log(fcwroast)
// Vue.use(fcwroast); 


console.log('%c ','background-image:url("https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/xy.jpg");background-size:120% 120%;background-repeat:no-repeat;background-position:center center;line-height:100px;padding:30px 120px;');


//模拟整体加载
import fcwUi from '../packages/index';

Vue.use(fcwUi);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})