
### 基础用法

<div class="demo-block">
  <fcw-select class="w250" v-model="selectText" :select-data="selectList" :options="options"></fcw-select>
  <script>
    export default {
      data(){
        return {
            options:{ label:'name', value:'id' },
              selectText:'',
              selectList:[
                { id:'2', name:'西瓜' },
                { id:'1', name:'菠萝' },
                { id:'3', name:'香蕉' }
              ]
        }
      }
  }
  </script>
</div>

::: demo

```html

<fcw-select v-model="selectText" :select-data="selectList" :options="options"></fcw-select>
<script>
  export default {
    data(){
      return {
          options:{ label:'name', value:'id' },
            selectText:'',
            selectList:[
               { id:'2', name:'西瓜' },
               { id:'1', name:'菠萝' },
               { id:'3', name:'香蕉' }
             ]
      }
    }
 }
</script>

```
:::


> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA> v-model </font> | 选中的label | <font color=red> 任意 </font> | <font color=#669900> 暂无  </font> | <font color=#669900> '' </font>
<font color=#0077AA>selectData</font> | 下拉的数据 | <font color=red>  Array </font> |  <font color=#669900>暂无</font>  | <font color=#669900>暂无</font>
<font color=#0077AA>options</font> | 下拉需要选择的值和展示的值 <font color="#FF83FA"> label:选中的key、value:展示的值 </font> | <font color=red>object</font> | <font color=#669900>暂无</font> | <font color=#669900> label、value</font>
<font color=#0077AA>disable</font> | 是否为禁用 <font color="#FF83FA">禁用状态disable</font>| 
<font color=#0077AA>clearable</font> | 清空操作启用 | <font color="red">Boolean</font>|  <font color=#669900>false、true</font> | <font color=#669900>false</font>