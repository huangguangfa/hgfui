import qrcode from './src/main.vue'
qrcode.install = function(Vue){
    Vue.component(qrcode.name,qrcode)
}
export default qrcode