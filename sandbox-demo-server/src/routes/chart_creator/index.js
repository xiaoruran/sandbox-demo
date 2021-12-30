const fs = require('fs');
const path = require('path');
const KoaRouter = require('koa-router');
const Chart = require('../../service/chartservice');
const CONFIG = require('../../configs/index');



const router = new KoaRouter();

// 创建图表服务
router.post('/chartcreate', async (ctx) => {
  let chart = new Chart();
  let params = ctx.request.body;
  const data = await chart.render();
  if (data.status === 0) {
    ctx.set('Content-type', 'image/png');
    const result = fs.readFileSync(`${path.resolve(CONFIG.rootPath, `public/img/${data.data.fileName}`)}`);
    ctx.body = result;
  }
})

module.exports = router;
