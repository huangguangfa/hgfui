import fcwradio from './src/radio.vue';
fcwradio.install = function(Vue){
    Vue.component(fcwradio.name,fcwradio)
}
export default fcwradio;