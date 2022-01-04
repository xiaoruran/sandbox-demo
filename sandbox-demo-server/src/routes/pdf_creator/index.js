const fs = require('fs');
const Koa = require('koa');
const KoaRouter = require('koa-router');
const pdfcreator = require('../../service/pdfservice');

const router = new KoaRouter();

// 创建pdf服务
router.post('/pdfcreator1', async (ctx) => {
  let params = ctx.request.body;
  const data = await pdfcreator.create(params);
  if (data.status === 0) {
    ctx.body = `${ctx.origin}/pdf/${data.data.src}`
  }

})
router.post('/pdfcreator2', async (ctx) => {
  let params = ctx.request.body;
  const data = await pdfcreator.create1();
  if (data.status === 0) {
    ctx.body = `${ctx.origin}/pdf/${data.data.src}`
  } else {
    ctx.body = data;
  }
})

router.post('/pdfcreatorByJsPdf', async (ctx) => {
  const data = await pdfcreator.createByJsPdf();
  if (data.status === 0) {
    ctx.body = `${ctx.origin}/pdf/${data.data.src}`
  } else {
    ctx.body = data;
  }
})

router.post('/pdfcreateText', async (ctx) => {
  const data = await pdfcreator.createText();
  if (data.status === 0) {
    ctx.body = `${ctx.origin}/pdf/${data.data.src}`
  } else {
    ctx.body = data;
  }
})

// 创建首页pdf即封面
router.post('/pdfcreatefrontpage', async (ctx) => {
  // const body = ctx.request.body;
  // let menuList = body.menulist;
  const data = await pdfcreator.createFrontPage('数码宝贝内容分析报告', '2021.10.21-2021.11.11', '2021.11.21', '公共数据平台部/内容中心');
  if (data.status === 0) {
    ctx.body = `${ctx.origin}/pdf/${data.data.src}`
  } else {
    ctx.body = data;
  }
})

// 创建目录pdf
router.post('/pdfcreatemenu', async (ctx) => {
  const body = ctx.request.body;
  let menuList = body.menulist;
  console.log(menuList);
  console.log(body);
  const data = await pdfcreator.createMenu(menuList.split(','));
  if (data.status === 0) {
    ctx.body = `${ctx.origin}/pdf/${data.data.src}`
  } else {
    ctx.body = data;
  }
})

// 创建子目录pdf
router.post('/pdfcreatefragmentcover', async (ctx) => {
  // const body = ctx.request.body;
  // let menuList = body.menulist;
  const data = await pdfcreator.createFragmentCover('1', '内容效果分析', '本章节对数码宝贝：新世纪内容进行曝光、消费、登录转化、付费转化等一系列的效果分析，利用统计分析手段对内容曝光及分发转化情况进行科学统计刻画。', '公共数据平台部/内容中心公共数据平台部/内容中心公共数据平台部/内容中心公共数据平台部/内容中心公共数据平台部/内容中心', '整体上内容消费对于游戏内登录有显著的正向影响、内容分发价值与年龄成负相关、男性的渠道内容分发价值高于女性');
  if (data.status === 0) {
    ctx.body = `${ctx.origin}/pdf/${data.data.src}`
  } else {
    ctx.body = data;
  }
})

// 创建主要结论
router.post('/createmainconclusion', async (ctx) => {
  const data = await pdfcreator.createMainConclusion();
  if (data.status === 0) {
    const res = fs.readFileSync(`./public/pdf/${data.data.src}`);
    ctx.set('Content-type', 'application/pdf');
    ctx.body = res;
  } else {
    ctx.body = data;
  }
})

// 创建表格
router.post('/pdfcreatetable', async (ctx) => {
  const data = await pdfcreator.createTable();
  if (data.status === 0) {
    const res = fs.readFileSync(`./public/pdf/${data.data.src}`);
    // 设置响应头 field 到 value:
    ctx.set('Content-type', 'application/pdf'); // 设置返回格式 格式为application/pdf
    // ctx.response.type = 'pdf';
    ctx.body = res;
  } else {
    ctx.body = data;
  }
})

// 合并pdf文件
router.post('/createpdf', async (ctx) => {
  // const body = ctx.request.body;
  // let menuList = body.menulist;
  const data = await pdfcreator.createpdf();
  if (data.status === 0) {
    console.log(`./public/pdf/${data.data.src}`);
    const res = fs.readFileSync(`./public/pdf/${data.data.src}`);
    // 设置响应头 field 到 value:
    ctx.set('Content-type', 'application/pdf'); // 设置返回格式 格式为application/pdf
    ctx.body = res;
  } else {
    ctx.body = data;
  }
})


// 内容效果分析中内容分发总体情况
router.post('/createoveralldistribution', async (ctx) => {
  const data = await pdfcreator.createOverallDistribution();
  if (data.status === 0) {
    console.log(`./public/pdf/${data.data.src}`);
    const res = fs.readFileSync(`./public/pdf/${data.data.src}`);
    // 设置响应头 field 到 value:
    ctx.set('Content-type', 'application/pdf'); // 设置返回格式 格式为application/pdf
    ctx.body = res;
  } else {
    ctx.body = data;
  }
})

module.exports = router;
