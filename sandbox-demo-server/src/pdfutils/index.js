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
    console.log(ttf);
    this.doc.setFont(ttf, fontStyle);
    this.doc.setTextColor(color);
    this.doc.setFontSize(fontSize);
    this.doc.text(text, startWidth, startHeight);
  }
  // 设置多行文本
  setMultipleText(text, startWidth, startHeight, limitWidth, interval, fontSize = 20, offset = 0, fontStyle = 'normal', ttf = 'TencentSans') {
    // 获取文本长度
    let textLength = text.length;
    // 根据观察，字体大小px与页面大小px大概是4:3大小比例，通过这个比例和传进来的宽度限制，可以算出每行最多的文本数
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
  // 计算出字符串在页面上所占的长度，单位是px
  getWordsLength(word, wordSize) {
    return word.length * (wordSize * 3 / 4);
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