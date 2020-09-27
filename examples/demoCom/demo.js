import Test from '../test.vue';
import demoOne from './demo1.vue'
import demoTwo from './demo2.vue'

export default{
    mixins:[Test],
    components:{
        demoOne,
        demoTwo
    },
    props:{
        name:String,
        value:Object
    },
    created(){
        console.log(this.value)
    }

}