
- 图片查看器

``` javascript
    //使用
    <fcw-imageViewer> <fcw-imageViewer/>
```
``` javascript
    //单图案例
    <template>
        <div id="app">
            <fcw-imageViewer 
                :ismultiple="false"
                name="测试单图"
                :imgUrl="imgUrl">
            </>
        </div>
    </<template>

    export default {
        name: 'app',
        data(){
            return {
                 imgUrl:'https://boya-subway.obs.cn-south-1.myhuaweicloud.com:443/202005160447560424.jpg'
            }
        }
    }

```

``` javascript
    //多图案例
    <template>
        <div id="app">
            <fcw-imageViewer 
                :ismultiple="true"
                :imgList="imgList"
                :imgUrl="imgUrl">

            </fcw-imageViewer> 
        </div>
    </<template>

    export default {
        name: 'app',
        data(){
            return {
                imgList:[
                    {
                        name:'测试1号',
                        url:'https://boya-subway.obs.cn-south-1.myhuaweicloud.com:443/202005160447560424.jpg'
                    },
                    {
                        name:'测试2号',
                        url:'https://boya-subway.obs.cn-south-1.myhuaweicloud.com:443/202005180437150879.jpg'
                    }
                ]
            }
        }
    }

```

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>name</font> | 查看图片的名称 | <font color=red>string</font> | <font color=#669900>暂无 </font> | <font color=#669900>'查看图片'</font>
<font color=#0077AA>ismultiple</font> | 是否展示多张图片 | <font color=red>Boolean</font> |  <font color=#669900>false\true</font>  | <font color=#669900>false</font>
<font color=#0077AA>imgList</font> | 展示多张图片List | <font color=red>Array</font> |  <font color=#669900> 暂无 </font>  | <font color=#669900> [] </font>
<font color=#0077AA>imgUrl</font> | 默认展示图片url | <font color=red>String</font> |  <font color=#669900> 暂无 </font>  | <font color=#669900> xxx </font>




