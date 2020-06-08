import fcwpage from './src/main.vue';
fcwpage.install = function(Vue){
    Vue.component(fcwpage.name,fcwpage)
}
export default fcwpage;