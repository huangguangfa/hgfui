import upload from './src/main.vue';
upload.install = function(Vue){
    Vue.component(upload.name,upload)
}
export default upload;