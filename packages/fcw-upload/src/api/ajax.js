function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export function upload(url,option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }
  const xhr = new XMLHttpRequest();
  const action = url;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  xhr.onerror =  function error(e) {
    option.onError(e);
  };

  // 初始化请求
  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  //发送请求
  xhr.send(option.Uparms);
    return new Promise( function(resolve,reject){
      xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
          reject(getError(action, option, xhr))
          // return option.onError(getError(action, option, xhr));
        }
        resolve(getBody(xhr))
        // option.onSuccess(getBody(xhr));
      };
  })
  // return xhr;
}
