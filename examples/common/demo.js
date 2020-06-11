export default{
    name:'demo-test',
    props:{
        name:String,
        age:{}
    },
    data(){
        return{
            text:'测试文本'
        }
    }, 
    mounted(){
        console.log(this.age)
    },
    render(h) {
        return h('div', '测试数据');
    }
}
