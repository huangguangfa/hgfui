<template>
    <div class="imgview">
        <!-- 显示图片 -->
        <img 
            v-show="imgUrl"
            :src="imgUrl"
            @error="handleImgError"
            @click.stop="addMousewheel"
            class="imgview_img" alt="图片加载失败"/>
        <i v-show="!imgUrl" 
            @click.stop="addMousewheel"
            class="iconfont gf-tupian imgview_img"></i>

        <transition name="slide-fade">
            <div class="imageViewer" v-show="imageViewer">
                <!-- 多张图片 -->
                <div class="img_content" v-if="imgList.length">
                    <img
                        :class="switchClass"
                        v-for="(item,index) in imgList"
                        :src="item.url"
                        :key="index"
                        v-show="imgItem === index"
                        @error="handleImgError"
                        @mousedown="move"
                        :style="imgItem === index?`transform:scale(${zoom}) rotate(${spin * 90}deg);`:''"
                        alt="图片加载失败" 
                        />
                </div>
                <!-- 单张 -->
                <div class="img_content" v-else>
                    <img :src="imgUrl" 
                        @error="handleImgError"
                        @mousedown="move"
                        :style="`transform:scale(${zoom}) rotate(${spin * 90}deg);`"
                        alt="图片加载失败">
                </div>
                <!-- 操作按钮  -->
                <div class="viewer-toolbar">
                    <div class="img-name">{{ imgList.length ? imgList[ imgItem ].name || '图片查看' : name }}</div>
                    <ul>
                        <li class="iconfont gf-jia" @click="Zoomfn('add')"></li>
                        <li class="iconfont gf-jian" @click="Zoomfn"></li>
                        <li class="iconfont gf-zuoxuanzhuan" @click="spinfun(0)"></li>
                        <li class="iconfont gf-youxuanzhuan" @click="spinfun"></li>
                        <li class="iconfont gf-zhongzhi-copy" @click="reset"></li>
                        <li class="iconfont gf-cuo" @click="cancelMousewheel"></li>
                    </ul>
                </div>
                <!-- 关闭 -->
                <div id="viewer-button">
                    <i class="iconfont gf-cuo" @click="cancelMousewheel"></i>
                </div>
                <!-- 切换 -->
                <div class="switchImg" v-show="ismultiple">
                    <i class="iconfont gf-zuojiantou" @click="Imgswitch('left')"></i>
                    <i class="iconfont gf-youjiantou" @click="Imgswitch"></i>
                </div>
                <!-- 缩略图 -->
                <div class="Thumbnail">
                    <img
                        v-for="(item,index) in imgList"
                        :class="{
                            'selectedImg':imgItem === index
                        }"
                        @click="selecteFn(index)"
                        :src="item.url"
                        :key="index"
                        alt="图片加载失败" 
                        />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name:'fcw-imageViewer',
    props:{
        //显示图片名称
        name:{
            type:String,
            default:'图片查看'
        },
        //是否展示多张
        ismultiple:{
            type:Boolean,
            default:false
        },
        //图片list
        imgList:{
            type:Array,
            default(){
                return []
            }
        },
        //当单图片url
        imgUrl:{
            type:String,
            default:''
        }
    },
    data(){
        return{
            imageViewer:false, //大图显示
            $_mousewheel:null,
            zoom:1,
            spin:0,
            imgItem:0,
            switchClass:'popInLeft',
        }

    },
    methods:{
        handleImgError(e) {
            this.imgUrl = ''
        },
        //缩略图事件
        selecteFn(index){
            this.imgItem = index;
        },
        //切换
        Imgswitch(item){
            this.reset();
            if(item === 'left'){
                this.switchClass = 'popInLeft'
                if(this.imgItem === 0){
                    this.imgItem = this.imgList.length -1;
                    return false;
                }
                this.imgItem -= 1;
            }else{
                this.switchClass = 'popInRight'
                if(this.imgItem === this.imgList.length -1){
                    this.imgItem = 0;
                    return false;
                }
                this.imgItem += 1;
            }
        },
        reset(){
            this.zoom = 1;
            this.spin = 0;
        },
        spinfun(i){
            i === 0?this.spin += 1:this.spin -= 1;
        },
        //放大缩小
        Zoomfn(item){
            if(item === 'add'){
                this.zoom += 0.1;
            }else{
                if(this.zoom <= 1){return false};
                this.zoom -= 0.1;
            }
        },
        move(e){
            let odiv = e.target; //元素
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;    
                let top = e.clientY - disY;
                //移动当前元素
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },   
        //判断滚动方向
        handleScroll(e){
            let direction = e.deltaY > 0 ? 'down' : 'up';
            if(direction === 'up'){
                this.addZoom();
            }else{
                this.cutZoom();
            }
        },
        //函数防抖
        debounce(func, wait) {
            let timeout;
            return function () {
                let context = this;
                let args = arguments;
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(context, args)
                }, wait);
            }
        },
        //解除鼠标滚动事件
        cancelMousewheel(){
            this.imageViewer = false;
            this.$_mousewheel && this.$_mousewheel.removeEventListener('mousewheel',this.debounce) ||
            this.$_mousewheel && this.$_mousewheel.removeEventListener('DOMMouseScroll',this.debounce) 
        },
        //监听鼠标滚动事件
        addMousewheel(){
            this.imgItem = 0;
            this.zoom=1;
            this.spin=0;
            this.imageViewer = true;
            this.$_mousewheel = document.getElementsByClassName('imageViewer')[0];
            this.$_mousewheel && this.$_mousewheel.addEventListener('mousewheel', this.debounce(this.handleScroll,50), true) || 
            this.$_mousewheel.addEventListener("DOMMouseScroll",this.debounce(this.handleScroll,50),false)
        }
    },
}
</script>

<style scoped lang="less">
    .Thumbnail{
        position: absolute;
        left:10px;
        top: 20px;
        img{width: 50px; height: 50px;margin: 0 4px;  border: 2px solid transparent;  border-radius: 5px; cursor: pointer;}
        .selectedImg{
            border-color: #87CEFA;
        }
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }
    .imgview_img{
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .switchImg{
        width: 100%;
        >.iconfont{
            font-size: 16px;
            color: #fff;
            font-weight: 600;
            background-color: rgba(0,0,0,.5);
            border-radius: 50%;
            cursor: pointer;
            height: 30px;
            overflow: hidden;
            width: 30px;
            line-height: 30px;
            text-align: center;
            display: block;
            position: absolute;
            top: 50%;
            margin-top: -12px;
        }
        .gf-zuojiantou{left:40px;}
        .gf-youjiantou{right: 40px;}
    }
    #viewer-button{
        background-color: rgba(0,0,0,.5);
        border-radius: 50%;
        cursor: pointer;
        height: 80px;
        overflow: hidden;
        position: fixed;
        right: -40px;
        top: -40px;
        -webkit-transition: background-color .15s;
        transition: background-color .15s;
        width: 80px;
        &:hover{background-color: rgba(0,0,0,.8);}
        >.iconfont{
            position: absolute;
            font-size: 20px;
            right: 45px;
            top: 45px;
            font-weight: 600;
            color: #fff;
        }
    }
    .viewer-toolbar{
        bottom: 0;
        left: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        text-align: center;
        .img-name{
            color: #ccc;
            font-size: 12px;
            line-height: 2;
            margin: 0 5% 5px;
            max-width: 90%;
            opacity: .8;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: opacity .15s;
            white-space: nowrap;
        }
        ul{
            display: inline-block;
            margin: 0 auto 5px;
            overflow: hidden;
            padding: 3px 0;
            display: flex; justify-content: center;
            li{
                background-color: rgba(0,0,0,.5);
                border-radius: 50%;
                cursor: pointer;
                height: 24px;
                overflow: hidden;
                transition: background-color .15s;
                width: 24px;
                line-height: 24px;
                margin: 0 5px;
                &:hover{
                    background-color: rgba(0,0,0,.8);
                }
            }
            .iconfont{
                font-size: 16px;
                color: #fff;
                font-weight: 600;
            }
        }
    }
    .imageViewer{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.4);
        left:0px;
        top:0px;
        z-index: 2003;
        -moz-user-select:none; /* Firefox私有属性 */
        -webkit-user-select:none; /* WebKit内核私有属性 */
        -ms-user-select:none; /* IE私有属性(IE10及以后) */
        -khtml-user-select:none; /* KHTML内核私有属性 */
        -o-user-select:none; /* Opera私有属性 */
        user-select:none; /* CSS3属性 */
        .img_content{
            width: 580px;
            height: 347px;
            margin-left: -580px;
            margin-top: -400px;
            position: absolute;
            left: 50%;
            top: 50%;
            img{
                width: 100%; height: 100%; 
                cursor: pointer;
                object-fit: contain;
                object-position: center;
                -webkit-user-drag: none;
                position: absolute; 
                left: 50%; top: 50%;
                transform: rotate(0deg) scale(1, 1);
                transition: all .1s ease-out;
            }
        }
    }
    .imgview{margin: 0 3px; width: 100%; height: 100%;}
</style>