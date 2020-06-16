<template>
    <div class="upload"  :class="isDropAims === true?'Drop':''" ref="circle">
        <input type="file" :accept="fileType"  class="upload-file" @change="handleFileChange" ref="inputer">
        <div class="remind"
            ref="input_substitute"
            @drop.prevent="onDrop"
            @dragover.prevent="isDropAims = true;"
            @dragleave.prevent="isDropAims = false"
            @click="handleInputClick">
            <slot>
                <div class="remind_c">
                    <i class="iconfont gf-iconset0340"></i>
                    <span>{{isDrag === true?'将文件拖到此处，或点击上传':'点击上传'}}</span>
                </div>
            </slot>
        </div>
        <div class="circle"  v-show="logding">
            <div class="circle_c" >
                <fcw-circleview :width="circleWidth" :percentage="percentage" ></fcw-circleview>
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
            default:'http://192.168.1.117:5000/oss/oss/storageObject'
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
        },
        //最大允许上传个数	
        limit:{
            type:Number
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
            percentage:0,
            circleWidth:100
        }   
    },
    mounted(){
        this.$_inputDOM = this.$refs.inputer;
        let offsetWidth = this.$refs.circle.offsetWidth;
        let offsetHeight = this.$refs.circle.offsetHeight;
        this.circleWidth = (offsetWidth > offsetHeight ? offsetHeight:offsetWidth) - 20;
    },
    methods: {
        //替身input事件
        handleInputClick(){
            this.$refs.inputer.click() 
        },
        onError(er){
            this.$emit('error',er)
        },
        async handleFileChange(){
            let file = this.isCssions &&  await this.compressions(this.$_inputDOM.files[0]) || this.$_inputDOM.files[0];
            let size = Math.floor(file.size / 1024);
            // if (file.type.indexOf(this.fileType) === -1) {return this.$message.error(`请选择${this.fileType}后缀文件`)};
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
            this.logding = true;
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
                Promise.all(fileUploadFnList).then( result => {
                    this.logding = false;
                    this.onsuccess(result);
                }).catch((error) => {
                    this.logding = false;
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
        //拖拽放下事件
        onDrop(e){
            this.isDropAims = false;
            if(this.isDrag === false){
                return false
            }
            //清除默认事件
            e.preventDefault();
            let fileList = [].slice.call(e.dataTransfer.files); // 文件对象列表
            // 必须要有一个文件
            if (fileList.length === 0) {return this.$emit('Error','上传必须有一个文件')};
            
            //格式校验
            if(this.checkFileType(fileList)){
                return this.$message({
                    type:'error',
                    message:this.checkFileType(fileList),
                })
            }
            this.$emit('preview',fileList);
            this.autoUpload === this.moreUpload(fileList);
        },
        //校验限制
        checkFileType(file){
            let typeErr = false;
            //类型
            file.forEach( file =>{
                let Filetype = file.type;
                if(this.fileType.indexOf(Filetype) === -1){
                    this.typeErr = true;
                }
            })
            if(this.typeErr) return `文件格式必须以${this.fileType}格式`;
            //个数
            if(this.limit && this.limit < file.length) return `文件不能超过${this.limit}个`;
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
                        // console.log(`原图${(src.length/1024).toFixed(2)}kb`, `新图${(base64.length/1024).toFixed(2)}kb`);
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
        getCircleWidth(){
            if(this.$refs.circle.offsetHeight > this.$refs.circle.offsetWidth){
                return this.$refs.circle.offsetWidth
            }else{
                return this.$refs.circle.offsetHeight
            }
        }
    }
}
</script>
<style scoped lang="less">
    .upload{
        width: 100%; height: 100%;border: 1px dashed rgba(107,169,220,0.5);cursor: pointer;overflow: hidden; position: relative;box-sizing: border-box; 
        background: rgba(247,255,251,1);
        &:hover{border-color: #6BA9DC;}
        .upload-file{width: 100%; height: 100%; opacity: 0;cursor: pointer; position: relative;display: none; font-size:0;}
        .circle{width: 100%; height: 100%; position: absolute; left: 0; top: 0; display: flex; z-index: 10;
         align-items: center; justify-content: center; background: #fff;
            .circle_c{width: 80%; height: 80%;display: flex; justify-content: center; align-items: center;}
         }
        .remind{
            width: 100%; height: 100%; position: absolute; left: 0; top: 0; display: flex; align-items: center; justify-content: center;
        }
    }
    .remind_c{
        .gf-iconset0340{color: #6BA9DC; font-size: 30px;width: 100%;display: flex; justify-content: center; margin-bottom: 10px;}
        span{color:rgba(107,169,221,1); text-align: center; display: block; font-size: 12px;}
    }
    .Drop{border: 3px dashed #6BA9DC; background:rgba(107,169,220,0.1);}
</style>