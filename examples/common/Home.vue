<template>
  <div  class="pg-index">
    <div class="index-container">
      <p>一款轻量级、模块化的前端 UI 组件库</p>
    </div>
    <div class="separate-panel">
      <div class="about">
        <router-link :to="{path:'/fcw-ui'}">开始使用</router-link>
        <a target="_blank" href="https://github.com/huanggungfa/hgfui" class="btn-github">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        
      }
    }
  }
</script>
<style type="text/less" lang="less">
  .pg-index {
      width: 100%; height: 100vh; overflow: hidden; 
      background: url('../assets/Coolcity.jpg') no-repeat;
    .index-container {
      width: 960px;
      margin: 0 auto;
      text-align: center;
      padding: 100px 0;
      p{
        margin-top: 56px;
        color: #fff;
        font-size: 32px;
      }
    }
    .separate-panel{
      position: relative;
      .about{
        position: absolute;
        width: 100%;
        height: 200px;
        z-index: 9;
        text-align: center;
        a {
          color: #fff;
          background-image: linear-gradient(90deg, #00AEFF 0%, #3369E7 100%);
          box-shadow: 0 2px 6px 0 rgba(51,105,231,0.4);
          display: inline-block;
          width: 190px;
          height: 56px;
          margin: 0 35px;
          font-size: 18px;
          line-height: 56px;
          border-radius: 28px;
          transition: all .3s;
          cursor: pointer;
        }
        .btn-github{
          color: #316DE9;
          border: 1px solid #2F6EE9;
          background: #fff;
          box-shadow: none;
        }
      }
    }
  }
</style>
