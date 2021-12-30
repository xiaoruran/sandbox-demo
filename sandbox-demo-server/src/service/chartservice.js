const fs = require('fs');
const path = require('path');
const NodeCharts = require('node-charts');
const CONFIG = require('../configs/index');

// 图表配置
let option = {
  xAxis: {
    type: 'category',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '30%']
  },
  visualMap: {
    type: 'piecewise',
    show: false,
    dimension: 0,
    seriesIndex: 0,
    pieces: [
      {
        gt: 1,
        lt: 3,
        color: 'rgba(0, 0, 180, 0.4)'
      },
      {
        gt: 5,
        lt: 7,
        color: 'rgba(0, 0, 180, 0.4)'
      }
    ]
  },
  series: [
    {
      type: 'line',
      smooth: 0.6,
      symbol: 'none',
      lineStyle: {
        color: '#5470C6',
        width: 5
      },
      markLine: {
        symbol: ['none', 'none'],
        label: { show: false },
        data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
      },
      areaStyle: {},
      data: [
        ['2019-10-10', 200],
        ['2019-10-11', 560],
        ['2019-10-12', 750],
        ['2019-10-13', 580],
        ['2019-10-14', 250],
        ['2019-10-15', 300],
        ['2019-10-16', 450],
        ['2019-10-17', 300],
        ['2019-10-18', 100]
      ]
    }
  ]
};

class Chart {
  chart = new NodeCharts();
  constructor() {
    this.chart = new NodeCharts();
  }
  async render(fileName = 'output.png') {
    //监听全局异常事件
    this.chart.on('error', (err) => {
      console.log(err);
    });
    return new Promise((resolve, reject) => {
      this.chart.render(option, (err, data) => {
        if (!err) {
          let reslutPath = `${path.resolve(CONFIG.rootPath, `public/img/${fileName}`)}`
          fs.writeFileSync(reslutPath, data);
          resolve({ status: 0, msg: 'success', data: { fileName, } })
        } else {
          console.error(`渲染图表失败:${err}`);
          reject({ status: -1, msg: 'failed', data: { err } });
        }
      }, {
        //修改图表渲染所用的模板，模板中约定必须包含 div#container
        renderTo: `<div id="container" style="width: 600px;height:400px;"></div>`
      })
    })
  }
}
module.exports = Chart;



