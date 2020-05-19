'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

let QRCode = _interopDefault(require('qrcode'));


let promisify = function promisify(f) {
  return function () {
    let args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
      args.push(function (err, result) {
        if (err) reject(err);else resolve(result);
      });
      f.apply(null, args);
    });
  };
};

function isFunction(o) {
  return typeof o === 'function';
}

function isString(o) {
  return typeof o === 'string';
}

let toCanvas = promisify(QRCode.toCanvas);

let renderQrCode = function renderQrCode(_ref) {
  let canvas = _ref.canvas,
      content = _ref.content,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 0 : _ref$width,
      _ref$nodeQrCodeOption = _ref.nodeQrCodeOptions,
      nodeQrCodeOptions = _ref$nodeQrCodeOption === undefined ? {} : _ref$nodeQrCodeOption;

  nodeQrCodeOptions.errorCorrectionLevel = getErrorCorrectionLevel(content);

  return getOriginWidth(content, nodeQrCodeOptions).then(function (_width) {
    nodeQrCodeOptions.scale = width === 0 ? undefined : width / _width * 4;
    return toCanvas(canvas, content, nodeQrCodeOptions);
  });
};

// 得到原QrCode的大小，以便缩放得到正确的QrCode大小
let getOriginWidth = function getOriginWidth(content, nodeQrCodeOption) {
  let _canvas = document.createElement('canvas');
  return toCanvas(_canvas, content, nodeQrCodeOption).then(function () {
    return _canvas.width;
  });
};

// 对于内容少的QrCode，增大容错率
let getErrorCorrectionLevel = function getErrorCorrectionLevel(content) {
  if (content.length > 36) {
    return 'M';
  } else if (content.length > 16) {
    return 'Q';
  } else {
    return 'H';
  }
};

/**
 *
 * helpers
 * change logs:
 * 2018/2/28 herbluo created
 */
let drawLogo = function drawLogo(_ref) {
  let canvas = _ref.canvas,
      content = _ref.content,
      logo = _ref.logo;

  if (!logo) {
    return;
  }

  let canvasWidth = canvas.width;
  let _logo$logoSize = logo.logoSize,
      logoSize = _logo$logoSize === undefined ? 0.15 : _logo$logoSize,
      borderColor = logo.borderColor,
      _logo$bgColor = logo.bgColor,
      bgColor = _logo$bgColor === undefined ? borderColor || '#ffffff' : _logo$bgColor,
      _logo$borderSize = logo.borderSize,
      borderSize = _logo$borderSize === undefined ? 0.05 : _logo$borderSize,
      crossOrigin = logo.crossOrigin,
      _logo$borderRadius = logo.borderRadius,
      borderRadius = _logo$borderRadius === undefined ? 8 : _logo$borderRadius,
      _logo$logoRadius = logo.logoRadius,
      logoRadius = _logo$logoRadius === undefined ? 0 : _logo$logoRadius;

  let logoSrc = typeof logo === 'string' ? logo : logo.src;
  let logoWidth = canvasWidth * logoSize;
  let logoXY = canvasWidth * (1 - logoSize) / 2;
  let logoBgWidth = canvasWidth * (logoSize + borderSize);
  let logoBgXY = canvasWidth * (1 - logoSize - borderSize) / 2;

  let ctx = canvas.getContext('2d');

  // logo 底色
  canvasRoundRect(ctx)(logoBgXY, logoBgXY, logoBgWidth, logoBgWidth, borderRadius);
  ctx.fillStyle = bgColor;
  ctx.fill();

  // logo
  let image = new Image();
  if (crossOrigin || logoRadius) {
    image.setAttribute('crossOrigin', crossOrigin || 'anonymous');
  }
  image.src = logoSrc;

  // 使用image绘制可以避免某些跨域情况
  let drawLogoWithImage = function drawLogoWithImage(image) {
    ctx.drawImage(image, logoXY, logoXY, logoWidth, logoWidth);
  };

  // 使用canvas绘制以获得更多的功能
  let drawLogoWithCanvas = function drawLogoWithCanvas(image) {
    let canvasImage = document.createElement('canvas');
    canvasImage.width = logoXY + logoWidth;
    canvasImage.height = logoXY + logoWidth;
    canvasImage.getContext('2d').drawImage(image, logoXY, logoXY, logoWidth, logoWidth);

    canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius);
    ctx.fillStyle = ctx.createPattern(canvasImage, 'no-repeat');
    ctx.fill();
  };

  // 将 logo绘制到 canvas上
  return new Promise(function (resolve, reject) {
    image.onload = function () {
      logoRadius ? drawLogoWithCanvas(image) : drawLogoWithImage(image);
      resolve();
    };
  });
};

// copy来的方法，用于绘制圆角
let canvasRoundRect = function canvasRoundRect(ctx) {
  return function (x, y, w, h, r) {
    let minSize = Math.min(w, h);
    if (r > minSize / 2) {
      r = minSize / 2;
    }
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    return ctx;
  };
};

let toCanvas$1 = function toCanvas(options) {
  return renderQrCode(options).then(function () {
    return options;
  }).then(drawLogo);
};

let toImage = function toImage(options) {
  let canvas = document.createElement('canvas');
  options.canvas = canvas;
  if (options.logo) {
    if (isString(options.logo)) {
      options.logo = { src: options.logo };
    }
    options.logo.crossOrigin = 'Anonymous';
  }
  return toCanvas$1(options).then(function () {
    let _options$image = options.image,
        image = _options$image === undefined ? new Image() : _options$image,
        _options$downloadName = options.downloadName,
        downloadName = _options$downloadName === undefined ? 'qr-code' : _options$downloadName;
    let download = options.download;


    image.src = canvas.toDataURL();

    if (download !== true && !isFunction(download)) {
      return;
    }
    download = download === true ? function (start) {
      return start();
    } : download;

    let startDownload = function startDownload() {
      saveImage(image, downloadName);
    };
    download(startDownload);
  });
};

let saveImage = function saveImage(image, name) {
  let dataURL = image.src;

  let link = document.createElement("a");
  link.download = name;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 对 QRCode 的再封装
 * qrCode
 * change logs:
 * 2018/1/24 herbluo created
 */

let QrCodeWithLogo = {
  toCanvas: toCanvas$1,
  toImage: toImage
};

/**
 *
 * index
 * change logs:
 * 2018/2/28 herbluo created
 */

exports.default = QrCodeWithLogo;
