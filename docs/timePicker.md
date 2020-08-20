

### 基础用法

使用```type``` 属性来定义 time-picker 的模式、支持标准时间和时间范围。
type="time"
<div class="demo-block">
    <div class="code_flex">
        <fcw-time-picker v-model="time" format="HH点mm分ss秒"></fcw-time-picker>
    </div> 
    <script>
        export default {
            data() {
                return {
                    time:'05点03分04秒',
                    timeList:["05点03分04秒", "07点11分28秒"]
                }
            },
        }
    </script>
</div>

::: demo

```html

<fcw-time-picker v-model="time" format="HH点mm分ss秒"></fcw-time-picker>
<script>
    export default {
        data() {
            return {
                time:'05点03分04秒'
            }
        },
    }
</script>

```
:::

### 时间范围
<div class="demo-block">
    <div class="code_flex mar-left300">
        <fcw-time-picker v-model="timeList" type="timerange" format="HH点mm分ss秒" distinguish="至"></fcw-time-picker>
    </div> 

</div>

::: demo

```html

<fcw-time-picker v-model="timeList" type="timerange" format="HH点mm分ss秒" distinguish="至"></fcw-time-picker>
<script>
    export default {
        data() {
            return {
                timeList:["05点03分04秒", "07点11分28秒"]
            }
        },
    }
</script>

```
:::

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>type</font> | 类型 | <font color=red>string</font> | ``` time ``` ``` timerange ```  | ``` time ```
<font color=#0077AA>disabled</font> | 是否禁用 | <font color=red> boolean</font> |  ``` true ``` ``` false ```  | <font color=#669900>```false```</font>
<font color=#0077AA>format</font> | 时间格式 | <font color=red>String</font> |  ```HH点mm分ss秒``` ```HH:mm:ss``` ```HH-mm-ss```  | <font color=#669900>```HH点mm分ss秒```</font>
<font color=#0077AA>clearable</font> | 是否支持清空 | <font color=red>Boolean</font> | <font color=#669900>``` true ``` ``` false ```</font> | <font color=#669900>```true```</font>
<font color=#0077AA>distinguish</font> | 范围区分符(范围模式) | <font color=red>String</font> | <font color=#669900>``` - ``` ```至```</font> | <font color=#669900>```-```</font>
<font color=#0077AA>isConstraint</font> | 是否需要约束（范围模式） | <font color=red>Boolean</font> | <font color=#669900>``` true ``` ``` false ```</font> | <font color=#669900>```true```</font>

> <font color=#CD6600>3、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>focus</font> | 获得焦点时触发 
<font color=#42b983>clear</font> | 清空事件
<font color=#42b983>change</font> | 时间被选择触发事件