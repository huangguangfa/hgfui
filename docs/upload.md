### 基础用法

<div class="demo-block">
  <div class="fcw-uplaodDemo">
    <fcw-upload 
      ref="upload"
      url="http://192.168.0.8:5000/oss/oss/storageObject"
      name="file"
      :headers="headers"
      @success="filesuccess"
      @previewfile="previewfile">
    </fcw-upload>
  </div> 
  
  <script>
    export default {
      data() {
        return {
          copyValue: '张三',
          headers:{
            Authorization:'e43241231'
          }
        }
      },
      methods:{
        filesuccess(){
          console.log('上传成功')
        },
        previewfile(file){
          this.$message({
            type:'success',
            message:'假装上传成功！到自己项目请更换好的请求接口'
          })
          console.log(file)
        }
      }
    }
    </script>
</div>

::: demo

```html

<fcw-upload 
  ref="upload"
  url="http://192.168.0.8:5000/oss/oss/storageObject"
  name="file"
  :headers="headers"
  @success="filesuccess"
  @previewfile="previewfile">
</fcw-upload>
  
<script>
  export default {
    data() {
      return {
        copyValue: '张三',
        headers:{
          Authorization:'e43241231'
        }
      }
    },
    methods:{
      filesuccess(){
        console.log('上传成功')
      },
      previewfile(file){
        console.log(file)
      }
    }
  }
</script>
```
:::

### 使用插槽

<div class="demo-block">
  <div class="fcw-uplaodDemo">
    <fcw-upload 
      ref="upload"
      url="http://192.168.0.8:5000/oss/oss/storageObject"
      name="file"
      :headers="headers"
      @success="filesuccess"
      @previewfile="previewfile">
       <i  class="iconfont gf-tupian upload_6BA9DC"></i>
    </fcw-upload>
  </div> 
</div>

::: demo

```html

<fcw-upload 
  ref="upload"
  url="http://192.168.0.8:5000/oss/oss/storageObject"
  name="file"
  :headers="headers"
  @success="filesuccess"
  @previewfile="previewfile">
    <i  class="iconfont gf-tupian"></i>
</fcw-upload>
  
<script>
  export default {
    data() {
      return {
        copyValue: '张三',
        headers:{
          Authorization:'e43241231'
        }
      }
    },
    methods:{
      filesuccess(){
        console.log('上传成功')
      },
      previewfile(file){
        console.log(file)
      }
    }
  }
</script>
```
:::

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|--:|:--:|:--:|
<font color=#0077AA>fileType</font>|<font  size=1>上传的文件类型</font>|<font color=red>String</font>| <font size=1 color=#669900>image/png,image/jpg,image/jpeg....</font>|<font color=#FFB90F size=1>image/png,image/jpg,image/jpeg</font>
<font color=#0077AA>url</font>|<font  size=1>上传路径</font>|<font color=red>String</font>|<font color=#669900>暂无</font>|<font color=#FFB90F>https://xxxx</font>
<font color=#0077AA>isCssions</font>|<font  size=1>开启压缩上传模式</font>|<font color=red>boolean</font>|``` true ``` ``` false ```|<font color=#FFB90F>false</font>
<font color=#0077AA>quality</font>|<font  size=1>图片压缩后的质量 <font color=#FF83FA>/最高为1最低为0.1</font> </font>|<font color=red>number</font>|<font color=#669900>0.1 ～ 1</font>|<font color=#FFB90F>0.8</font>
<font color=#0077AA>size</font>|<font  size=1>上传文件大小</font>|<font color=red>Number</font>|<font color=#669900>暂无</font>|<font color=#FFB90F>100M</font>
<font color=#0077AA> autoUpload </font> | <font  size=1> 是否自动上传 </font> | <font color=red> Boolean </font> | ``` true ``` ``` false ``` | <font color=#FFB90F> true </font>
<font color=#0077AA> isDrag </font> | <font  size=1> 是否支持拖拽 </font> | <font color=red> Boolean </font> | <font color=#669900>  ``` true ``` ``` false ```</font> | <font color=#FFB90F> false </font> 
<font color=#0077AA> name </font> | <font  size=1> 上传文件字段名(key) </font> | <font color=red> String </font> | <font color=#669900> file </font> | <font color=#FFB90F> file  </font> 
<font color=#0077AA> data </font> | <font  size=1> 上传的额外参数 </font> | <font color=red> Object </font> | <font color=#669900>  暂无</font> | <font color=#FFB90F> {} </font> 
<font color=#0077AA> headers </font> | <font size=1> 设置上传的请求头部 </font> | <font color=red> Object </font> | <font color=#669900> 暂无 </font> | <font color=#FFB90F> {} </font> 
<font color=#0077AA> limit </font> | <font size=1> 最大允许上传个数</font> | <font color=red> Number </font> | <font color=#669900> 暂无 </font> | <font color=#FFB90F> 无限 </font> 

> <font color=#CD6600>1、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>success</font> | <font  size=2> 获取上传成功后的回调 </font>
<font color=#42b983>previewfile</font> | <font size=2> 获取点击后的这个文件流file </font> <font color=#FF69B4 size=1> 可配合autoUpload=false实现多图上传 </font>   <font size=1> 使用$refs调用组件的moreUpload(fileList); fileList：是数组文件流 </font>
<font color=#42b983>error</font> | <font  size=2> 错误回调 </font>