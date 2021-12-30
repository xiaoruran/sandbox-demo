const fs = require('fs');
const path = require('path');

// 获取文件名
function getFileName(fileName) {
  let temp = fileName.split('.');
  if (temp.length < 2) {
    return fileName;
  }
  return temp[temp.length - 2];
}


// 读文件(采用回调进行)
function readFile(filepath, func) {
  // let absolute_path = path.join(dirname, pathName);
  // console.log(__dirname);
  fs.readFile(filepath, (err, data) => {
    if (err) {
      console.error("文件读取失败", err);
      func({
        success: true,
        data: '',
      });
    } else {
      // 此时的data是buffer形式
      // console.log(data);
      func({
        success: true,
        data: data.toString()
      });
    }
  });
}

module.exports = {
  readFile
}

