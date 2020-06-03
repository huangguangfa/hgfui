
> 日历控件（ 简易版 ）

``` javascript
//使用
<fcw-calendar 
  @change="change" 
  v-model="day">
</fcw-calendar>
```

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>currentDate</font> | 指定日期 | <font color=red>string</font> | <font color=#669900>暂无</font> | <font color=#669900>当前日期</font>
<font color=#0077AA>isMuChoice</font> | 是否多选 | <font color=red> boolean</font> |  <font color=#669900>true、false</font>  | <font color=#669900>false</font>
<font color=#0077AA>disableList</font> | 禁用列表 | <font color=red>Array</font> | <font color=#669900>暂无</font> | <font color=#669900>[]</font>
<font color=#0077AA>v-model</font> | 回显和选中日期 | <font color=red>Array</font> | <font color=#669900>暂无</font> | <font color=#669900>[]</font>

> <font color=#CD6600>1、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>change</font> | <font  size=2> 点击日期的方法、获取点击的日期 </font>