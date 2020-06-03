import Vue from 'vue'
import App from './App.vue'

//模拟按需组件引入
// import { 
//   fcwmessage ,
//   // fcwcircleview

// }  from '../packages/index';
// Vue.use(fcwmessage);



//模拟整体加载
import fcwUi from '../packages/index';
Vue.use(fcwUi);

new Vue({
  el: '#app',
  render: h => h(App)
})
