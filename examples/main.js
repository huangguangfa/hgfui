import Vue from 'vue'
import App from './App.vue'
import router from './router'
import demoBlock from './common/demo-block.vue'

//模拟按需组件引入
// import { 
//   fcwmessage ,
//   // fcwcircleview

// }  from '../packages/index';
// Vue.use(fcwmessage);

Vue.component('demo-block', demoBlock)

//模拟整体加载
import fcwUi from '../packages/index';
Vue.use(fcwUi);

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
