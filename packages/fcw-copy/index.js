import gfcopycom from './src/main.vue';
import copy  from '../../directives/vcopy';
gfcopycom.install = function(Vue){
    Vue.component(gfcopycom.name,gfcopycom)
    Vue.directive( 'copy', copy );
}

export default gfcopycom;