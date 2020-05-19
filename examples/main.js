import Vue from 'vue'
import App from './App.vue'

//模拟单个组件引入
import { 
  fcwcopycom ,
  fcwcircleview

}  from '../packages/index';
Vue.use(fcwcircleview);

// import gfcopycom from '../packages/copy/index';
// console.log(gfcopycom)
// Vue.use(gfcopycom);

//模拟整体加载
// import fcwUi from '../packages/index';
// Vue.use(fcwUi);

new Vue({
  el: '#app',
  render: h => h(App)
})
