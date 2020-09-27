<template>
    <div class="fcw-crop">
        <input type="file" accept="image/png, image/jpeg, image/jpg"  class="upload-file" @change="handleFileChange" ref="inputer">
        <canvas id="crop-canvas" ref="canvas"></canvas>
        <p @click="handleInputClick">
            上传图片
        </p>
        <ul class="fcw-ul">
            <li @click="scale"> + </li>
            <li> - </li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                $_canvas:null,
                $_canvasCtx:null, //画笔
                $_inputDOM:null,
                scaleNum:1,
                imgFile:null, //图片文件
            }
        },
        mounted(){
            this.$_inputDOM = this.$refs.inputer;
            this.$_canvas = this.$refs.canvas;
            this.$_canvasCtx = this.$_canvas.getContext('2d');
        },
        methods:{
            //放大缩小
            scale(){
                // this.scaleNum = 2;
                // let { imgFile, scaleNum } = this;
                this.drawImage(this.imgFile,2);
            },
            //替身input事件
            handleInputClick(){
                this.$refs.inputer.click() 
            },
            handleFileChange(){
                this.scaleNum = 1;
                this.imgFile = this.$_inputDOM.files[0];
                this.drawImage(this.imgFile,this.scaleNum);
            },
            //绘制
            async drawImage(file,scale){
                let { img,imgW ,imgH } = await this.getImgFileflow(file);
                this.$_canvasCtx.drawImage(img,0,0,imgW * scale,imgH * scale);
                this.$_canvasCtx.scale(scale,scale);
            },
            //获取文件流
            getImgFileflow(file){
                return new Promise( (resolove,reject) =>{
                    let fileReader = new FileReader(); //构建读取流
                    fileReader.onload = (e)=> { //读取文件完成后
                        let imgData = e.target.result; //获取读取的base64
                        let img = new Image(); //创建图片
                        img.src = imgData;
                        img.crossOrigin = ''; //允许设置跨域
                        img.onload = ()=> {
                            resolove({
                                img:img,//img
                                imgW:img.naturalWidth, //img width
                                imgH:img.naturalHeight, //img height
                            })
                        };
                    };
                    fileReader.readAsDataURL(file); //读取文件
                })
            },
            
        }
    }
</script>

<style lang="less" scoped>
    #crop-canvas{width: 400px;height: 260px;background: yellow;}
    .upload-file{ display: none; }
    .fcw-ul{
        display: flex;
        li{
            width: 20px;height: 20px;background: orange;margin: 0 10px;cursor: pointer;
        }
    }
</style>