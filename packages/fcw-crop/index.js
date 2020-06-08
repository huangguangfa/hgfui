import fcwcrop from './src/main.vue';
fcwcrop.install = function(Vue){
    Vue.component(fcwcrop.name,fcwcrop)
}
export default fcwcrop;