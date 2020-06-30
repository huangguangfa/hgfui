### 基础用法

<div class="demo-block">
    <fcw-input class="w250" v-model="input" placeholder="请输入内容" ></fcw-input>
    <script>
    export default {
      data() {
        return {
          input: ''
        }
      }
    }
    </script>
</div>

::: demo

```html

<fcw-input v-model="input" placeholder="请输入内容"></fcw-input>
  <script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
  </script>

```
:::

### 文本域

<div class="demo-block">
    <fcw-input  type="textarea" v-model="input" placeholder="请输入内容" ></fcw-input>
    <script>
    export default {
      data() {
        return {
          input: ""
        }
      }
    }
    </script>
</div>

::: demo

```html

<fcw-input type="textarea" v-model="input" placeholder="请输入内容"></fcw-input>
  <script>
  export default {
    data() {
      return {
        input:""
      }
    }
  }
  </script>

```
:::

###  icon 输入框

<div class="demo-block">
    <fcw-input class="w250"  placeholder="请输入内容">
      <i slot="prepend" class="iconfont gf-sousuo"></i>
    </fcw-input>
    <fcw-input class="w250 ml10"  placeholder="请输入内容">
      <i slot="append" class="iconfont gf-sousuo"></i>
    </fcw-input>
</div>



::: demo

```html

<fcw-input  placeholder="请输入内容">
  <i slot="prepend" class="iconfont gf-sousuo"></i>
</fcw-input>
<fcw-input placeholder="请输入内容">
  <i slot="append" class="iconfont gf-sousuo"></i>
</fcw-input>

```
:::


###  可清空
使用```@clear``` 事件来监听清空操作。

<div class="demo-block">
    <fcw-input class="w250"  v-model="input" clearable placeholder="请输入内容" ></fcw-input>
</div>



::: demo

```html

<fcw-input v-model="input" clearable placeholder="请输入内容" ></fcw-input>

```
:::


###  密码类型输入框

<div class="demo-block">
    <fcw-input v-model="input" class="w250" show-password placeholder="请输入内容"></fcw-input>
</div>



::: demo

```html

<fcw-input v-model="input"  show-password placeholder="请输入内容"></fcw-input>

```
:::


> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值<font color=#669900>
---|:--:|---:|:--:|:--:|
<font color=#0077AA>type</font> | 输入框类型 | <font color=red>string</font> | ``` text ``` ``` textarea ``` | <font color=#669900> 暂无 </font>
<font color=#0077AA>value</font> | 绑定值 | <font color=red>string / number</font> | <font color=#669900>暂无 </font> | <font color=#669900> 暂无 </font>
<font color=#0077AA>disabled</font> | 禁用 | <font color=red>boolean</font> | ```true``` ``` false ``` | <font color=#669900> false </font>
<font color=#0077AA>clearable</font> | 带清除操作 | <font color=red>boolean</font> | <font color=#669900>```true``` ``` false ``` </font> | <font color=#669900> false </font>
<font color=#0077AA>showPassword</font> | 密码输入框 | <font color=red>boolean</font> | <font color=#669900>```true``` ``` false ``` </font> | <font color=#669900> false </font>

> <font color=#CD6600>3、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>change</font> | 回车或者失去焦点时触发 
<font color=#42b983>focus</font> | 获得焦点时触发
<font color=#42b983>blur</font> | 失去焦点时触发
<font color=#42b983>clear</font> | 清空事件


