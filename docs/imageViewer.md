### 基础用法(单图模式)

<div class="demo-block">
   <div class="w200">
      <fcw-imageViewer  name="这是我的偶像" :imgUrl="imgUrl"></fcw-imageViewer>
      <script>
            export default {
               name: 'app',
               data(){
                  return {
                     imgUrl:'https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/xy.jpg',
                     imgList:[
                           {
                              name:'大学集体合照',
                              url:'https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/0115a66fc055dfcf84ac95cd55597c19.jpg'
                           },
                           {
                              name:'精神偶像罗斯',
                              url:'https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/xy.jpg'
                           }
                     ]
                  }
               }
            }
      </script>
   </div>
</div>

::: demo

```html

<fcw-imageViewer name="这是我的偶像" :imgUrl="imgUrl"></fcw-imageViewer>
  <script>
      export default {
         name: 'app',
         data(){
            return {
               imgUrl:'https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/xy.jpg'
            }
         }
      }
   </script>

```
:::

### 基础用法(多图模式)

<div class="demo-block">
   <div class="w200">
      <fcw-imageViewer ismultiple :imgList="imgList" :imgUrl="imgUrl">  </fcw-imageViewer> 
   </div>
</div>

::: demo

```html

  <fcw-imageViewer  ismultiple :imgList="imgList" :imgUrl="imgUrl">  </fcw-imageViewer> 
  <script>
      export default {
         name: 'app',
         data(){
            return {
               imgList:[
                     {
                        name:'大学集体合照',
                        url:'https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/0115a66fc055dfcf84ac95cd55597c19.jpg'
                     },
                     {
                        name:'精神偶像罗斯',
                        url:'https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/xy.jpg'
                     }
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
<font color=#0077AA>name</font> | 查看图片的名称 | <font color=red>string</font> | <font color=#669900>暂无 </font> | <font color=#669900>'查看图片'</font>
<font color=#0077AA>ismultiple</font> | 是否展示多张图片 | <font color=red>Boolean</font> |  ``` true ``` ``` false ```  | <font color=#669900>false</font>
<font color=#0077AA>imgList</font> | 展示多张图片List | <font color=red>Array</font> |  <font color=#669900> 暂无 </font>  | <font color=#669900> [] </font>
<font color=#0077AA>imgUrl</font> | 默认展示图片url | <font color=red>String</font> |  <font color=#669900> 暂无 </font>  | <font color=#669900> xxx </font>




