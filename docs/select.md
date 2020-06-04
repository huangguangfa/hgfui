
> 选择器

``` javascript
//使用
`
<fcw-select v-model="selectText" :selectData="selectList" :options="{
    lable:'id',
    value:'name'
}">
</fcw-select>

`
```

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA> v-model </font> | 选中的label | <font color=red> 任意 </font> | <font color=#669900> 暂无  </font> | <font color=#669900> '' </font>
<font color=#0077AA>selectData</font> | 下拉的数据 | <font color=red>  Array </font> |  <font color=#669900>暂无</font>  | <font color=#669900>暂无</font>
<font color=#0077AA>options</font> | 下拉需要选择的值和展示的值 <font color="#FF83FA"> label:选中的key、value:展示的值 </font> | <font color=red>object</font> | <font color=#669900>暂无</font> | <font color=#669900> label、value</font>
<font color=#0077AA>disable</font> | 数据属性disable === true为 <font color="#FF83FA">禁用状态disable</font>| 
<font color=#0077AA>clearable</font> | 清空操作启用 | <font color="red">Boolean</font>|  <font color=#669900>false、true</font> | <font color=#669900>false</font>
<font color=#0077AA>size</font> | 组件大小 | <font color="red">string</font>|  <font color=#669900> medium、small、mini </font> | <font color=#669900>''</font>