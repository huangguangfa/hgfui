> 全局消息提醒

``` javascript
this.$message({
    type:'success',
    message:'操作成功！',
    showClose:true,
    onClose:(ev) =>{
        console.log(ev)
    }
})
```

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>type</font> | 消息类型 | <font color=red>string</font> | <font color=#669900>info / success / warning / error </font> | <font color=#669900> info </font>
<font color=#0077AA>message</font> | 消息内容 | <font color=red>string</font> |  <font color=#669900>暂无</font>  | <font color=#669900>这是一个消息提示</font>
<font color=#0077AA>showClose</font> | 显示关闭按钮 | <font color=red>Boolean</font> |  <font color=#669900>true / false</font>  | <font color=#669900>false</font>
<font color=#0077AA>onClose</font> | 关闭按钮回调 | <font color=red>function</font> |  <font color=#669900>null</font>  | <font color=#669900>null</font>


