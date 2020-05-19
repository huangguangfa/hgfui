import GfImageViewer from './src/main.vue';

GfImageViewer.install = function(Vue){
    Vue.component(GfImageViewer.name,GfImageViewer)
}

export default GfImageViewer;