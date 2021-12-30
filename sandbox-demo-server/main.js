const Koa = require('koa');
const Router = require('koa-router');
const tagRouter = require('./src/routes/tag/index');
const userRouter = require('./src/routes/user/index');
const uploadRouter = require('./src/routes/upload/index');
const pdfRouter = require('./src/routes/pdf_creator/index');
const chartRouter = require('./src/routes/chart_creator/index');
const BodyParser = require('koa-bodyparser');
const KoaSession = require('koa-session');
const { SESSION_CONFIG } = require('./src/configs/index');
const auth = require('./src/authentication/index.js');
const path = require('path');
const auth_session = require('./src/authentication/session.js');
// 支持文件、json、form格式的请求体
const KoaBody = require('koa-body');
// 设置静态目录，浏览器直接可以访问路径
const koaStatic = require('koa-static')


const app = new Koa();
const router = new Router();

// 使用koa-session进行身份鉴权
app.keys = ['session']; // 加密密钥
app.use(KoaSession(SESSION_CONFIG, app));

// 跨域问题解决
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  await next();
});

// 加载鉴权中间件（手动编写的）cookie
// app.use(auth());

//加载鉴权中间件（使用koa-session中间件）
app.use(auth_session());

//加载静态服务中间件,这里指定了public文件夹作为静态访问文件夹，之后访问就可以通过 http://localhost:3000/uploads/upload_f58f7f4fdc45744ca7ecccb80c69af37.jpg来进行访问
app.use(koaStatic(path.join(__dirname, 'public')))

// 挂载Koa-body,此中间件可以支持文件上传,这个中间件需要在koa-bodyparser之前先注册
app.use(KoaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: path.join(__dirname, 'public/uploads'),
    // 保留文件扩展名
    keepExtensions: true,
  }
}))

// 挂载koa-bodyparser
app.use(BodyParser());


// 子路由挂载
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/tag', tagRouter.routes(), tagRouter.allowedMethods());
router.use('/upload', uploadRouter.routes(), uploadRouter.allowedMethods());
router.use('/pdf', pdfRouter.routes(), pdfRouter.allowedMethods());
router.use('/chart', chartRouter.routes(), chartRouter.allowedMethods());

// 根路由挂载
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
app.listen(3000, () => {
  console.log(`3000端口正在被监听`);
});
// console.log(process.cwd());
