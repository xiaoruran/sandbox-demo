const KoaRouter = require('koa-router');
const getData = require('../../utils/fileread');
const router = new KoaRouter();

router.get('/list', async (ctx) => {
  const data = await getData('./mock/tab3.json');
  ctx.response.type = 'json';
  ctx.response.body = data;
})

module.exports = router;
