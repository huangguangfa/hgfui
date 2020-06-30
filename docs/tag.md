### 基础用法

使用```success``` ```info```和 ```warning``` ```error ``` 类型来修改标签样式

<div class="demo-block">
    <div class="code_flex">
        <fcw-tag>标签二</fcw-tag>
        <fcw-tag class="ml10" type="success">标签一</fcw-tag>
        <fcw-tag class="ml10" type="info">标签三</fcw-tag>
        <fcw-tag class="ml10" type="warning">标签四</fcw-tag>
        <fcw-tag class="ml10" type="error">标签五</fcw-tag>
    </div>
    
</div>

::: demo

```html

<fcw-tag>标签二</fcw-tag>
<fcw-tag type="success">标签一</fcw-tag>
<fcw-tag type="info">标签三</fcw-tag>
<fcw-tag type="warning">标签四</fcw-tag>
<fcw-tag type="error">标签五</fcw-tag>

```
:::


> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>type</font> | 标签类型 | <font color=red>string</font> | ```info``` ```success``` ```warning```  ```error```  | <font color=#669900> '' </font>
