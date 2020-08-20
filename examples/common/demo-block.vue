<template>
  <div class="docs-demo-wrapper">
      <div :style="{height: isExpand ? 'auto' : '0'}" class="demo-container">
        <div span="14">
          <div class="docs-demo docs-demo--expand">
            <div class="highlight-wrapper">
              <slot name="highlight"></slot>
            </div>
          </div>
        </div>
      </div>
    <span class="docs-trans docs-demo__triangle" @click="toggle">{{isExpand ? '隐藏代码' : '显示代码'}}</span>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue'
  export default {
    data() {
      return {
        isExpand: false
      };
    },
    methods: {
      toggle() {
        this.isExpand = !this.isExpand;
      }
    }
  };
</script>

<style lang="less" type="text/less">
.language-html{
    position: relative;
    display: block;
    overflow-x: auto;
    color: #58727e;
    font-weight: 400;
    font-size: 13.4px;
    font-family: 'Source Code Pro', 'Monaco', 'Inconsolata', monospace;
    line-height: 26px;
    white-space: pre-wrap;
    word-wrap: break-word;
    -webkit-font-smoothing: auto;
}
  .demo-container {
    transition:  all .6s linear;
    overflow: hidden;
  }
  .docs-demo {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    font-size: 14px;
    background-color: #F7F7F7;
    border: 1px solid #e2ecf4;
    border-top: none;
    pre code {
      font-family: Consolas,Menlo,Courier,monospace;
      line-height: 22px;
      border: none;
    }
  }
  .docs-trans {
    width: 100%;
    text-align: center;
    display: inline-block;
    color: #C5D9E8;
    font-size: 12px;
    padding: 10px 0;
    background-color: #FAFBFC;
    cursor:pointer;
    &:hover{ color: #0dabdd;}
  }
  .docs-demo__code,
  .highlight-wrapper,
  .docs-demo__meta {
    padding: 0 20px;
    overflow-y: auto;
  }
  .docs-demo__code {
    border-bottom: 1px solid #eee;
  }
  .docs-demo.docs-demo--expand .docs-demo__meta {
    border-bottom: 1px dashed #e9e9e9;
  }
  .docs-demo.docs-demo--expand .docs-demo__triangle {
    transform: rotate(180deg);
  }
  .highlight-wrapper {
    display: none;
    p,
    pre {
      margin: 0;
    }
    .hljs {
      padding: 0;
      background-color: #fafafa;
      border-radius: 12px;
      box-shadow: 0 8px 12px #ebedf0;
    }
  }
  .docs-demo.docs-demo--expand .highlight-wrapper {
    display: block;
  }
  .docs-demo__code__mobi {
    height: 620px;
    margin: 20px 0;
  }
  .docs-demo__code__mobi__header {
    border-radius: 4px 4px 0 0;
    background: -webkit-linear-gradient(rgba(55,55,55,.98),#545456);
    background: linear-gradient(rgba(55,55,55,.98),#545456);
    text-align: center;
    padding: 8px;
    img {
      width: 100%;
    }
    .url-box {
      height: 28px;
      line-height: 28px;
      color: #fff;
      padding: 0 3px;
      background-color: #a2a2a2;
      margin: 10px auto 0;
      border-radius: 4px;
      white-space: nowrap;
      overflow-x: auto;
    }
  }
  .docs-demo__code__mobi__content {
    iframe {
      width: 100%;
      border: 0;
      height: 548px;
    }
  }
  .mar-left300{margin-left: 300px;}
</style>