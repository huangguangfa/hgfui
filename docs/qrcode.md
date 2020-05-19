- 二维码生成器

``` javascript
    //使用
    <fcw-qrcode 
        :size="300" 
        :islogo="true"
        :logo="{
            src:require('./assets/logo.png'),
            borderColor:'#fff',
            bgColor:'red',
            logoSize:50
        }"
        :content="{
            name:'31231231',
            age:19
        }"
    ></fcw-qrcode>
```

<font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>size</font> | 二维码的大小 | <font color=red>Number</font> | <font color=#669900>暂无</font> | <font color=#669900>100</font>
<font color=#0077AA>islogo</font> | 是否要logo | <font color=red>Boolean</font> |  <font color=#669900>true / false</font>  | <font color=#669900>false</font>
<font color=#0077AA>content</font> | 二维码内容 | <font color=red>任意</font> |  <font color=#669900>暂无/false</font>  | <font color=#669900>""</font>
<font color=#0077AA>logo</font> | logo配置信息对象 | <font color=red>Object</font> |  <font color=#669900>暂无</font>  | <font color=#669900>{}</font>
<font color=#0077AA>isimgDataFile</font> | 是否需要file文件流 | <font color=red>Boolean</font> |  <font color=#669900>true / false</font>  | <font color=#669900>false</font>
<font color=#0077AA>isimgDatabase</font> | 是否需要base64文件流 | <font color=red>Boolean</font> |  <font color=#669900>true / false</font>  | <font color=#669900>false</font>


<font color=#CD6600>2、logo的配置对象</font>

key|类型|说明|默认值
---|:--:|--:|--:|
<font color=#0077AA>logoSize</font> |<font color=red>number</font>|<font color=#669900>logo大小</font> | 无 |
<font color=#0077AA>src</font> |<font color=red>string</font>| <font color=#669900>logo路径地址</font> | 无 |
<font color=#0077AA>bgColor</font>|<font color=red>16进制颜色代码</font> | <font color=#669900>logo背景颜色</font> |#fff / transparent 没有背景色|
<font color=#0077AA>borderRadius</font>|<font color=red>number</font>  | <font color=#669900>logo圆角值</font> |0|

<font color=#CD6600>2、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>imgDataBase</font> | 获取base64文件流的回调 <font color=#FF69B4> 必须isimgDatabase = true</font> 才开启
<font color=#42b983>imgDataFile</font> | 获取file文件流的回调 <font color=#FF69B4> 必须isimgDataFile = true</font> 才开启