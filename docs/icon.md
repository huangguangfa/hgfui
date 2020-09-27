### 图标

<div class="demo-block">
   <div>
      <ul class="iconfont_com">
        <li v-for="(icon,index) in icom" :key="index" style="cursor: pointer;" @click="copyIcon(icon)">
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
               },
               methods:{
                  copyIcon(text){
                     //创建copy元素
                     const $textarea = document.createElement('textarea');
                     $textarea.readOnly = 'readonly';
                     $textarea.style.position = 'absolute';
                     $textarea.style.left = '-9999px';
                     $textarea.value = text;
                     document.body.appendChild($textarea);
                     $textarea.select();
                     const result = document.execCommand('Copy');
                     if (result) {
                        this.$message({  type:'success',  message:'复制成功！'})
                     }
                     document.body.removeChild($textarea);
                  }
               }
            }
      </script>
   </div>
</div>