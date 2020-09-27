<template>
  <div>
    <div class="cut_upload_div" :style="'width:'+width+'px;height:'+height+'px;'">
      <canvas id="cut_upload_canvas"></canvas>
    </div>
    <div class="cut_upload_btn_div">
        <span class="productBtn">
            上传图片
            <input class="uploadImgInput" type="file"/>
        </span>
        <span class="productBtn plus">
            +
        </span>
        <span class="productBtn reduce">
            -
        </span>
        <span @click="cutImg"> 裁剪 </span>
    </div>
  </div>
</template>

<script>
export default {
    name:'fcw-crop',
    props: {
        width: {
            default: 300
        },
        height: {
            default: 300
        },
        backgroundImg:{
            default: 'https://static.soyoung.com/pc/static/img/hospital/product/avatar.jpg'
        }
    },
    data() {
        return {
            can: {}, //画布 灵芝园
            con: {}, //画笔
            scale: 1, //缩放比例
            x: 0, //拖动x轴位置
            y: 0, //拖动y轴位置
            nx: 0, //历史拖动x轴位置记录
            ny: 0, //历史拖动y轴位置记录
            result: '', //历史图片
            imgW: 0, //图片宽
            imgH: 0 ,//图片高
        };
    },
    created() {
        let that = this;
        if (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0) {
            //firefox支持onmousewheel
            window.addEventListener('DOMMouseScroll', function(e) {
                var onmousewheel = e.target.getAttribute('onmousewheel');
                if (onmousewheel) {
                if (e.preventDefault) e.preventDefault();
                e.returnValue = false; //禁止页面滚动
                alert(typeof e.target.onmousewheel != 'function');
                if (typeof e.target.onmousewheel != 'function') {
                    //将onmousewheel转换成function
                    eval('window._tmpFun = function(event){' + onmousewheel + '}');
                    e.target.onmousewheel = window._tmpFun;
                    window._tmpFun = null;
                }
                // 不直接执行是因为若onmousewheel(e)运行时间较长的话，会导致锁定滚动失效，使用setTimeout可避免
                setTimeout(function() {
                    e.target.onmousewheel(e);
                }, 1);
                }
            }, false);
        }

        that.$nextTick( function() {
            that.can = document.getElementById('cut_upload_canvas'); //获取画布
            var div = document.querySelector('.cut_upload_div'); //获取切割div
            that.con = that.can.getContext('2d'); //获取画笔
            var img = new Image();
            if (that.result) { //如果有历史图片则加载
                if (that.result.indexOf('http') == 0) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', that.result, true);
                xhr.responseType = 'blob';
                xhr.onload = function(e) {
                    if (this.status == 200) {
                        var blob = this.response;
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            var imgData = e.target.result;
                            img.src = imgData;
                        };
                        reader.readAsDataURL(blob);
                    }
                };
                xhr.send();
                } else {
                    img.src = that.result;
                }
            } else {
                img.src = that.backgroundImg; //加载默认图片
            }
            img.crossOrigin = ''; //设置跨域
            img.onload = function() {
                that.can.width = that.width; //默认画布宽高为500
                that.can.height = that.height;
                var inX = 0; //没历史图片则初始位置为0
                var inY = 0;
                if (that.result) {
                    inX = 50; //有历史图片则初始位置为50
                    inY = 50;
                    that.can.width = img.naturalWidth; //设置画布大小为图片实际大小
                    that.can.height = img.naturalHeight;
                    that.imgW = img.naturalWidth; //记录图片实际大小
                    that.imgH = img.naturalHeight;
                    that.con.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight); //渲染图片到画布上
                    that.con.save(); //画笔存储
                    that.scale = 1; //初始缩放为1
                    that.nx = (that.width/2) - that.can.width / 2;
                    that.ny = (that.height/2) - that.can.height / 2;
                    that.can.style.transform = 'matrix(' + that.scale + ',0,0,' + that.scale + ',' + that.nx + ',' + that.ny + ')';
                    that.x = that.nx; //初始值记录到拖动值
                    that.y = that.ny;
                } else {
                    that.con.drawImage(img, inX, inY, img.naturalWidth, img.naturalHeight); //渲染图片
                    that.con.save(); //画笔存储
                }
            };
            var ox = 0;
            var oy = 0;
            that.can.onmousedown = function(e) {
                ox = e.pageX - that.nx; //获取图片x位置
                oy = e.pageY - that.ny; //获取图片y位置
                that.can.onmousemove = function(e) {
                    that.x = e.pageX - ox; //移动图片x位置
                    that.y = e.pageY - oy; //移动图片y位置
                    that.can.style.transform = 'matrix(' + that.scale + ',0,0,' + that.scale + ',' + that.x + ',' + that.y + ')';
                };
            };
            document.onmouseup = function() {
                that.nx = that.x; //记录最后图片x位置
                that.ny = that.y; //记录最后图片y位置
                that.can.onmousemove = null; //移除图片拖动
            };


            div.onmousewheel = function(e) {
                e.preventDefault();
                var delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) ||
                (e.detail && (e.detail > 0 ? -1 : 1)); //获取滚轮数据
                if (delta > 0) {
                    that.scale = that.scale * 1.03; //向下滚就放大
                } else if (delta < 0) {
                    that.scale = that.scale * 0.97; //向上滚就缩小
                }
                that.can.style.transform = 'matrix(' + that.scale + ',0,0,' + that.scale + ',' + that.x + ',' + that.y + ')';
            };

            if (navigator.userAgent.toLowerCase().indexOf('mozilla') == 0) {
                //firefox支持onmousewheel
                document.addEventListener('DOMMouseScroll', function(e) {
                if (e.target.id == that.can.id) {
                    var onmousewheel = div.onmousewheel;
                    if (onmousewheel) {
                    if (e.preventDefault) e.preventDefault();
                    e.returnValue = false; //禁止页面滚动
                    if (typeof div.onmousewheel != 'function') {
                        //将onmousewheel转换成function
                        eval('window._tmpFun = function(event){' + onmousewheel + '}');
                        div.onmousewheel = window._tmpFun;
                        window._tmpFun = null;
                    }
                    // 不直接执行是因为若onmousewheel(e)运行时间较长的话，会导致锁定滚动失效，使用setTimeout可避免
                    setTimeout(function() {
                        div.onmousewheel(e);
                    }, 1);
                    }
                }
                }, false);
            }

            document.querySelector('.plus').onclick = function() {
                that.scale = that.scale * 1.03; //图片放大按钮
                that.can.style.transform = 'matrix(' + that.scale + ',0,0,' + that.scale + ',' + that.x + ',' + that.y + ')';
            };
            document.querySelector('.reduce').onclick = function() {
                that.scale = that.scale * 0.97; //图片缩小按钮
                that.can.style.transform = 'matrix(' + that.scale + ',0,0,' + that.scale + ',' + that.x + ',' + that.y + ')';
            };

            var uploadInput = document.querySelector('.uploadImgInput'); //获取上传图片按钮dom
            uploadInput.onchange = function() {
                var file = uploadInput.files[0]; //获取上传的图片
                if (file) {
                    var fileReader = new FileReader(); //构建读取流
                    fileReader.onload = function(e) { //读取文件完成后
                        var imgData = e.target.result; //获取读取的base64
                        var img = new Image(); //创建图片
                        that.img = img;
                        img.src = imgData;
                        img.crossOrigin = ''; //设置跨域防止画布污染
                        img.onload = function() {
                            that.can.width = img.naturalWidth; //设置画布大小为图片实际大小
                            that.can.height = img.naturalHeight;
                            that.imgW = img.naturalWidth; //记录图片实际大小
                            that.imgH = img.naturalHeight;
                            that.con.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight); //渲染图片到画布上
                            that.con.save(); //画笔存储
                            that.scale = 1; //初始缩放为1
                            that.nx = (that.width/2) - that.can.width / 2;
                            that.ny = (that.height/2) - that.can.height / 2;
                            that.can.style.transform = 'matrix(' + that.scale + ',0,0,' + that.scale + ',' + that.nx + ',' + that.ny + ')';
                            that.x = that.nx; //初始值记录到拖动值
                            that.y = that.ny;
                        };
                    };
                    fileReader.readAsDataURL(file); //读取文件
                }
            };
        });

    },
    methods: {
        setImg(result) {    //设置历史图片
            var that = this;
            that.result = result;
        },
        cutImg(fn) { //截取图片
            let that = this;
            var imgW = (that.width-100) / that.scale;
            var imgH = (that.height-100) / that.scale;
            var nx = that.nx - ((that.width/2) - that.can.width / 2); //先取到图片初始中心点的x轴位置
            var ny = that.ny - ((that.height/2) - that.can.height / 2); //先取到图片初始中心点的y轴位置
            that.nx = (that.imgW - imgW) / 2 - (nx / that.scale); //计算截取的初始x点
            that.ny = (that.imgH - imgH) / 2 - (ny / that.scale); //计算截取的初始y点
            var pixels = that.con.getImageData(that.nx, that.ny, imgW, imgH); //获取区域内图片的像素值
            that.can.width = imgW; //根据比例重新构建画布大小
            that.can.height = imgH;
            that.con.putImageData(pixels, 0, 0); //将获取的区域像素放到画布上
            that.con.save(); //保存画笔状态
            var image = new Image(); //新建一张图片
            image.src = that.can.toDataURL('image/jpg'); //将画布内容导出
            image.crossOrigin = ''; //设置允许跨域
            image.onload = function() {
                that.can.width = that.width-100; //将画布大小设置为截取大小
                that.can.height = that.height-100;
                that.con.drawImage(image, 0, 0, that.width-100, that.height-100); //将截取内容按截取大小缩放或放大填充
                that.con.save(); //保存画笔状态
                that.scale = 1; //初始缩放为1
                that.nx = (that.width/2) - that.can.width / 2;
                that.ny = (that.height/2) - that.can.height / 2;
                that.can.style.transform = 'matrix(' + that.scale + ',0,0,' + that.scale + ',' + that.nx + ',' + that.ny + ')';
                that.x = that.nx; //初始值记录到拖动值
                that.y = that.ny;
                var tm = window.setTimeout(function() { //处理图片位移闪现
                    clearTimeout(tm);
                    //查询
                    // if (fn){fn(that.can.toDataURL('image/jpg'));} //将截取图片导出
                }, 100);
            };
        }
    }
    };
</script>

<style lang="less">
  .cut_upload_div {
    width: 500px;
    height: 500px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    box-shadow: 4px 4px 12px #B0B0B0;
    overflow: hidden;
    &::after {
      content: " ";
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      position: absolute;
      left: 0px;
      top: 0px;
      border: 50px rgba(0, 0, 0, 0.5) solid;
      margin: 0 auto;
      z-index: 5;
      pointer-events: none;
    }
  }

  #cut_upload_canvas {
    position: absolute;
    margin: 0px;
    cursor: -webkit-grab;
    z-index: 4;
  }

  .cut_upload_btn_div {
    width: 100%;
    height: 30px;
    line-height: 50px;
    text-align: center;
    margin-top: 10px;
    &>.productBtn {
      line-height: 14px;
      display: inline-block;
      color: #FFF;
      font-size: 14px;
      text-align: center;
      padding: 6px 16px;
      background-color: #59BBC4;
      border: none;
      outline: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      user-select: none;
      &:hover {
        background-color: #32B3BF;
      }
      &>input[type='file'] {
        width: 100%;
        height: 200%;
        background-color: #229DC3;
        position: absolute;
        top: -100%;
        left: 0px;
        cursor: pointer;
        opacity: 0;
      }
    }
  }
</style>
