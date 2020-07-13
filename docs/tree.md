### 基础用法

<div class="demo-block">
    <fcw-tree
        :data="filmList"
        :defalut-expand-keys="[1]"
        @node-click="nodeClick">
    </fcw-tree>
    <script>
        export default {
            data() {
                return {
                    filmList:[
                        {
                            id:1,
                            label:'青春偶像剧',
                            children:[
                                {
                                    id:2,
                                    label:'小明爬山记',
                                    pid:1,
                                },
                                {
                                    id:3,
                                    label:'隐秘角落',
                                    pid:1,
                                }
                            ]
                        },
                        {
                            id:4,
                            label:'电视剧',
                            children:[
                                {
                                    id:5,
                                    label:'迪迦奥特曼',
                                    pid:4,
                                },
                                {
                                    id:6,
                                    label:'火影忍者',
                                    pid:4
                                }
                            ]
                        }
                    ],
                    treeList:[
                        {
                            id:1,
                            label:'子级1',
                            children:[
                                {
                                    id:2,
                                    label:'子级1-1',
                                    pid:1,
                                    children:[
                                        {
                                            label:'子级1-1-1',
                                            id:7,
                                            pid:2
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    label:'子级1-2',
                                    pid:1,
                                }
                            ]
                        },
                        {
                            id:4,
                            label:'子级2',
                            children:[
                                {
                                    id:5,
                                    label:'子级2-1',
                                    pid:4,
                                },
                                {
                                    id:6,
                                    label:'子级2-2',
                                    pid:4,
                                }
                            ]
                        }
                    ] 
                }
            },
            methods:{
                nodeClick(row){
                    console.log(row)
                }
            }
        }
    </script>
</div>

::: demo

```html

<fcw-tree
    :data="filmList"
    :defalut-expand-keys="[1]"
    @node-click="nodeClick">
</fcw-tree>
<script>
    export default {
        data() {
            return {
                filmList:[
                    {
                        id:1,
                        label:'青春偶像剧',
                        children:[
                            {
                                id:2,
                                label:'小明爬山记',
                                pid:1,
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            nodeClick(row){
                console.log(row)
            }
        }
    }
</script>

```
:::

### 带下拉勾选框

<div class="demo-block">
    <fcw-tree
        :data="treeList"
        show-checkbox
        :default-checked-keys="[2]"
        :defalut-expand-keys="[1]"
        @node-click="nodeClick">
    </fcw-tree>
</div>


::: demo

```html

<fcw-tree
    :data="treeList"
    show-checkbox
    :default-checked-keys="[2]"
    :defalut-expand-keys="[1]"
    @node-click="nodeClick">
</fcw-tree>
<script>
    export default {
        data() {
            return {
                treeList:[
                    {
                        id:1,
                        label:'子级1',
                        children:[
                            {
                                id:2,
                                label:'子级1-1',
                                pid:1,
                                children:[
                                    {
                                        label:'子级1-1-1',
                                        id:7,
                                        pid:2
                                    }
                                ]
                            },
                            {
                                id:3,
                                label:'子级1-2',
                                pid:1,
                            }
                        ]
                    },
                    {
                        id:4,
                        label:'子级2',
                        children:[
                            {
                                id:5,
                                label:'子级2-1',
                                pid:4,
                            },
                            {
                                id:6,
                                label:'子级2-2',
                                pid:4,
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            nodeClick(row){
                console.log(row)
            }
        }
    }
</script>

```
:::

> <font color=#CD6600>1、参数描述</font>

参数|说明|类型|可选值|默认值
---|:--:|---:|:--:|:--:|
<font color=#0077AA>data</font> | 树形数据 | <font color=red> Array </font> | <font color=#669900>暂无</font> | <font color=#669900> [] </font>
<font color=#0077AA>showCheckbox</font> | 是否展示勾选框 | <font color=red>Boolean</font> |  ``` true ``` ``` false ```  | <font color=#669900>false</font>
<font color=#0077AA>defaultCheckedKeys</font> | 默认勾选的key | <font color=red>任意</font> |  ''  | <font color=#669900>""</font>
<font color=#0077AA>defalutExpandKeys</font> | 需要展开的节点 | <font color=red> Array </font> |  <font color=#669900>暂无</font>  | <font color=#669900>{}</font>
<font color=#0077AA>props</font> | 配置选项 | <font color=red>Object</font> | {  children:'children', label:'label' }  | <font color=#669900> {  children:'children', label:'label' }</font>


> <font color=#CD6600>2、props的配置对象</font>

key|类型|说明|默认值
---|:--:|--:|--:|
<font color=#0077AA>children</font> |<font color=red>string</font>|<font color=#669900>子节点的key</font> | ``` children ``` |
<font color=#0077AA>label</font> |<font color=red>string</font>| <font color=#669900>展示出的字段</font> | ``` label ``` |

> <font color=#CD6600>3、事件回调$emit</font>

事件名称|说明 |
-----|:--:|
<font color=#42b983>node-click</font> | 点击节点的回调 
<font color=#42b983>check-change</font> | 节点选中状态发生变化时的回调 