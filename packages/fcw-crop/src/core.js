
export default function ImageCropping(option){
    let { canvas,canvasW,canvasH } = option;
    let { img,imgW,imgH } = option.img;
    this._canvas = canvas;
    this._img = img;
    this.imgWidth = imgW;
    this.imgHeight = imgH;
    this.ctx = null;
    this.generateImgCtx = null;//接收裁剪的图像canvas
    this.brightAreaRect = [];//高亮大小区域
    this.canvasWidth = canvasW; //canvas宽
    this.canvasHeight = canvasH; //canvas高
    this.lineDash = [5, 5]; // 虚线间隔宽度
    this.borderWidth = 2; // 边框宽度
    this.zoomPointArr = [0, 0, 1, 0, 2, 0, 2, 1, 2, 2, 1, 2, 0, 2, 0, 1]; // 8个拖拽点坐标
    this.resizeArr = ['nw-resize', 'n-resize', 'ne-resize', 'e-resize', 'se-resize', 's-resize', 'sw-resize', 'w-resize']; // 8个方向光标
    
    this.isMousemove = false; // 捕获绘制区域的方法或光标 值是true时捕获方法，是false时捕获光标
    this.isMouseover = false; //是否悬浮
    this.isThrottle = false; // 是否开启帧循环
    this.isCapture = false;  //是否继续往下捕获绘制区域在同一个点上的方法

    this.offsetX = null; //鼠标的x轴
    this.offsetY = null; //鼠标的y轴
    this.method = null; // 重置已捕获得到的方法

    this.scaleValue = 1;//放大缩小值

    this.cursorValue = { old: 'auto', new: 'auto' }; // 记录新旧光标值
    this.coordinatePoint = [];

    this.imgBase = {
        imgX:null,
        imgY:null,
        imgWsize:null,
        imgHsize:null
    }
    this.init(canvasW,canvasH);
}

ImageCropping.prototype = {
    constructor:ImageCropping,
    init(canvasW,canvasH){
        this.fitSize(canvasW,canvasH)
        this.ctx = this._canvas.getContext('2d');
        //鼠标移入到canvas画布
        this._canvas.onmouseenter = function () {
            this.isMouseover = true;
            this.isThrottle = true; // 开启帧循环
            this.throttle(); // 运行帧循环
        }.bind(this);

        //鼠标移出事件
        this._canvas.onmouseout = function(){
            this.isMousemove = false;
            this.isCapture = false;
            this.isThrottle = false;
            this.method = null;
        }.bind(this)

        //鼠标按下事件
        this._canvas.onmousedown = function (e) {
            this.method = null; // 重置已捕获得到的方法
            this.isCapture = true; // 是否继续往下捕获绘制区域在同一个点上的方法
            this.isMousemove = true;
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            if (this.isThrottle) return this.draw();
            this.isThrottle = true;
            this.throttle(this.isThrottle);
        }.bind(this);

        //鼠标移动事件
        this._canvas.onmousemove = function (e) {
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            if (this.isMousemove) {
                this.isCapture && (this.isCapture = !this.isCapture);
            } else {
                this.cursorValue.new = 'auto'; // 初始化坐标值
            }
        }.bind(this);

        //拖动裁剪点放下事件
        this._canvas.onmouseleave = this._canvas.onmouseup = function (e) {
            console.log('放下',e)
            this.isMousemove = false;
            this.isCapture = false;
            this.method = null;
            // 当高亮区域反转时宽高是负数，所以重新校正位置和大小
            this.regionalCorrection();
        }.bind(this);
        //初始化绘制图片比例大小
        this.imgBase = this.getImgDrawProportion();
        //初始化绘制
        this.draw();
    },
    //绘制
    draw(){
        //在给定的矩形内清除指定的像素
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        // 运行已捕获得到的方法(拖拽裁剪宽和拖拽点缩放)
        this.method && this.method.call(this, this.offsetX, this.offsetY);
        //比例调设置绘制图片比例
        let { imgX,imgY,imgWsize,imgHsize } = this.imgBase;
        this.ctx.drawImage(this._img,imgX,imgY,imgWsize,imgHsize);
        // 绘制蒙层
        this.masking(); 
        // 绘制高亮区域
        this.brightArea(); 
        // 绘制网格
        this.gridding();
        // 绘制边框
        this.border(); 
        // 绘制拖拽缩放点
        this.zoomPoint(); 
        // 记录上一个位置
        this.recordPoint(); 
        // 更新光标变拖动标志
        if (!this.isMousemove) this.setCursor(); 
    },
    //计算canvas大小和初始化高亮区域的位置和大小
    fitSize(witch,height){
        this._canvas.width = witch;
        this._canvas.height = height;
        // 初始化高亮区域的位置和大小
        this.brightAreaRect = [
            //数组第一个参数是XY轴的位置、第二个是高亮矩形大小
            [(this.canvasWidth - this.canvasWidth / 3) / 2, this.canvasWidth / 3],  
            [(this.canvasHeight - this.canvasWidth / 3) / 2, this.canvasWidth / 3],
        ];
    },
    masking(){
        this.ctx.save();
        this.ctx.beginPath();
        //调节透明度
        this.ctx.globalAlpha = 0.5;
        //设置背景颜色
        this.ctx.fillStyle = '#000000';
        //绘制矩形铺满canvas
        this.ctx.rect(0, 0, this.canvasWidth, this.canvasHeight);
        //填充
        this.ctx.fill();
        //关闭、回到起始点的路径
        this.ctx.closePath();
        //返回之前保存过的路径状态和属性
        this.ctx.restore();
    },
    brightArea(){
        this.ctx.save();
        //起始一条路径，或重置当前路径
        this.ctx.beginPath();
        //创建矩形
        this.ctx.rect(this.brightAreaRect[0][0], this.brightAreaRect[1][0], this.brightAreaRect[0][1], this.brightAreaRect[1][1]);
        //超过画布会被裁剪掉
        this.ctx.clip();
        //绘制裁剪原图
        let {imgX,imgY,imgWsize,imgHsize} = this.imgBase;
        this.ctx.drawImage(this._img,imgX,imgY,imgWsize,imgHsize);
        //关闭、回到起始点的路径
        this.ctx.closePath();
        //返回之前保存过的路径状态和属性
        this.ctx.restore();
        //进裁剪框
        if (this.ctx.isPointInPath(this.offsetX, this.offsetY)) {
            //移动事件
            this.isCapture && (this.method = this.translationFn);
            !this.isMousemove && (this.cursorValue.new = 'move');
        }
    },
    gridding(){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#fff';
        //填充线时使用虚线模式
        this.ctx.setLineDash(this.lineDash);
        for (var i = 0, len = this.brightAreaRect.length; i < len; i++) {
            this.ctx.moveTo(this.brightAreaRect[0][0], this.brightAreaRect[1][0] + ((i + 1) * this.brightAreaRect[1][1]) / 3);
            this.ctx.lineTo(this.brightAreaRect[0][0] + this.brightAreaRect[0][1], this.brightAreaRect[1][0] + ((i + 1) * this.brightAreaRect[1][1]) / 3);
            this.ctx.stroke();

            this.ctx.moveTo(this.brightAreaRect[0][0] + ((i + 1) * this.brightAreaRect[0][1]) / 3, this.brightAreaRect[1][0]);
            this.ctx.lineTo(this.brightAreaRect[0][0] + ((i + 1) * this.brightAreaRect[0][1]) / 3, this.brightAreaRect[1][0] + this.brightAreaRect[1][1]);
            this.ctx.stroke();
        }
        this.ctx.closePath();
        this.ctx.restore();
    },
    border(){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#4166f5';
        this.ctx.lineWidth = this.borderWidth;
        this.ctx.rect(this.brightAreaRect[0][0], this.brightAreaRect[1][0], this.brightAreaRect[0][1], this.brightAreaRect[1][1]);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    },
    zoomMethod(num) {
        if (num === 0)
            return function (x, y) {
                this.brightAreaRect[0][1] -= x - this.brightAreaRect[0][0];
                this.brightAreaRect[0][0] = x;
                this.brightAreaRect[1][1] -= y - this.brightAreaRect[1][0];
                this.brightAreaRect[1][0] = y;
            };

        if (num === 1)
            return function (x, y) {
                this.brightAreaRect[1][1] -= y - this.brightAreaRect[1][0];
                this.brightAreaRect[1][0] = y;
            };

        if (num === 2)
            return function (x, y) {
                this.brightAreaRect[0][1] += x - this.coordinatePoint[0];
                this.brightAreaRect[1][1] -= y - this.brightAreaRect[1][0];
                this.brightAreaRect[1][0] = y;
            };
        if (num === 3)
            return function (x, y) {
                this.brightAreaRect[0][1] += x - this.coordinatePoint[0];
            };

        if (num === 4)
            return function (x, y) {
                this.brightAreaRect[0][1] += x - this.coordinatePoint[0];
                this.brightAreaRect[1][1] += y - this.coordinatePoint[1];
            };

        if (num === 5)
            return function (x, y) {
                this.brightAreaRect[1][1] += y - this.coordinatePoint[1];
            };

        if (num === 6)
            return function (x, y) {
                this.brightAreaRect[0][1] -= x - this.coordinatePoint[0];
                this.brightAreaRect[0][0] = x;
                this.brightAreaRect[1][1] += y - this.coordinatePoint[1];
            };

        if (num === 7)
            return function (x, y) {
                this.brightAreaRect[0][1] -= x - this.coordinatePoint[0];
                this.brightAreaRect[0][0] = x;
            };
    },
    zoomPoint(){
        let width = this.brightAreaRect[0][1] / 2;
        let height = this.brightAreaRect[1][1] / 2;
        for (var i = 0, len = this.zoomPointArr.length / 2; i < len; i++) {
            point.call(this, this.zoomPointArr[i * 2], this.zoomPointArr[i * 2 + 1], this.brightAreaRect[0][0], this.brightAreaRect[1][0], width, height, i);
        }
        function point(lx, ly, x, y, width, height, num) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#4166f5';
            this.ctx.fillStyle = '#fff';
            //画圆点
            this.ctx.arc(x + width * lx, y + height * ly, 4, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.closePath();

            if (this.ctx.isPointInPath(this.offsetX, this.offsetY)) {
                this.isCapture && (this.method = this.zoomMethod(num));
                !this.isMousemove && (this.cursorValue.new = this.resizeArr[num]);
            }
        }
    },
    //重新绘制
    replaceImg(img, maxWidth, maxHeight) {
        this._img = img;
        this.imgWidth = maxWidth;
        this.imgHeight = maxHeight;
        this.draw();
    },
    //获取裁剪区域图像
    clipping() {
        // 裁剪图片
        !this.generateImgCtx && (this.generateImgCtx = document.createElement('canvas').getContext('2d'));
        this.generateImgCtx.canvas.width = this.brightAreaRect[0][1];
        this.generateImgCtx.canvas.height = this.brightAreaRect[1][1];
        let { imgWsize,imgHsize } = this.imgBase;
        this.generateImgCtx.drawImage(this._img, -this.brightAreaRect[0][0], -this.brightAreaRect[1][0], imgWsize, imgHsize);
        return this.generateImgCtx.canvas.toDataURL();
    },
    throttle() {
        this.draw();
        //允许被拖动、重新渲染
        //window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
        if (this.isThrottle) window.requestAnimationFrame(this.throttle.bind(this)); //一直重复循环了
    },
    setCursor(){
        if (this.cursorValue.new !== this.cursorValue.old) {
            this._canvas.style.cursor = this.cursorValue.new;
            this.cursorValue.old = this.cursorValue.new;
        }
    },
    recordPoint(){
        this.coordinatePoint[0] = this.offsetX;
        this.coordinatePoint[1] = this.offsetY;
    },
    translationFn(x, y) {
        this.brightAreaRect[0][0] += x - this.coordinatePoint[0];
        this.brightAreaRect[1][0] += y - this.coordinatePoint[1];
    },
    regionalCorrection() {
        if (this.brightAreaRect[0][1] < 0) {
            this.brightAreaRect[0][0] = this.brightAreaRect[0][0] + this.brightAreaRect[0][1];
            this.brightAreaRect[0][1] = Math.abs(this.brightAreaRect[0][1]);
        }

        if (this.brightAreaRect[1][1] < 0) {
            this.brightAreaRect[1][0] = this.brightAreaRect[1][0] + this.brightAreaRect[1][1];
            this.brightAreaRect[1][1] = Math.abs(this.brightAreaRect[1][1]);
        }
    },
    getImgDrawProportion(){
        let scaleValue = this.scaleValue;
        let canMaxSize = this.canvasWidth > this.canvasHeight?this.canvasWidth:this.canvasHeight;
        let imgMaxSize = this.imgWidth > this.imgHeight?this.imgWidth:this.imgHeight;
        let proportion = imgMaxSize > canMaxSize && imgMaxSize / canMaxSize || 0;

        let imgWsize =  proportion && Math.round( (this.imgWidth / proportion) * scaleValue ) || Math.round(this.imgWidth * scaleValue) ;
        let imgHsize =  proportion && Math.round( (this.imgHeight / proportion) * scaleValue ) || Math.round(this.imgHeight * scaleValue);

        let imgX = imgWsize >= this.canvasWidth?0: parseInt((this.canvasWidth - imgWsize) / 2);
        let imgY = imgHsize >= this.canvasHeight?0:parseInt((this.canvasHeight - imgHsize) / 2);
        console.log( imgWsize,
            imgHsize)
        return {
            imgX,
            imgY,
            imgWsize,
            imgHsize
        }
    },
    //放大缩小
    scale(type){
        if(type === 'enlarge') this.scaleValue += 0.1;
        if(type === 'shrink') this.scaleValue -= 0.1;
        this.imgBase = this.getImgDrawProportion();
        this.draw()
    },
    rotate(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.translate(this.canvasWidth - 10, 0);
        this.ctx.rotate(90 * Math.PI / 180);
        this.draw()
    }
}


