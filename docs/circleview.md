
### 基础用法

<div class="demo-block">
  <fcw-circleview 
    :percentage="sum" 
    :unit="个" 
    :color="red">
  </fcw-circleview>
  <button class="mt20" @click="sum++">+</button>
  <script>
    export default {
      data() {
        return {
          sum:10
        }
      }
    }
  </script>
</div>

::: demo

```html

<fcw-circleview 
    :percentage="sum" 
    :unit="个" 
    :color="red">
  </fcw-circleview>
  <script>
    export default {
      data() {
        return {
          sum:10
        }
      }
    }
  </script>

```
:::

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>percentage</font> | 进度值 | <font color=red>Number</font> | <font color=#669900>暂无</font> | <font color=#669900>0</font>
<font color=#0077AA>color</font> | 16进制颜色或者正常颜色单词 | <font color=red> String</font> |  <font color=#669900>暂无</font>  | <font color=#669900>#64d3f6</font>
<font color=#0077AA>unit</font> | 显示单位 | <font color=red>String</font> | <font color=#669900>暂无</font> | <font color=#669900>%</font>
<font color=#0077AA>textColor</font> | 显示字体颜色 | <font color=red>String</font> | <font color=#669900>暂无</font> | <font color=#669900>#343435</font>


