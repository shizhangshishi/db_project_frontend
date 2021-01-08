const downloadFile = function (paperID, originalFilename, vue) {
  vue.app.overlay = true;
  vue.$axios({
    method: 'get',
    url: '/conference/paper/download?id=' + paperID,
    responseType: 'blob'
  })
    .then(res => {
      if (res.status === 200) {
        download(res, originalFilename);
      }
    })
    .catch(error => {
      vue.app.message(error.message ? error.message :
        'get data fail, please check your network connection', 'error');
    })
    .finally(() => {
      vue.app.overlay = false;
    });
};

const download = function (res, originalFilename) {
  // 将二进制流转为blob
  const blob = new Blob([res.data], {type: 'application/octet-stream'});
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, originalFilename)
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob);
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', originalFilename);
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    // 挂载a标签
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL)
  }
};

export default downloadFile;
