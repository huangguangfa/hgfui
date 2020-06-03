> 对话框提醒

``` javascript
 //使用
 this.$confirm({
     icon:'gf-loading',
     content:'测试消息'
  }).then( confirm =>{
     console.log(confirm)
  }).catch( cancel =>{
     console.log(cancel)
  })

```

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA> icon </font> | 展示的图标字体 | <font color=red> string </font> | <font color=#669900> 暂无  </font> | <font color=#669900> gf-shanchu </font>
<font color=#0077AA>content</font> | 显示的内容信息 | <font color=red>  string </font> |  <font color=#669900>暂无</font>  | <font color=#669900> 是否要删除</font>
