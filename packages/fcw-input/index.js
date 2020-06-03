import fcwInput from './src/main.vue';
fcwInput.install = function(Vue){
    Vue.component( fcwInput.name, fcwInput)
}
export default fcwInput;