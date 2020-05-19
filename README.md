# fcw-gf（functional components warehouse）


> [组件详细文档地址](https://www.huangguangfa.cn)

``` js
//安装
yarn add fcw-gf
npm install --save-dev fcw-gf

//在min.js 引入使用
import fcwgf from 'fcw-gf'

Vue.use(fcwgf)

```

```
开发一步  在packages下面添加组件包 命名规则 fcw-组件包名字 例如fcw-qrcode
第二步 在组件包下新建 index.js文件 src下面新建main.vue  主要是组件开发 组件名字规则fcwXXX
例如fcwQrcode index.js  主要是对外暴露组件
第三步 在组件包packages下的fcw-ui.js 中引入组件
第四步 在packages的 install 引入组件
第五步 在docs下面写 以路由名字命名的md文件 例如qrcode.md  写法参考已经写好的组件md

```



















