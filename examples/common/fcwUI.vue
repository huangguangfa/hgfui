<template>
    <div class="fcw-gf">
        <div class="fcw-conetn">
            <div class="title"> 
                <img class="icon" :src="require('../assets/icon.png')" alt="" title="返回首页" @click="toBlogs" />
                <span>fcw-gf</span>
            </div>

            <div class="fcw-c-b">
                <div class="fcw-left">
                    <p class="remind">开发指南</p>
                    <ul v-for="(item,key,index) in navList" :key="index">
                        <p class="side-nav-title">{{ key }}</p>
                        <li v-for="( value, index ) in item" :key="index" :class="selectPath === value.path?'fcw-selected':''" @click="toRouter(value.path)">
                            {{ value.desc }}
                        </li>
                    </ul>
                </div>
                <div class="fcw-right fadeInLeft">
                    <div className="contentHtml">
                        <router-view class="page"></router-view>
                    </div>  
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import navData from '../nav.config.json'
export default {
    name: 'fcw-ui',
    data(){
        return {
            navList:navData,
            selectPath:'/fcw-ui',
        }
    },
    created(){
        
    },
    methods:{
        toRouter(path){
            if( this.selectPath === path){ return false }
            this.selectPath = path;
            this.$router.push({
                path:path
            })
        },
        toBlogs(){
            window.location.href = 'https://huangguangfa.cn'
        }
    }
}
</script>
<style lang="less">

// 基础样式
.fcw-gf{
    width: 100%; height: 100vh; background: #fff; overflow: hidden;
    .fcw-conetn{
        width: 1140px; height: 100%; background: #fff; 
        margin: 0 auto; position: relative;
        .title{
            width: 100%; height: 80px;border-bottom: 1px solid #f0f0f0;
            color: #0dabdd;
            display: flex; align-items: center;
            >span{
                font-size: 22px; font-weight: 700;
            }
            .icon{width: 30px;  margin-right: 10px; cursor: pointer;}
        }
    }
}
.fcw-c-b{
    width: 100%; height: 90%;display: flex; justify-content: center;
    .fcw-left{
        width: 240px; margin-right: 20px;  height: 100%; overflow: hidden; 
        transition: background-color .3s; border-right: 1px solid #f0f0f0;
        .remind{
            color: #333;
            line-height: 40px;
            height: 40px;
            margin: 0;
            padding: 0;
            text-decoration: none;
            display: block;
            position: relative;
            font-weight: 700;
            font-size: 18px;
        }
        ul{
            >li{
                height: 40px;
                color: #444;
                line-height: 40px;
                font-size: 14px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-weight: 400;
                cursor: pointer;
                &:hover{color: #409eff;}
                text-indent: 20px;
                a{
                    color: #444;display: block; width: 100%; height: 100%;
                }
            }
            .fcw-selected{
                background-color: rgba(230,247,255,0.3);
                border-right: 2px solid rgba(64,158,255,0.7);
                color: #0dabdd;
            }
        }
    }
    .fcw-left:hover{overflow: auto;}
    .fcw-left::-webkit-scrollbar{
        display: none;
        width: 6px;
        height: 6px;
        background-color: #fff;
    }
    /*定义t滚动条轨道 内阴影+圆角*/
    .fcw-left::-webkit-scrollbar-track{
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
        border-radius: 10px;
        background-color: #fff;
      }
    /*定义滑块 内阴影+圆角*/
    .fcw-left::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: rgba(144,147,153,.6);
    }
    .fcw-left::-webkit-scrollbar-track-piece{background: none;}
    .fcw-right{
        width: 880px; height: 95%; overflow: auto;
    }
    .fcw-right::-webkit-scrollbar{
       display: none;
    }
}


h1, h2, h3, h4 {
      color: #111111;
      font-weight: 400;
      margin-top: 1em;
  }

  h1, h2, h3, h4, h5 {
      font-family: Georgia, Palatino, serif;
  }
  h1, h2, h3, h4, h5, dl{
      margin-bottom: 16px;
      padding: 0;
  }
  h1 {
      font-size: 25px;
      line-height: 54px;
  }
  h2 {
      font-size: 18px;
      line-height: 42px;
  }
  h1, h2 {
      border-bottom: 1px solid #EFEAEA;
      padding-bottom: 10px;
  }
  h3 {
      font-size: 18px;
      line-height: 30px;
  }
  h4 {
      font-size: 15px;
      line-height: 26px;
  }
  h5 {
      font-size: 13px;
      list-style: 23px;
  }
  a {
      color: #0099ff;
      margin: 0;
      padding: 0;
      vertical-align: baseline;
  }
  a:hover {
      text-decoration: none;
      color: #ff6600;
  }
  li {
      line-height: 24px;
  }
  p, ul, ol {
      font-size: 12px;
      line-height: 24px;
  }

  ol ol, ul ol {
      list-style-type: lower-roman;
      margin-bottom:none;
  }

  code {
      font-family: Consolas, Monaco, Andale Mono, monospace;
      line-height: 1.5;
      font-size: 12px;
      margin: 0 2px;
      color: #3f536e;
      border-radius: 3px;
      padding: 2px 10px;
      background-color: #e6effb;
      display: inline-block;
      span{font-size: 14px;}
  }
  pre{
        width: 100%; 
       background-color:#2d2d2d;
       color: inherit;
       margin-bottom: 10px;  
        line-height: 1.7em;
        overflow: auto;
        box-sizing: border-box;
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px;   
        padding:20px 10px 15px 10px;
    }
  pre::-webkit-scrollbar {display:none}
  pre::after{
      content: '';
      height: 30px;
      background: url('../assets/mac.png');
      background-repeat: no-repeat;
      background-position: 0px 10px;
      background-size: 40px;
      position: absolute;
      top: 0px;
      z-index: 99;
      left: 10px;
      width: 100px;
  }
pre > code {
    border: 0;
    display: inline;
    max-width: initial;
    padding: 0;
    // margin: 0;
    overflow: initial;
    line-height: inherit;
    font-size:12px;
    white-space: pre;
    background: 0 0;
} 

/** markdown preview plus 对于代码块的处理有些问题, 所以使用统一的颜色 */
code .keyword {
    color: #8959a8;
}

  code .number {
    color: #f5871f;
  }

  code .comment {
    color: #998
  }

  aside {
      display: block;
      float: right;
      width: 390px;
  }
  blockquote {
      border-left:3px solid #eee;
      padding: 0 0 0 10px;
      margin-left:0;
  }
  blockquote  cite {
      font-size:14px;
      line-height:20px;
      color:#bfbfbf;
  }
  blockquote cite:before {
      content: '\2014 \00A0';
  }

  blockquote p {
      color: #666;
  }
  hr {
      text-align: left;
      color: #999;
      height: 2px;
      padding: 0;
      margin: 16px 0;
      background-color: #e7e7e7;
      border: 0 none;
  }

  dl {
      padding: 0;
  }

  dl dt {
      padding: 10px 0;
      margin-top: 16px;
      font-size: 1em;
      font-style: italic;
      font-weight: bold;
  }

  dl dd {
      padding: 0 16px;
      margin-bottom: 16px;
  }

  dd {
      margin-left: 0;
  }
  table {
      *border-collapse: collapse; /* IE7 and lower */
      border-spacing: 0;
      width: 100%;
  }
  table {
      border: solid #ccc 1px;
      -moz-border-radius: 6px;
      -webkit-border-radius: 6px;
      border-radius: 6px;
      font-size: 14px;
      /*-webkit-box-shadow: 0 1px 1px #ccc;
      -moz-box-shadow: 0 1px 1px #ccc;
      box-shadow: 0 1px 1px #ccc;   */
  }
  table tr:hover {
      background: #fbf8e9;
      -o-transition: all 0.1s ease-in-out;
      -webkit-transition: all 0.1s ease-in-out;
      -moz-transition: all 0.1s ease-in-out;
      -ms-transition: all 0.1s ease-in-out;
      transition: all 0.1s ease-in-out;
  }
  table td, .table th {
      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      padding: 10px;
      text-align: left;
  }

  table th {
      background-color: #dce9f9;
      background-image: -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9));
      background-image: -webkit-linear-gradient(to top, #ebf3fc, #dce9f9);
      background-image:    -moz-linear-gradient(to top, #ebf3fc, #dce9f9);
      background-image:     -ms-linear-gradient(to top, #ebf3fc, #dce9f9);
      background-image:      -o-linear-gradient(to top, #ebf3fc, #dce9f9);
      background-image:         linear-gradient(to top, #ebf3fc, #dce9f9);
      /*-webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;
      -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;
      box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;*/
      border-top: none;
      text-shadow: 0 1px 0 rgba(255,255,255,.5);
      padding: 5px;
  }

  table td:first-child, table th:first-child {
      border-left: none;
  }

  table th:first-child {
      -moz-border-radius: 6px 0 0 0;
      -webkit-border-radius: 6px 0 0 0;
      border-radius: 6px 0 0 0;
  }
  table th:last-child {
      -moz-border-radius: 0 6px 0 0;
      -webkit-border-radius: 0 6px 0 0;
      border-radius: 0 6px 0 0;
  }
  table th:only-child{
      -moz-border-radius: 6px 6px 0 0;
      -webkit-border-radius: 6px 6px 0 0;
      border-radius: 6px 6px 0 0;
  }
  table tr:last-child td:first-child {
      -moz-border-radius: 0 0 0 6px;
      -webkit-border-radius: 0 0 0 6px;
      border-radius: 0 0 0 6px;
  }
  table tr:last-child td:last-child {
      -moz-border-radius: 0 0 6px 0;
      -webkit-border-radius: 0 0 6px 0;
      border-radius: 0 0 6px 0;
  }
  img{width: 100%;}
  .highlight-wrapper{padding: 0 !important;}

  .hljs {
    color: #a9b7c6 !important;
    background: #282b2e !important;
    display: block !important;
    overflow-x: auto !important;
    padding: 0.5em !important;
}

.hljs-number,
.hljs-literal,
.hljs-symbol,
.hljs-bullet {
    color: #6897BB !important;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-deletion {
    color: #b854d4 !important;
}

.hljs-variable,
.hljs-template-variable,
.hljs-link {
    color: #629755 !important;
}
.hljs-selector-pseudo{
    color: #b854d4 !important;
}
.hljs-comment,
.hljs-quote {
    color: #8e908c !important;
}
.hljs-params{
    color: #b65611 !important;
}
.hljs-meta {
    color: #bbb529 !important;
}
.hljs-regexp{
    color: #d73737 !important;
}
.hljs-string,
.hljs-attribute,
.hljs-addition {
    color: #e2777a !important ;
}

.hljs-section,
.hljs-title,
.hljs-type {
    color: #6684e1 !important;
}

.hljs-name,
.hljs-selector-id,
.hljs-selector-class {
    color: #0dabdd!important;
}

.hljs-emphasis {
    font-style: italic !important;
}

.hljs-strong {
    font-weight: bold !important;
}
.language-javascript{
    color: #0dabdd !important;
}
.hljs-attr{
    color: #b854d4!important;
}
.language-html{
    color: #0dabdd !important;
}
.demo-block{
    padding: 32px;
    border: 1px solid #e2ecf4;
    border-radius: 4px 4px 0 0;
    background-color: #fff;
    margin-top: 16px;
    // display: flex;
    // flex-wrap: wrap;
    margin-bottom: 10px;
    min-height: 100px;
}
.side-nav-title{
    // padding: 0 24px 8px;
    color: #8dabc4;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-indent: 10px;
}
.fcw-uplaodDemo{width: 200px; height: 100px;}
.code_flex{display: flex; flex-wrap: wrap; min-height: 80px;}
</style>

