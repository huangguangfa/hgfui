<template>
    <div class="qrcode">
        <canvas ref="qrcodecanvas"></canvas>
        <!-- <button @click="qrcodefn()">生成二维码</button> -->
    </div>
</template>

<script>
import qrcode from './code/index.esm';
import { dataURLtoFile } from '../../../utils/validate'
export default {
    name:'fcw-qrcode',
    props:{
        size:{
            type:Number,
            default:100
        },
        //是否要logo
        islogo:{
            type:Boolean,
            default:false
        },
        //logo配置 object
        // src
        // borderColor
        // bgColor
        // borderRadius
        // logoSize
        logo:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        //内容
        content:"",
        isimgDataFile:{
            type:Boolean,
            default:false
        },
        isimgDatabase:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        this.qrcodefn()
    },
    methods:{
        qrcodefn(){
            let canvas = this.$refs.qrcodecanvas;
            qrcode.toCanvas({
                canvas:canvas,
                content:JSON.stringify(this.content),
                width:this.size,
                logo:this.logo,
                islogo:this.islogo
            })
            //base64
            let src = canvas.toDataURL('image/png');
            this.isimgDatabase && this.$emit('imgDataBase',src)
            //转file
            let file = dataURLtoFile(src, `fcw-qrcode.png`);
            this.isimgDataFile && this.$emit('imgDataFile',file)
            
        }, 
    }
}
</script>

<style scoped>
    .qrcode{
        width: 100%; height: 100%;
    }
</style>