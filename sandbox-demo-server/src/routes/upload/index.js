const Router = require('koa-router');
const path = require('path');
const router = new Router();


router.post('/upload', async (ctx) => {
  try {
    const file = ctx.request.files.file
    let len = file.length;
    console.log(file);
    let ans = [];
    for (let i = 0; i < len; i++) {
      let basename = path.basename(file[i].path);
      ans.push({ path: `${ctx.origin}/uploads/${basename}` });
    }
    ctx.body = ans;
  } catch (err) {
    ctx.body = JSON.stringify(err);
  }
})

module.exports = router;
