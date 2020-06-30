### 基础用法

<div class="demo-block">
  <fcw-page  :current-page="currentPage" :page-size="pageSize" :total="100" @current-change="currentChange" ></fcw-page>
  <script>
    export default {
      data() {
        return {
          currentPage: 1,
          pageSize:10,
        }
      },
      methods:{
          currentChange(val){
            this.$message({
                type:'success',
                message:'当前页面 '+ val,
            })
          }
        } 
    }
    </script>
</div>

::: demo

```html

<fcw-page  :current-page="currentPage" :page-size="pageSize" :total="100" @current-change="currentChange" ></fcw-page>
<script>
    export default {
      data() {
        return {
          currentPage: 1,
          pageSize:10,
        }
      },
      methods:{
          currentChange(val){
            this.$message({
                type:'success',
                message:'当前页面 '+ val,
            })
          }
        } 
    }
</script>

```
:::

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>current-page</font> | 当前页 | <font color=red>number</font> | <font color=#669900>暂无</font> | <font color=#669900> 暂无 </font>
<font color=#0077AA>page-size</font> | 展示的size | <font color=red> number </font> |  <font color=#669900>暂无</font>  | <font color=#669900>暂无</font>
<font color=#0077AA>total</font> | 总条目数 | <font color=red>number</font> | <font color=#669900>暂无</font> | <font color=#669900>暂无</font>
<font color=#0077AA>showTotal</font> | 显示总条数 | <font color=red> Boolean</font> | <font color=#669900>暂无</font> | <font color=#669900>false</font>
<font color=#0077AA>sizes</font> | 显示分页筛选显示设置 | <font color=red> Boolean</font> | <font color=#669900>暂无</font> | <font color=#669900>false</font>
<font color=#0077AA>pageSizes</font> | 每页显示个数选择器的选项设置 | <font color=red> Array </font> | <font color=#669900>暂无</font> | <font color=#669900>[10, 20, 30, 40, 50, 100]</font>

> <font color=#CD6600>3、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>current-change</font> | currentPage 改变时会触发 
