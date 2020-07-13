### 图标

<div class="demo-block">
   <div>
      <ul class="iconfont_com">
        <li v-for="(icon,index) in icom" :key="index">
            <i class="iconfont" :class="icon"></i>
            <span>{{ icon }}</span>
        </li>
      </ul>
      <script>
            export default {
               name: 'app',
               data(){
                  return {
                    icom:[
                        'gf-sanjiaoright',
                        'gf-gengduo',
                        'gf-info',
                        'gf-yanjing',
                        'gf-sousuo',
                        'gf-cuo1',
                        'gf-xiala',
                        'gf-shanchu',
                        'gf-loading',
                        'gf-zuozuo-',
                        'gf-youyou-',
                        'gf-Left',
                        'gf-right',
                        'gf-iconset0340',
                        'gf-tupian',
                        'gf-youxuanzhuan',
                        'gf-zhongzhi-copy',
                        'gf-jia',
                        'gf-jian',
                        'gf-fuzhi'
                    ]
                  }
               }
            }
      </script>
   </div>
</div>