const fs = require('fs');
const { jsPDF } = require("jspdf");
const { pdfConfig } = require("../configs/index");
// 1 英寸= 25.4 毫米
// Default export is a4 paper, portrait, using millimeters for units
const CONFIG = require('../configs/index');

function getSuffix(url) {
  if (url === '') {
    return ''
  }
  let index = url.lastIndexOf('.');
  if (index === -1) {
    return '';
  }
  return url.substring(index + 1);
}

class PdfUtil {
  doc = new jsPDF(pdfConfig.pageConfig);
  constructor(pageConfig) {
    this.doc = new jsPDF(pageConfig);
  }

  // 添加字体库，默认是英文，不支持中文字体
  addTff() {
    // 添加字体库
    this.doc.addFont("public/ttf/TencentSans.ttf", "TencentSans", "bold");
    this.doc.addFont("public/ttf/TencentSans.ttf", "TencentSans", "normal");
  }

  // 添加图片
  setImg(url, startX, startY, width, height) {
    let allowSuffix = ['png', 'jpg'];
    // 读取背景图片
    let imgdatabac = fs.readFileSync(url);
    // 得到图片格式
    let suffix = getSuffix(url);
    if (allowSuffix.indexOf(suffix) === -1) {
      throw new Error('背景图片格式错误！！');
    }
    suffix = suffix === 'png' ? 'PNG' : 'JPEG';
    // 转base64编码
    let base64strbac = Buffer.from(imgdatabac, 'binary').toString('base64');
    // 在pdf上添加这个背景图片
    this.doc.addImage(base64strbac, suffix, startX, startY, width, height);
    return [startX + width, startY + height];
  }

  // 通过二进制流进行图片的添加
  setImgByBinary(imgdatabac, startX, startY, width, height, suffix = 'png') {
    let beginTime = new Date().getTime();

    // 转base64编码
    let base64strbac = Buffer.from(imgdatabac, 'binary').toString('base64');
    // 在pdf上添加这个背景图片
    this.doc.addImage(base64strbac, suffix, startX, startY, width, height);
    let endTime = new Date().getTime();
    console.log(`图片二进制流渲染到pdf文件中需要时间：${endTime-beginTime}ms`)
    return [startX + width, startY + height];
  }

  // 设置背景图片
  setBackgroundImg(url) {
    this.setImg(url, 0, 0, CONFIG.pdfConfig.width, CONFIG.pdfConfig.height);
  }

  // 设置右上角logo
  setLogo(url, logoWidth, logoHeight) {
    this.setImg(url, CONFIG.pdfConfig.width - logoWidth, 0, logoWidth, logoHeight)
  }
  // 设置文本
  setText(text, startWidth, startHeight, fontSize = 20, fontStyle = 'normal', ttf = 'TencentSans') {
    this.doc.setFont(ttf, fontStyle);
    this.doc.setFontSize(fontSize);
    this.doc.text(text, startWidth, startHeight);
  }
  // 设置文本
  setText1({ text = "", startWidth = 0, startHeight = 0, fontSize = 20, color = "black", fontStyle = "normal", ttf = "TencentSans" }) {
    this.doc.setFont(ttf, fontStyle);
    this.doc.setTextColor(color);
    this.doc.setFontSize(fontSize);
    this.doc.text(text, startWidth, startHeight);
    // 计算行高
    let lineHeight = Math.floor((fontSize * 3 / 4));
    return startHeight + lineHeight;
  }
  // 一行中有多种颜色格式，定义一个数组来进行定义
  setTextArr({ textArr = [], colorArr = [], startWidth = 0, startHeight = 0, fontSize = 20, fontStyle = 'normal', ttf = 'TencentSans' }) {
    let len = textArr.length;
    console.log(colorArr);
    let [startX, startY] = [startWidth, startHeight];
    let lineHeight = Math.floor((fontSize * 3 / 4));
    for (let i = 0; i < len; i++) {
      this.setText1({
        text: textArr[i],
        startWidth: startX,
        startHeight, startY,
        color: colorArr[i],
        fontSize,
        fontStyle,
        ttf,
      });
      startX += this.getWordsLength(textArr[i]);
    }
    return startHeight + lineHeight
  }
  // 设置多行文本
  setMultipleText(text, startWidth, startHeight, limitWidth, interval, fontSize = 20, offset = 0, fontStyle = 'normal', ttf = 'TencentSans') {
    // 获取文本长度
    let textLength = text.length;
    // 根据计算，字体大小px与页面大小px大概是4:3大小比例，通过这个比例和传进来的宽度限制，可以算出每行最多的文本数
    let maxLineLength = Math.floor((limitWidth * 4 / 3) / (fontSize));
    // 计算行高
    let lineHeight = Math.floor((fontSize * 3 / 4));

    console.log(`maxLineLength:${maxLineLength}`)
    //计算行数
    let lineCount = Math.ceil(textLength / maxLineLength);
    let index = 0;
    let to = 0;
    // 遍历写入数据
    for (let i = 0; i < lineCount; i++) {
      let sw = startWidth;
      if (i !== lineCount - 1) {
        to = index + maxLineLength
      } else {
        to = textLength;
      }
      if (i === 0) {
        sw = startWidth + offset;
        let offsetWordLength = Math.floor((offset * 4 / 3) / (fontSize));
        to = to - offsetWordLength;
      }
      console.log(index, to);
      // 通过substring将每行的数据确定下来，然后写入
      this.setText(text.substring(index, to), sw, startHeight, fontSize);
      startHeight = lineHeight + startHeight + interval;
      index = to;
    }
    return startHeight;
  }

  // 设置多行文本
  setMultipleText1({ text = "", startWidth = 0, startHeight = 0, limitWidth = 0, interval = 0, fontSize = 20, offset = 0, fontStyle = 'normal', ttf = 'TencentSans', color = "black" }) {
    // 获取文本长度
    let textLength = text.length;
    // 根据计算，字体大小px与页面大小px大概是4:3大小比例，通过这个比例和传进来的宽度限制，可以算出每行最多的文本数
    let maxLineLength = Math.floor((limitWidth * 4 / 3) / (fontSize));
    // 计算行高
    let lineHeight = Math.floor((fontSize * 3 / 4));

    console.log(`maxLineLength:${maxLineLength}`)
    //计算行数
    let lineCount = Math.ceil(textLength / maxLineLength);
    let index = 0;
    let to = 0;
    // 遍历写入数据
    for (let i = 0; i < lineCount; i++) {
      let sw = startWidth;
      if (i !== lineCount - 1) {
        to = index + maxLineLength
      } else {
        to = textLength;
      }
      if (i === 0) {
        sw = startWidth + offset;
        let offsetWordLength = Math.floor((offset * 4 / 3) / (fontSize));
        to = index + maxLineLength - offsetWordLength;
      }
      // console.log(index, to);
      // 通过substring将每行的数据确定下来，然后写入
      this.setText1({
        text: text.substring(index, to),
        startWidth: sw,
        startHeight,
        fontSize,
        color,
        fontStyle,
        ttf,
      })
      // this.setText(text.substring(index, to), sw, startHeight, fontSize);
      startHeight = lineHeight + startHeight + interval;
      index = to;
    }
    return startHeight;
  }

  /**
   * 计算出字符串在页面上所占的长度，单位是px
   * 普通汉字与页面px中的比例大概为3：4，
   * 普通的数字与英文字符与普通汉字比例大概为3:5
   *  
   * */
  getWordsLength(word = '', wordSize = 20) {
    if (word.length <= 0) return 0;
    // 找出所有的字母或者数字
    let reg = new RegExp(/([\d]|[a-zA-Z])/, 'g');
    let nonChinese = word.match(reg);
    let nonChineseLen = nonChinese === null ? 0 : nonChinese.length;
    return (word.length - nonChineseLen) * (wordSize * 3 / 4) + nonChineseLen * (wordSize * 9 / 20);
  }
  // 保存
  save(storagePath) {
    this.doc.save(storagePath);
  }

  getDoc() {
    return this.doc;
  }
}
module.exports = PdfUtil;