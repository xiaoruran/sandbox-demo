const pdf = require('pdf-creator-node');
const fs = require('fs');
const { dirname } = require('path');
const labelmake = require('labelmake');
const { jsPDF } = require("jspdf");
const PdfUtil = require('../pdfutils/index');
const Config = require('../configs/index');
const Chart = require('./chartservice.js');
const { merge } = require('../utils/mergeFile');
// 引入jspdf-autotab
const { applyPlugin } = require('jspdf-autotable');

applyPlugin(jsPDF)
// const autoTable = require('jspdf-autotable');

// 1 英寸= 25.4 毫米
// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF({
  orientation: "landscape",
  unit: "mm",
  format: [300, 400] // 高、宽设置
});
const lineHeight = Math.floor((20 * 3 / 4));



// 添加字体库
doc.addFont("public/ttf/TencentSans.ttf", "TencentSans", "bold");
doc.addFont("public/ttf/TencentSans.ttf", "TencentSans", "normal");

console.log(__dirname);
let html = fs.readFileSync('./src/template/template.html', 'utf8');

const options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Author: hancao</div>'
  },
  footer: {
    height: "30mm",
    contents: {
      first: 'Cover page',
      2: 'Second page', // Any page number is working. 1-based index
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: 'Last Page'
    }
  }
};

let data = {
  "users": [
    {
      "name": "Shyam",
      "age": "26",
      "location": "北京中关村",
      "number": "123456"
    },
    {
      "name": "Navjot",
      "age": "26",
      "location": "上海普陀区",
      "number": "12345612"
    },
    {
      "name": "Vitthal",
      "age": "26",
      "location": "上海长宁",
      "number": "123456123"
    }
  ],
  "header": "这是一个头部"
}

// 配置数据
let document = {
  html: html,
  data: {
  },
  path: `public/pdf/output.pdf`,
  type: "",
};


const template = {
  basePdf: { width: 210, height: 297 },
  schemas: [
    {
      facePhoto: {
        type: "image",
        position: { x: 33, y: 10 },
        width: 100,
        height: 100
      },
    }
  ]
};


class PdfCreator {
  create(data) {
    console.log(typeof data);
    document.data = { ...data };
    return new Promise((resolve, reject) => {
      pdf.create(document, options).then(() => {
        resolve({ status: 0, msg: 'success', data: { src: `output.pdf` } });
      }).catch((error) => {
        reject({ status: -1, msg: 'failed', data: { err: error } })
      });
    })
  }
  create1() {
    return new Promise((resolve, reject) => {
      (async () => {
        const pic = fs.readFileSync('./src/template/pic.jpg', 'base64');
        const inputs = [
          { facePhoto: pic, },
        ];
        const pdfdata = await labelmake({ template, inputs });

        fs.writeFile('./public/pdf/output1.pdf', pdfdata, (err) => {
          if (err) {
            reject({ status: -1, msg: 'failed', data: { err, } })
          } else {
            resolve({ status: 0, msg: 'success', data: { src: `output1.pdf` } })
          }
        });
      })();
    })
  }
  // jsPdf中单位是mm来进行的
  // a4 宽210mm，高305mm
  // a3 宽297 mm × 420 mm

  createByJsPdf() {
    return new Promise((resolve, reject) => {
      var doc = new jsPDF();
      doc.text("Hello world!", 20, 20);
      doc.text("This is client-side Javascript, pumping out a PDF.", 20, 30);
      doc.addPage("a6", "l");
      doc.text("Do you like that?", 20, 20);
      doc.save("public/pdf/output3.pdf");
      resolve({ status: 0, msg: 'OK', data: { src: 'output3.pdf' } });
    })

  }
  createText() {
    return new Promise((resolve, reject) => {
      const doc = new jsPDF({ compress: true });
      // 增加字体库
      doc.addFont("public/ttf/TencentSans.ttf", "TencentSans", "normal");
      // 这只刚才的字体
      doc.setFont('TencentSans', 'normal')
      doc.setFontSize(20);
      doc.text("这是 TencentSans 字体.", 20, 20);

      doc.setFont("courier", "normal");
      doc.text("This is courier normal.", 20, 30);

      doc.setFont("times", "italic");
      doc.text("This is times italic.", 20, 40);

      doc.setFont("helvetica", "bold");
      doc.text("This is helvetica bold.", 20, 50);

      doc.setFont("courier", "bolditalic");
      doc.text("This is courier bolditalic.", 20, 60);

      doc.setFont("times", "normal");
      doc.text("This is centred text.", 105, 80, null, null, "center");
      doc.text("And a little bit more underneath it.", 105, 90, null, null, "center");
      doc.text("This is right aligned text", 200, 100, null, null, "right");
      doc.text("And some more", 200, 110, null, null, "right");
      doc.text("Back to left", 20, 120);

      doc.text("10 degrees rotated", 20, 140, null, 10);
      doc.text("-10 degrees rotated", 20, 160, null, -10);
      doc.save("public/pdf/output4.pdf");
      resolve({ status: 0, msg: 'OK', data: { src: 'output4.pdf' } });
    })
  }
  // 目录pdf生成
  createMenu(menuList) {
    return new Promise((resolve, reject) => {
      let pdfcreator = new PdfUtil(Config.pdfConfig.pageConfig);
      // 背景图片生成
      pdfcreator.setBackgroundImg('./public/img/bac.jpg');
      // 右上角logo
      pdfcreator.setLogo('./public/img/tencent.png', 80, 60);
      // 添加字体
      pdfcreator.addTff();
      pdfcreator.setText('目录', 30, 80, 40, 'bold', 'TencentSans');

      let length = menuList.length;
      let height = 120;
      // 循环渲染目录条目
      let doc = pdfcreator.getDoc();
      for (let i = 0; i < length; i++) {
        doc.setFillColor('green');
        doc.circle(30, height - 2, 1, "F");
        pdfcreator.setText(menuList[i], 40, height, 25);
        height += 40;
      }
      // return pdfcreator.getDoc();
      // 保存
      pdfcreator.save('public/pdf/output5.pdf');
      resolve({ status: 0, msg: 'OK', data: { src: 'output5.pdf' } });
    });
  }

  // 首页pdf生成
  createFrontPage(title, timeRange, time, from) {
    return new Promise((resolve, reject) => {
      let pdfcreator = new PdfUtil(Config.pdfConfig.pageConfig);
      pdfcreator.setBackgroundImg('./public/img/blue.png');
      pdfcreator.addTff();

      let doc = pdfcreator.getDoc();
      doc.setTextColor('white');
      // 设置公司logo
      pdfcreator.setImg('./public/img/tencent.png', 50, 60, 40, 40)

      // 设置公司logo
      pdfcreator.setImg('./public/img/text1.jpg', 100, 60, 40, 40);

      // 设置title
      pdfcreator.setText(title, 50, 140, 40);

      // 设置时间区间
      pdfcreator.setText(timeRange, 200, 180, 20);

      // 设置部门
      pdfcreator.setText(from, 230, 210, 25);

      // 设置时间
      pdfcreator.setText(time, 50, 300, 15);
      pdfcreator.save("public/pdf/output6.pdf");
      resolve({ status: 0, msg: 'OK', data: { src: 'output6.pdf' } });
    });

  }
  // 创建小片段封面(字体px像素和页面像素比3:4)
  createFragmentCover(number, title, desc, subtitleSource, subtitleConclusion) {
    return new Promise((resolve, reject) => {
      let pdfcreator = new PdfUtil(Config.pdfConfig.pageConfig);
      pdfcreator.addTff();
      pdfcreator.setBackgroundImg('./public/img/bac.jpg');
      let doc = pdfcreator.getDoc();
      doc.setTextColor('white');
      pdfcreator.setText(number, 20, 100, 40);
      doc.setTextColor('blue');
      pdfcreator.setText(title, 45, 100, 40);
      doc.setTextColor('black');

      let endHeight = pdfcreator.setMultipleText(desc, 20, 150, 500, 10, 20);

      doc.setTextColor("blue");
      pdfcreator.setText('- 数据来源：', 20, endHeight + 10, 20);
      endHeight = pdfcreator.setMultipleText(subtitleSource, 20, endHeight + 10, 500, 10, 20, 80);

      pdfcreator.setText('- 主要结论：', 20, endHeight + 10, 20);
      doc.setTextColor('black');
      pdfcreator.setMultipleText(subtitleConclusion, 20, endHeight + 10, 500, 10, 20, 80);

      pdfcreator.save("public/pdf/outputFragmentCover.pdf");
      resolve({ status: 0, msg: 'OK', data: { src: 'outputFragmentCover.pdf' } });
    })
  }



  // 创建表格
  createTable() {
    return new Promise((resolve, reject) => {
      // 使用原生的table，不支持单元格的自定义样式
      // var generateData = function (amount) {
      //   var result = [];
      //   var data = {
      //     id: "100",
      //     game_name: "XPTO2",
      //     game_version: "25",
      //   };
      //   for (var i = 0; i < amount; i += 1) {
      //     data.id = (i + 1).toString();
      //     result.push(Object.assign({ textColor: 'red' }, data));
      //   }
      //   return result;
      // };

      // function createHeaders(keys) {
      //   var result = [];
      //   for (var i = 0; i < keys.length; i += 1) {
      //     result.push({
      //       id: keys[i],
      //       name: keys[i],
      //       prompt: keys[i],
      //       width: 65,
      //       align: "center",
      //       padding: 0
      //     });
      //   }
      //   return result;
      // }

      // var headers = createHeaders([
      //   "id",
      //   "game_name",
      //   "game_version",
      // ]);

      // var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
      // // doc.html
      // doc.setTableHeaderRow([{
      //   name: 'game_name',
      //   prompt: 'game_name',
      //   width: 100
      // }, {
      //   name: 'id',
      //   prompt: 'id',
      //   width: 50
      // }])

      // doc.table(20, 20, generateData(10), headers, {
      //   // autoSize: true,
      //   fontSize: 20,
      //   headerBackgroundColor: 'blue',
      //   headerTextColor: 'white'
      // });

      // 使用jspdf-autotable的插件，可以通过hook进行自定义的样式
      // doc.setFont('TencentSans', 'normal');
      let pdfcreator = new PdfUtil(Config.pdfConfig.pageConfig);
      pdfcreator.addTff();
      let doc = pdfcreator.getDoc();
      doc.autoTable({
        startX: 200,
        styleY: 200,
        tableWidth: 250, // 设置宽度
        head: [['ID', 'Name', 'Email', 'Country', 'IP-address']],
        columnStyles: { 0: { halign: 'center', fillColor: [199, 0, 24], textColor: 'red' } }, // 列的设置
        cellStyles: { 0: { halign: 'center', fillColor: [199, 0, 24], textColor: 'red' } },

        styles: { fillColor: [255, 255, 255], font: 'TencentSans', fontStyle: 'normal', textColor: [0, 0, 0], halign: 'center' }, // 表格样式
        body: [
          ['1', '你好', 'dmoore0@furl.net', 'China', '211.56.242.221'],
          ['2', 'Janice', 'jhenry1@theatlantic.com', 'Ukraine', '38.36.7.199'],
          ['3', 'Ruth', 'rwells2@example.com', 'Trinidad', '19.162.133.184'],
          ['4', 'Jason', 'jray3@psu.edu', 'Brazil', '10.68.11.42'],
          ['5', 'Jane', 'jstephens4@go.com', 'United States', '47.32.129.71'],
          ['6', 'Adam', 'anichols5@com.com', 'Canada', '18.186.38.37'],
        ],
        // 使用
        didParseCell: function (data) {
          var rows = data.table.body;
          if (data.row.index === rows.length - 1) {
            // data.cell.styles.fillColor = [239, 154, 154];
            data.cell.styles.textColor = "red"
          }
        },
        willDrawCell: function (data) {
          var rows = data.table.body;
          if (data.row.index === rows.length - 1) {
            // doc.setTextColor(239, 154, 154);
          }
        },
      });
      // pdfcreator.save('table.pdf');
      pdfcreator.save("public/pdf/outputTable.pdf");
      resolve({ status: 0, msg: 'OK', data: { src: 'outputTable.pdf' } });
    });
  }

  // 内容分析主要结论总览pdf生成
  createMainConclusion(distribute, marketValue, Creativity) {
    return new Promise((resolve, reject) => {
      let pdfcreator = new PdfUtil(Config.pdfConfig.pageConfig);
      // 设置公司logo
      pdfcreator.setLogo('./public/img/tencent.png', 60, 40);
      pdfcreator.addTff();
      // doc.setTextColor('blue');
      // pdfcreator.setText("内容分析主要结论总览", 40, 60, 30);
      pdfcreator.setText1({ text: "内容分析主要结论总览", startWidth: 40, startHeight: 60, fontSize: 30, color: "blue" });
      // 分发效果分析
      // pdfcreator.setText1('1、内容分发效果分析', 40, 90, 15);
      pdfcreator.setText1({ text: '1、内容分发效果分析', startWidth: 40, startHeight: 90, fontSize: 15, color: "blue" });
      pdfcreator.setImg('./public/img/arrow.png', 40, 100, 20, 20);
      // pdfcreator.setMultipleText('视频内容播放表现较好（看点：VV量第7，微信视频号：播放比第8）', 50,115,250,10,15);
      let heightTo = pdfcreator.setMultipleText1({
        text: '视频内容播放表现较好（看点：VV量第7，微信视频号：播放比第8）',
        startWidth: 60,
        startHeight: 115,
        limitWidth: 250,
        interval: 10,
        fontSize: 15,
        color: 'black'
      });
      pdfcreator.setImg('./public/img/arrow.png', 40, heightTo - 15, 20, 20);
      let width = pdfcreator.getWordsLength('渠道内容消费角度，', 15);
      pdfcreator.setText1({
        text: '渠道内容消费角度，',
        startWidth: 60,
        startHeight: heightTo,
        fontSize: 15,
      });
      // console.log(width);
      heightTo = pdfcreator.setMultipleText1({
        text: '视频转化较图文高约95%',
        startWidth: 60,
        startHeight: heightTo,
        color: "red",
        limitWidth: 250,
        interval: 5,
        offset: width,
        fontSize: 15,
      });
      pdfcreator.setImg('./public/img/arrow.png', 40, heightTo - 15, 20, 20);
      pdfcreator.setText1({
        text: '渠道内容分发角度，',
        startWidth: 60,
        startHeight: heightTo,
        fontSize: 15,
      });

      heightTo = pdfcreator.setMultipleText1({
        text: '图文转化较视频高约3%',
        startWidth: 60,
        startHeight: heightTo,
        color: "red",
        limitWidth: 250,
        interval: 5,
        offset: width,
        fontSize: 15,
      });

      heightTo = pdfcreator.setText1({
        text: '数据源：2021.10.21-2021.11.11QQ看点以及微信视频号中数码宝贝：新世纪内容消费数据',
        startWidth: 60,
        startHeight: heightTo + 10,
        fontSize: 8,
        color: 'black',
      });


      // 2. 内容营销价值评估
      pdfcreator.setText1({ text: '2、内容营销价值评估', startWidth: 300, startHeight: 90, fontSize: 15, color: "blue" });
      // pdfcreator.setMultipleText('视频内容播放表现较好（看点：VV量第7，微信视频号：播放比第8）', 50,115,250,10,15);
      pdfcreator.setImg('./public/img/arrow.png', 300, 100, 20, 20);
      heightTo = pdfcreator.setMultipleText1({
        text: '渠道内容分发对游戏登录转化提升显著（千次播放转化 > 35）',
        startWidth: 320,
        startHeight: 115,
        limitWidth: 250,
        interval: 10,
        fontSize: 15,
        color: 'red'
      });
      pdfcreator.setImg('./public/img/arrow.png', 300, heightTo - 15, 20, 20);
      pdfcreator.setText1({
        text: '内容分发价值',
        startWidth: 320,
        startHeight: heightTo,
        fontSize: 15,
        color: "black"
      });
      // console.log(width);
      width = pdfcreator.getWordsLength('内容分发价值', 15);

      heightTo = pdfcreator.setMultipleText1({
        text: '与年龄成负相关',
        startWidth: 320,
        startHeight: heightTo,
        color: "red",
        limitWidth: 250,
        interval: 5,
        offset: width,
        fontSize: 15,
      });

      pdfcreator.setImg('./public/img/arrow.png', 300, heightTo - 15, 20, 20);
      pdfcreator.setText1({
        text: '渠道分发价值',
        startWidth: 320,
        startHeight: heightTo,
        fontSize: 15,
        color: 'black'
      });

      heightTo = pdfcreator.setMultipleText1({
        text: '男性大于女性',
        startWidth: 320,
        startHeight: heightTo,
        color: "red",
        limitWidth: 250,
        interval: 5,
        offset: width,
        fontSize: 15,
      });

      heightTo = pdfcreator.setText1({
        text: '数据源：2021.10.21-2021.11.11QQ看点以及微信视频号中数码宝贝：新世纪内容消费数据',
        startWidth: 320,
        startHeight: heightTo + 10,
        fontSize: 8,
        color: 'black',
      });

      // 内容标签创意分析

      heightTo = pdfcreator.setText1({ text: '3、内容标签创意分析', startWidth: 150, startHeight: heightTo + 30, fontSize: 15, color: "blue" });
      // pdfcreator.setMultipleText('视频内容播放表现较好（看点：VV量第7，微信视频号：播放比第8）', 50,115,250,10,15);
      pdfcreator.setImg('./public/img/arrow.png', 150, heightTo - 5, 20, 20);
      heightTo = pdfcreator.setMultipleText1({
        text: '"主播视频"对游戏登录转化效果明显',
        startWidth: 170,
        startHeight: heightTo + 10,
        limitWidth: 250,
        interval: 10,
        fontSize: 15,
        color: 'black'
      });
      pdfcreator.setImg('./public/img/arrow.png', 150, heightTo - 15, 20, 20);
      heightTo = pdfcreator.setMultipleText1({
        text: '男性主播更偏好教学类内容，女性偏好审美类内容',
        startWidth: 170,
        startHeight: heightTo,
        limitWidth: 250,
        interval: 5,
        fontSize: 15,
      });
      pdfcreator.setImg('./public/img/arrow.png', 150, heightTo - 10, 20, 20);
      heightTo = pdfcreator.setMultipleText1({
        text: '“主播视频”在低年龄段转化效果好，中高年龄段关注游戏玩法及基础介绍性质内容',
        startWidth: 170,
        startHeight: heightTo + 5,
        limitWidth: 250,
        interval: 5,
        fontSize: 15,
      });

      heightTo = pdfcreator.setText1({
        text: '数据源：2021.10.21-2021.11.11QQ看点以及微信视频号中数码宝贝：新世纪内容消费数据',
        startWidth: 170,
        startHeight: heightTo + 10,
        fontSize: 8,
        color: 'black',
      });
      pdfcreator.save('public/pdf/mainconclusion.pdf');
      resolve({ status: 0, msg: 'OK', data: { src: 'mainconclusion.pdf' } });
    });
  }

  // 内容效果分析中内容分发总体情况
  createOverallDistribution() {
    return new Promise(async (resolve, reject) => {
      let pdfcreator = new PdfUtil(Config.pdfConfig.pageConfig);
      pdfcreator.addTff();
      pdfcreator.setLogo('./public/img/tencent.png', 40, 40);
      let heightTo = pdfcreator.setText1({
        text: '数码宝贝：新世纪看点内容分发总体情况',
        startWidth: 40,
        startHeight: 60,
        color: 'blue',
        fontSize: 30,
      });
      heightTo = pdfcreator.setTextArr({
        textArr: ["图文内容数量位列游戏", "第3位，", "曝光量位列", "第39位。"],
        colorArr: ['black', 'red', 'black', 'red'],
        startWidth: 40,
        startHeight: heightTo + 10,
        fontSize: 20,
      });

      heightTo = pdfcreator.setTextArr({
        textArr: ["视频内容数量位列", "第25位，", "曝光量位列", "第13位,", "VV量位列", "第七位"],
        colorArr: ['black', 'red', 'black', 'red', 'black', 'red'],
        startWidth: 40,
        startHeight: heightTo + 10,
        fontSize: 20,
      })

      heightTo = pdfcreator.setText1({
        text: '游戏图文内容数量及曝光量',
        color: 'black',
        startWidth: 80,
        startHeight: heightTo + 50,
        fontSize: 15,
      });
      let beginTime = new Date().getTime();
      // 创建图表
      let options = {
        xAxis: {
          type: 'category',
          data: ['游戏A', '游戏B', '游戏C', '游戏D', '游戏E ', '数码宝贝新世界',],
          // 设置全部显示，不能隔一个显示一个
          axisLabel: { interval: 0, rotate: 40 },
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [200, 180, 160, 110, 70, 20],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(0, 0, 180, 0.4)'
            },
            itemStyle: {
              color: 'blue'
            }
          }
        ],

      }

      let chart = new Chart();
      let data = await chart.render('chart.png', options);
      
      
      if (data.status !== 0) {
        resolve({ status: -1, msg: 'failed', data: { desc: 'chart generate failed' } });
      }
      pdfcreator.setImgByBinary(data.data.fileData, 70, heightTo, 200, 150);
      let endTime = new Date().getTime();
      console.log(`图表全流程生成时间：${endTime - beginTime}ms`);
      pdfcreator.save("public/pdf/outputOverallDistribution.pdf");

      resolve({ status: 0, msg: 'OK', data: { src: 'outputOverallDistribution.pdf' } });
    })
  }

  // 生成html文件
  createHtml() {
    return new Promise((resolve, reject) => {
    });
  }

  // 合并pdf文件
  createpdf() {
    return new Promise((resolve, reject) => {
      merge(['./public/pdf/output6.pdf', './public/pdf/output5.pdf', './public/pdf/mainconclusion.pdf', './public/pdf/outputFragmentCover.pdf'], './public/pdf/output7.pdf').then(() => {
        resolve({ status: 0, msg: 'OK', data: { src: 'output7.pdf' } })
      }).catch((err) => {
        reject(err);
      })
    })
  }


}

module.exports = new PdfCreator();

