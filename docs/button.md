
> 按钮组件

``` javascript
//使用
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

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>type</font> | 按钮类型 | <font color=red>string</font> | <font color=#669900>info、success、primary、warning、danger  </font> | <font color=#669900> '' </font>
<font color=#0077AA>disabled</font> | 是否禁用 | <font color=red> boolean</font> |  <font color=#669900>true、false</font>  | <font color=#669900>false</font>
<font color=#0077AA>size</font> | 按钮大小 | <font color=red>String</font> | <font color=#669900>mini超小 small小型 medium中等</font> | <font color=#669900>''</font>
<font color=#0077AA>loading</font> | loading | <font color=red>Boolean</font> | <font color=#669900>暂无</font> | <font color=#669900>false</font>
<font color=#0077AA>icon</font> | 按钮图标 | <font color=red>String</font> | <font color=#669900>暂无</font> | <font color=#669900>''</font>