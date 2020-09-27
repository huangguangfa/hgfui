### 基础用法

<div class="demo-block">
  <fcw-copy v-model="copyValue" icon="gf-fuzhi"></fcw-copy>
  <script>
    export default {
      data() {
        return {
          copyValue: '张三'
        }
      }
    }
    </script>
</div>

::: demo

```html

<fcw-copy v-model="copyValue" icon="gf-fuzhi"></fcw-copy>
  <script>
    export default {
      data() {
        return {
          copyValue: '张三'
        }
      }
    }
  </script>

```
:::

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>value</font> | 复制的内容 | <font color=red>string</font> | <font color=#669900>暂无</font> | <font color=#669900>''</font>
<font color=#0077AA>icon</font> | 图标icon | <font color=red>string</font> |  <font color=#669900>gf-fuzhi</font>  | <font color=#669900>gf-fuzhi</font>


