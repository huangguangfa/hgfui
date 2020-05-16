import Vue from 'vue'
import App from './App.vue'

import publish from '../packages/index'
// console.log(publish)
Vue.use(publish)
new Vue({
  el: '#app',
  render: h => h(App)
})
