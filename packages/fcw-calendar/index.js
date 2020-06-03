import fcwcalendar from './src/main.vue';
fcwcalendar.install = function(Vue){
    Vue.component(fcwcalendar.name,fcwcalendar)
}
export default fcwcalendar;