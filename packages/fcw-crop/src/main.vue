<template>
    <div class="fcw-crop" :style="'width:' + width + 'px;height:' + height + 'px;'">
        <input type="file" accept="image/png, image/jpeg, image/jpg"  class="img-file" @change="handleFileChange" ref="inputer">
        <canvas id="crop-canvas" ref="canvas"></canvas>
        <div class="operating_btn"> 
            <div class="iconfont" 
                v-for="(item,index) in operatingList" 
                :class="item" 
                :key="index"
                @click="setPperating(index)">
            </div>
        </div>
    </div>
</template>

<script>
    import ImageCropping from './core'
    export default{
        name:'fcw-crop',
        props:{
            width:{
                type:Number,
                default:340
            },
            height:{
                type:Number,
                default:320
            }
        },
        data(){
            return {
                $_canvas:null,
                $_inputDOM:null,
                imgFile:null, //图片文件
                cropobj:null,
                operatingList:['gf-tupian','gf-jia','gf-jian','gf-zuoxuanzhuan','gf-youxuanzhuan']
            }
        },
        mounted(){
            this.$_inputDOM = this.$refs.inputer;
            this.$_canvas = this.$refs.canvas;
        },
        methods:{
            setPperating(index){
                index === 0 && this.$refs.inputer.click(); //图片选择
                if(!this.cropobj) return false;
                index === 1 && this.cropobj.scale('enlarge');
                index === 2 && this.cropobj.scale('shrink');
                index === 3 && this.cropobj.rotate();
                index === 4 && this.cropobj.rotate();
            },
            async handleFileChange(){
                this.imgFile = this.$_inputDOM.files[0];
                let imgInfo = await this.getImgFileflow(this.imgFile);
                // if(this.cropobj){
                //     let { img,imgW,imgH } = imgInfo;
                //     console.log(imgInfo)
                //     return this.cropobj.replaceImg(img,imgW,imgH)
                // }
                this.cropobj = new ImageCropping({
                    canvas:this.$_canvas,
                    canvasW:this.width,
                    canvasH:this.height,
                    img:imgInfo
                })
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
    .fcw-crop{
        width: 100%;height: 100%;background: url('https://gf-blogs.oss-cn-shenzhen.aliyuncs.com/cropper.e3b9d3c3.png') no-repeat;background-size: 100% 100%;
        .img-file{display: none;}
        #crop-canvas{width: 100%;height: 100%;}
        .operating_btn{
            display: flex;margin-top:8px;
            .iconfont{ 
                display: flex;align-items: center;justify-content: center;font-size: 12px;
                margin: 0 3px;
                width: 44px;cursor: pointer;
                border-radius: 5px;
                line-height: 28px;
                height: 28px;
                color: #409eff;
                background: #ecf5ff;
                border: 1px solid #b3d8ff;
                &:hover{ background:#67c23a;color: #fff;}
             }
        }
    }
</style>