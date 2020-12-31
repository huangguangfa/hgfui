
export default { 
    bind(el, { value }) { 
        el.$value = value; 
        el.handler = (e) =>{

        }
        console.log(el)
        console.log(value)
    },
    componentUpdated(el, { value }) {
        console.log(value)
        el.$value = value;
    },
    //移除事件
    unbind(el) {
        
    },
};

