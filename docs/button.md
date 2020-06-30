

### 基础用法
使用```type``` ```plain```和 ```size``` 属性来定义 Button 的样式。

<div class="demo-block">
    <div class="code_flex">
        <fcw-button class="ml10" type="info" >信息按钮</fcw-button>
        <fcw-button class="ml10" type="success" size="small">成功按钮</fcw-button>
        <fcw-button class="ml10" type="primary" size="small">主要按钮</fcw-button>
        <fcw-button class="ml10" type="warning" size="medium">警告按钮</fcw-button>
        <fcw-button class="ml10" type="danger" >危险按钮</fcw-button>
        <fcw-button class="ml10">普通按钮</fcw-button>
        <fcw-button class="ml10" disabled type="warning">禁用按钮</fcw-button>
        <fcw-button class="ml10"  type="warning" size="small" :loading="true">加载中</fcw-button>
        <fcw-button class="ml10"  type="primary" size="small" icon="gf-tupian"> 照片 </fcw-button>
        <fcw-button class="ml10"  type="success" size="small" plain>朴素按钮</fcw-button>
        <fcw-button class="ml10"  type="warning" size="small" plain>朴素按钮</fcw-button>
        <fcw-button class="ml10"  type="info"   size="small" plain>朴素按钮</fcw-button>
        <fcw-button class="ml10"  type="primary" size="small" plain>朴素按钮</fcw-button>
        <fcw-button class="ml10"  type="danger" size="small" plain>朴素按钮</fcw-button>
    </div> 
    
</div>

::: demo

```html

<fcw-button type="info">信息按钮</fcw-button>
<fcw-button type="success" size="mini">成功按钮</fcw-button>
<fcw-button type="primary" size="small">主要按钮</fcw-button>
<fcw-button type="warning" size="medium">警告按钮</fcw-button>
<fcw-button type="danger" >危险按钮</fcw-button>
<fcw-button>普通按钮</fcw-button>
<fcw-button disabled type="warning">禁用按钮</fcw-button>
<fcw-button  type="warning" size="small" :loading="true">加载中</fcw-button>
<fcw-button  type="primary" size="small" icon="gf-tupian">照片</fcw-button>

```
:::


> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>type</font> | 按钮类型 | <font color=red>string</font> | ``` info ``` ``` success ``` ``` primary ``` ``` warning ``` ``` danger  ``` | ""
<font color=#0077AA>disabled</font> | 是否禁用 | <font color=red> boolean</font> |  ``` true ``` ``` false ```  | <font color=#669900>false</font>
<font color=#0077AA>size</font> | 按钮大小 | <font color=red>String</font> |  ``` mini ``` ``` small ``` ``` medium ```  | <font color=#669900>''</font>
<font color=#0077AA>loading</font> | loading | <font color=red>Boolean</font> | <font color=#669900>暂无</font> | <font color=#669900>false</font>
<font color=#0077AA>icon</font> | 按钮图标 | <font color=red>String</font> | <font color=#669900>暂无</font> | <font color=#669900>''</font>