
> 多选组件
``` javascript
// 基础使用方式
<fcw-checkbox label="1" v-model="checkList" @change="radioChang">多选A</fcw-checkbox>
<fcw-checkbox label="2" v-model="checkList">多选B</fcw-checkbox>
<fcw-checkbox label="3" disabled>多选C</fcw-checkbox>

```

``` javascript
//多选框组 结合fcw-checkbox-group元素和子元素fcw-checkbox可以实现单选组
<fcw-checkbox-group v-model="checkList" @change="radioChang">
  <fcw-checkbox label="1" disabled>多选A</fcw-checkbox>
  <fcw-checkbox label="2">多选B</fcw-checkbox>
  <fcw-checkbox label="3" disabled>多选C</fcw-checkbox>
</fcw-checkbox-group>

```

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>checkList</font> | 选中后的数组值 | <font color=red>Array</font> | <font color=#669900>暂无</font> | <font color=#669900> 暂无 </font>
<font color=#0077AA>label</font> | 显示和点击选中值 | <font color=red> 任意 </font> |  <font color=#669900>暂无</font>  | <font color=#669900>暂无</font>

> <font color=#CD6600>3、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>change</font> | checkbox值改变时会触发 
