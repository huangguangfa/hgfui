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
    render(h) {
        return h('div', '测试数据');
    }
}
