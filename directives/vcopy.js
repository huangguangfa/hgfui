const vCopy = { 
    bind(el, { value }) { 
        el.$value = value; 
        el.handler = (e) => {
            //阻止冒泡
            e.stopPropagation();
            //创建提示元素
            let addelement = (text,color) =>{
                //获取鼠标位置
                let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                let x = e.pageX || e.clientX + scrollX;
                let y = e.pageY || e.clientY + scrollY;
                const $mes  = document.createElement('span');
                $mes.setAttribute('class','Copyspan');
                $mes.style = `position:fixed;left:${ x+6 }px;top:${ y - 14}px;z-index:9999;font-size:12px; color:#343435; animation: Copyspan 800ms ease-in-out;`;
                $mes.innerText = text;
                $mes.style.color = color;
                document.body.appendChild($mes);
                //移除
                setTimeout(()=>{
                    document.body.removeChild($mes);
                }, 500);
            }
            if (!el.$value) {
                addelement('复制成功','#f56c6c')
                return;
            }
            //创建copy元素
            const $textarea = document.createElement('textarea');
            $textarea.readOnly = 'readonly';
            $textarea.style.position = 'absolute';
            $textarea.style.left = '-9999px';
            $textarea.value = el.$value;
            document.body.appendChild($textarea);
            $textarea.select();
            const result = document.execCommand('Copy');
            if (result) {
                addelement('复制成功','#67c23a')
            }
            document.body.removeChild($textarea);
        };
        el.addEventListener('click', el.handler);
    },
    componentUpdated(el, { value }) {
      el.$value = value;
    },
    //移除事件
    unbind(el) {
      el.removeEventListener('click', el.handler);
    },
    
};
  
export default vCopy;
