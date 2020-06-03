import fcwtag from './src/main.vue';
fcwtag.install = function(Vue){
    Vue.component(fcwtag.name,fcwtag)
}

export default fcwtag;