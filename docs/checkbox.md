
### 基础用法

<div class="demo-block">
  <fcw-checkbox label="1" v-model="checkList">多选A</fcw-checkbox>
  <fcw-checkbox label="2" v-model="checkList">多选B</fcw-checkbox>
  <fcw-checkbox label="3" v-model="checkList" disabled>多选C</fcw-checkbox>
  <script>
    export default {
      data() {
        return {
          checkList:['3'],
          indeterminate:true,
          checkAll:false
        }
      },
      methods:{
        checkboxChangAll(val){
            if(val){
                this.checkList = ['1','2','3']
            }else{
                this.checkList = []
                this.indeterminate = false;
            }
        },
      }
    }
    </script>
</div>

::: demo

```html

<fcw-checkbox label="1" v-model="checkList">多选A</fcw-checkbox>
<fcw-checkbox label="2" v-model="checkList">多选B</fcw-checkbox>
<fcw-checkbox label="3" v-model="checkList" disabled>多选C</fcw-checkbox>
<script>
  export default {
    data() {
      return {
        checkList:['3']
      }
    }
  }
  </script>

```
:::

### 多选框组 结合fcw-checkbox-group元素和子元素fcw-checkbox可以实现单选组

<div class="demo-block">
  <fcw-checkbox-group v-model="checkList">
    <fcw-checkbox label="1" >多选A</fcw-checkbox>
    <fcw-checkbox label="2">多选B</fcw-checkbox>
    <fcw-checkbox label="3" disabled>多选C</fcw-checkbox>
  </fcw-checkbox-group>
  <script>
    export default {
      data() {
        return {
          checkList:['3']
        }
      }
    }
    </script>
</div>

::: demo

```html

<fcw-checkbox-group v-model="checkList" >
  <fcw-checkbox label="1" >多选A</fcw-checkbox>
  <fcw-checkbox label="2">多选B</fcw-checkbox>
  <fcw-checkbox label="3" disabled>多选C</fcw-checkbox>
</fcw-checkbox-group>
<script>
export default {
  data() {
    return {
      checkList:['3']
    }
  }
}
</script>

```
:::

### indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

<div class="demo-block">
  <fcw-checkbox label="10" v-model="checkAll" :indeterminate="indeterminate">全选</fcw-checkbox>
  <fcw-checkbox-group v-model="checkList" >
    <fcw-checkbox label="1">多选A</fcw-checkbox>
    <fcw-checkbox label="2">多选B</fcw-checkbox>
    <fcw-checkbox label="3">多选C</fcw-checkbox>
  </fcw-checkbox-group>
  <script>
    export default {
      data() {
        return {
          checkList:['3'],
          indeterminate:true,
          checkAll:false
        }
      }
    }
    </script>
</div>

::: demo

```html

<fcw-checkbox-group v-model="checkList" >
  <fcw-checkbox label="1" >多选A</fcw-checkbox>
  <fcw-checkbox label="2">多选B</fcw-checkbox>
  <fcw-checkbox label="3" disabled>多选C</fcw-checkbox>
</fcw-checkbox-group>
<script>
export default {
  data() {
    return {
      checkList:['3']
    }
  },
  methods:{
    checkboxChangAll(val){
        if(val){
            this.checkList = ['1','2','3']
        }else{
            this.checkList = []
            this.indeterminate = false;
        }
    },
  }
}
</script>

```
:::


> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>checkList</font> | 选中后的数组值 | <font color=red>Array</font> | <font color=#669900>暂无</font> | <font color=#669900> 暂无 </font>
<font color=#0077AA>label</font> | 显示和点击选中值 | <font color=red> 任意 </font> |  <font color=#669900>暂无</font>  | <font color=#669900>暂无</font>
<font color=#0077AA>indeterminate</font> | 全选状态 | <font color=red> boolean </font> |  <font color=#669900>暂无</font>  | <font color=#669900>false</font>


> <font color=#CD6600>3、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>change</font> | checkbox值改变时会触发 
