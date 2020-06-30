### 基础用法
使用```success``` ```info```和 ```warning``` ```error ``` 类型来修改标签样式

<div class="demo-block">
  <fcw-button type="success" size="mini" @click="messageFn('success')">成功按钮</fcw-button>
  <fcw-button type="primary" size="mini" @click="messageFn('info')">成功按钮</fcw-button>
  <fcw-button type="warning" size="mini" @click="messageFn('warning')">成功按钮</fcw-button>
  <fcw-button type="danger" size="mini" @click="messageFn('error')">成功按钮</fcw-button>
  <script>
    export default {
      methods:{
          messageFn(type){
              this.$message({
                type:type,
                message:'操作成功！',
                showClose:true,
                onClose:(ev) =>{
                    console.log(ev)
                }
            })
          }
      }
    }
    </script>
</div>

::: demo

```html


<fcw-button type="success" size="mini" @click="messageFn('success')">成功按钮</fcw-button>
<fcw-button type="primary" size="mini" @click="messageFn('info')">成功按钮</fcw-button>
<fcw-button type="warning" size="mini" @click="messageFn('warning')">成功按钮</fcw-button>
<fcw-button type="danger" size="mini" @click="messageFn('error')">成功按钮</fcw-button>
<script>
export default {
methods:{
    messageFn(type){
        this.$message({
        type:type,
        message:'操作成功！',
        showClose:true,
        onClose:(ev) =>{
            console.log(ev)
        }
    })
    }
}
}
</script>

```
:::

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>type</font> | 消息类型 | <font color=red>string</font> | <font color=#669900> ```info```  ```success```  ```warning```  ```error``` </font> |  ``` info ```
<font color=#0077AA>message</font> | 消息内容 | <font color=red>string</font> |  <font color=#669900>暂无</font>  | <font color=#669900>这是一个消息提示</font>
<font color=#0077AA>showClose</font> | 显示关闭按钮 | <font color=red>Boolean</font> | ``` true ``` ``` false``` | <font color=#669900>false</font>
<font color=#0077AA>onClose</font> | 关闭按钮回调 | <font color=red>function</font> |  <font color=#669900>null</font>  | <font color=#669900>null</font>


