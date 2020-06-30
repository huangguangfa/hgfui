### 基础用法

<div class="demo-block">
    <fcw-radio label="1" v-model="radio">测试1</fcw-radio>
    <fcw-radio label="2" v-model="radio">测试2</fcw-radio>
    <script>
        export default {
            data() {
                return {
                    radio:'1'
                }
            },
            methods:{
                radioChang(val){
                    this.$message({
                        type:'success',
                        message:'操作成功！',
                        showClose:true,
                        onClose:(ev) =>{
                            console.log(ev)
                        }
                    })
                }
            }
        }
    </script>
</div>

::: demo

```html

<fcw-radio label="1" v-model="radio">测试1</fcw-radio>
<fcw-radio label="2" v-model="radio">测试2</fcw-radio>
<script>
    export default {
        data() {
            return {
                radio:'1'
            }
        },
        
    }
</script>

```
:::

### 单选框组 结合fcw-radio-group元素和子元素fcw-radio可以实现单选组
<div class="demo-block">
    <fcw-radio-group v-model="radio"  @change="radioChang">
        <fcw-radio label="1">测试1</fcw-radio>
        <fcw-radio label="2">测试2</fcw-radio>
    </fcw-radio-group>
</div>

::: demo

```html

<fcw-radio-group v-model="radio"  @change="radioChang">
    <fcw-radio label="1">测试1</fcw-radio>
    <fcw-radio label="2">测试2</fcw-radio>
</fcw-radio-group>
<script>
    export default {
        data() {
            return {
                radio:'1'
            }
        },
        methods:{
            radioChang(val){
                
            }
        }
    }
</script>

```
:::


> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>radio</font> | 选中的值 | <font color=red>任意</font> | <font color=#669900>暂无</font> | <font color=#669900> 暂无 </font>
<font color=#0077AA>label</font> | Radio 的 value | <font color=red> 任意 </font> |  <font color=#669900>暂无</font>  | <font color=#669900>暂无</font>

> <font color=#CD6600>3、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>change</font> | radio值改变时会触发 
