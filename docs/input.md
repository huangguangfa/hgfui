> 输入框

``` javascript
//基础用法 --- 输入框
<fcw-input v-model="value" placeholder="请输入内容"  @input="inputChange" ></fcw-input>

//基础用法 --- 文本输入框
<fcw-input v-model="value" type="textarea" placeholder="请输入内容" ></fcw-input>

```

``` javascript
//在输入框“前”添加插槽
<fcw-input v-model="value" placeholder="请输入内容">
    <i slot="prepend" class="iconfont gf-sousuo"></i>
</fcw-input>

```

``` javascript
//在输入框“后”添加插槽
<fcw-input v-model="value" placeholder="请输入内容">
    <i slot="append" class="iconfont gf-sousuo"></i>
</fcw-input>

```

``` javascript
//在输入框带清除按钮
<fcw-input v-model="value" clearable placeholder="请输入内容" @clear='clear'></fcw-input>

```

``` javascript
//密码类型输入框
<fcw-input v-model="value" show-password placeholder="请输入内容"></fcw-input>

```

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>type</font> | 输入框类型 | <font color=red>string</font> | <font color=#669900>text，textarea </font> | <font color=#669900> 暂无 </font>
<font color=#0077AA>value</font> | 绑定值 | <font color=red>string / number</font> | <font color=#669900>暂无 </font> | <font color=#669900> 暂无 </font>
<font color=#0077AA>disabled</font> | 禁用 | <font color=red>boolean</font> | <font color=#669900>true / false </font> | <font color=#669900> false </font>
<font color=#0077AA>clearable</font> | 带清除操作 | <font color=red>boolean</font> | <font color=#669900>true / false </font> | <font color=#669900> false </font>
<font color=#0077AA>showPassword</font> | 密码输入框 | <font color=red>boolean</font> | <font color=#669900>true / false </font> | <font color=#669900> false </font>

> <font color=#CD6600>3、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>change</font> | 回车或者失去焦点时触发 
<font color=#42b983>focus</font> | 获得焦点时触发
<font color=#42b983>blur</font> | 失去焦点时触发
<font color=#42b983>clear</font> | 清空事件


