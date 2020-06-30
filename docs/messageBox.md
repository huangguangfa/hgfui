### 基础用法

<div class="demo-block">
  <fcw-button type="primary" size="small" @click="message">删除李大锤</fcw-button>
  <script>
    export default {
      methods:{
         message(){
            this.$confirm({
               icon:'gf-shanchu',
               content:'你确定要删除 李大锤 吗？'
            }).then( confirm =>{
               this.$message({
                    type:'success',
                    message:'删除成功',
                    showClose:false,
               })
            }).catch( cancel =>{
               this.$message({
                    type:'success',
                    message:'取消删除',
                    showClose:false,
               })
            })
         }
      }
    }
    </script>
</div>

::: demo

```html

<fcw-button type="primary" size="small" @click="message">删除李大锤</fcw-button>
  <script>
    export default {
      methods:{
         message(){
            this.$confirm({
               icon:'gf-shanchu',
               content:'你确定要删除 李大锤 吗？'
            }).then( confirm =>{
               console.log('点击了确定')
            }).catch( cancel =>{
               console.log('点击了取消')
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
<font color=#0077AA> icon </font> | 展示的图标字体 | <font color=red> string </font> | <font color=#669900> 暂无  </font> | <font color=#669900> gf-shanchu </font>
<font color=#0077AA>content</font> | 显示的内容信息 | <font color=red>  string </font> |  <font color=#669900>暂无</font>  | <font color=#669900> 是否要删除</font>
