<template>
    <div class="upload" @dragover="enterAims" @dragleave="awayAims" :class="isDropAims === true?'Drop':''">
        <input type="file" :accept="fileType"  class="upload-file" @change="handleFileChange" ref="inputer">
        <div class="remind">
            <slot>
                <div class="remind_c">
                    <i class="iconfont gf-iconset0340"></i>
                    <span>{{isDrag === true?'将文件拖到此处，或点击上传':'点击上传'}}</span>
                </div>
            </slot>
        </div>
        <div class="circle" v-show="logding">
            <div class="circle_c">
                <fcw-circleview :percentage="percentage"></fcw-circleview>
            </div>
        </div>
    </div>
</template>

<script>
import{ upload }from './api/ajax';
import fcwcircleview from '../../fcw-circleview/src/main';
export default {
    name:'fcw-upload',
    props:{
        //上传文件类型
        fileType:{
            type:String,
            default:'image/png,image/jpg,image/jpeg'
        },
        //上传路径
        url:{
            type:String,
            default:'http://121.37.7.216:5000/oss/oss/storageObject'
        },
        //是否自动上传
        autoUpload:{
            type:Boolean,
            default:true
        },
        //是否支持拖拽
        isDrag:{
            type:Boolean,
            default:false
        },
        //上传文件字段名
        name:{
            type:String,
            default:'file'
        },
        //上传的额外参数
        data:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        //设置上传的请求头部
        headers:{
            type:Object,
            default:() =>{
                return {}
            }
        },
        //设置上传文件大小
        size:{
            type:Number,
            default:1000000
        },
        //是否需要压缩
        isCssions:{
            type:Boolean,
            default:false
        },
        //压缩后的图片质量最高1
        quality:{
            type:Number,
            default:0.8
        }
    },
    components:{
        fcwcircleview
    },  
    data(){
        return{
            $_inputDOM:null,
            //是否拖拽到上传位置
            isDropAims:false,
            //loading
            logding:false,
            //上传进度
            percentage:10,
           
        }   
    },
    mounted(){
        this.$_inputDOM = this.$refs.inputer;
        this.isDrag === true && this.addDropSupport();
    },
    methods: {
        onError(er){
            this.$emit('error',er)
        },
        async handleFileChange(){
            let file = this.isCssions &&  await this.compressions(this.$_inputDOM.files[0]) || this.$_inputDOM.files[0];
            let size = Math.floor(file.size / 1024);
            // if (file.type.indexOf('image') === -1) {return this.$message.error('请选择图片文件')};
            // 1TB等于1024GB；1GB等于1024MB；1MB等于1024KB；1KB等于1024Byte(字节);
            if (size > this.size) {return this.onError(`文件大小不能超过${this.size}k`);}
            this.$emit('previewfile',file);
            this.autoUpload === true && this.upload(file);
        },
        //单图上传
        async upload(file){
            this.logding = true;
            let fileformData = this.getFileParam(file);
            try {
                let result = await upload(this.url,fileformData);
                this.onsuccess(result);
            } catch (err) {
                this.onError(err)
            }
            this.$_inputDOM.value = null;
            this.logding = false;
            this.isDropAims = false;
        },
        //多图上传
        moreUpload(flieList){
            let isArr = flieList instanceof Array;
            if(isArr === true && flieList.length != 0){
                //组装上传参数array
                let fileformList = flieList.map( item =>{
                    return this.getFileParam(item)
                })
                //组装上传方法array
                let fileUploadFnList = fileformList.map( item =>{
                   return upload(this.url,item);
                })
                //发送多张上传
                Promise.all(fileUploadFnList).then( (result) => {
                    this.onsuccess(result);
                }).catch((error) => {
                    this.onError(err)
                })
            }else{
                this.onError('多图上传至少要保证有一个文件和上传参数为Array')
            }
        },
        //抛结果
        onsuccess(result){
            this.$emit('success',result);
        },
        //组装上传参数
        getFileParam(file){
            // 上传文件字段名称
            let uploadName = this.name;
            let formData = new FormData(); 
            formData.append(uploadName,file);
            if(this.data) {
                Object.keys(this.data).forEach(key => {
                    formData.append(key, this.data[key]);
                });
            }
            let option = {
                Uparms:formData,
                onError:this.onError,
                headers:this.headers,
                onProgress:this.progress
            }
            return option;
        },
        //上传进度
        progress(progress){
            let loaded = Number(progress.loaded);
            let total = Number(progress.total);
            this.percentage = Math.round((loaded/total) * 100);
        },
        Drop(e){
            //清除默认事件
            e.preventDefault();
            let fileList = e.dataTransfer.files; // 文件对象列表
            // 必须要有一个文件
            if (fileList.length === 0) {return this.$emit('Error','上传必须有一个文件')};
            //格式限制
            if (fileList[0].type.indexOf('image') === -1) {return this.$message.error('请选择图片文件')};
            // 限制下只能拖一个文件
            if (fileList.length > 1) {return this.$message.error('暂时不支持多文件')};
            this.$emit('preview',fileList[0]);
            this.autoUpload === this.upload(fileList[0]);
        },
        //压缩操作
        compressions(file){
            const name = file.name; //文件名
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise( (resolve,reject) =>{
                reader.onload = e => {
                    const src = e.target.result;
                    
                    const img = new Image();
                    img.src = src;
                    img.onload = e => {
                        const w = img.width;
                        const h = img.height;
                        const quality = this.quality;  // 默认图片质量为0.92
                        // 生成canvas
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        // 创建属性节点
                        const anw = document.createAttribute("width");
                        anw.nodeValue = w;
                        const anh = document.createAttribute("height");
                        anh.nodeValue = h;
                        canvas.setAttributeNode(anw);
                        canvas.setAttributeNode(anh);

                        // 铺底色 PNG转JPEG时透明区域会变黑色
                        ctx.fillStyle = "#fff";
                        ctx.fillRect(0, 0, w, h);

                        ctx.drawImage(img, 0, 0, w, h);
                        // quality值越小，所绘制出的图像越模糊
                        const base64 = canvas.toDataURL('image/jpeg', quality); // 图片格式jpeg或webp可以选0-1质量区间
                        // 返回base64转blob的值
                        console.log(`原图${(src.length/1024).toFixed(2)}kb`, `新图${(base64.length/1024).toFixed(2)}kb`);
                        // 去掉url的头，并转换为byte
                        const bytes = window.atob(base64.split(',')[1]);
                        // 处理异常,将ascii码小于0的转换为大于0
                        const ab = new ArrayBuffer(bytes.length);
                        const ia = new Uint8Array(ab);
                        for (let i = 0; i < bytes.length; i++) {
                            ia[i] = bytes.charCodeAt(i);
                        }
                        file = new Blob([ab], {type : 'image/jpeg'});
                        file.name = name;
                        resolve(file)
                        // success(file);
                    }
                    img.onerror = e => {
                        reject(e)
                    }
                }
            })
            reader.onerror = e => {
                this.$emit('Error',e);
            }
        },
        //监听拖拽事件
        addDropSupport(){
            this.$_inputDOM.addEventListener('drop',this.Drop);
        },
        //解除拖拽事件
        cancelDropSupport(){
            this.$_inputDOM && this.$_inputDOM.removeEventListener('drop',this.Drop);
        },
        enterAims(){
            this.isDropAims = true;
        },
        awayAims(){
            this.isDropAims = false;
        },
    },
    destroyed(){
        this.isDrag === true && this.cancelDropSupport();
    }
}
</script>
<style scoped lang="less">
    .upload{
        width: 100%; height: 100%;border: 1px dashed rgba(107,169,220,0.5);cursor: pointer;overflow: hidden; position: relative;box-sizing: border-box; 
        background: rgba(247,255,251,1);
        &:hover{border-color: #6BA9DC;}
        .upload-file{width: 100%; height: 100%; opacity: 0;cursor: pointer; position: relative;z-index: 6; font-size:0;}
        .circle{width: 100%; height: 100%; position: absolute; left: 0; top: 0; display: flex; z-index: 10;
         align-items: center; justify-content: center; background: #fff;
            .circle_c{width: 80%; height: 80%;}
         }
        .remind{
            width: 100%; height: 100%; position: absolute; left: 0; top: 0; display: flex; align-items: center; justify-content: center;
        }
    }
    .Drop{border: 3px dashed #6BA9DC; background:rgba(107,169,220,0.1);}
    .remind_c{
        .gf-iconset0340{color: #6BA9DC; font-size: 30px;width: 100%;display: flex; justify-content: center; margin-bottom: 10px;}
        span{color:rgba(107,169,221,1); text-align: center; display: block; font-size: 12px;}
    }
</style>