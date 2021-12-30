const Koa = require('koa');

const auth = function () {
  return async function (ctx, next) {
    let allowUrl = ['/user/login', '/user/register', '/user/logout'];
    let session_id = ctx.session.islogin;

    // console.log(ctx.request.url);

    // if (allowUrl.indexOf(ctx.request.url) !== -1) {
    //   await next();
    //   return;
    // }
    // if (session_id === undefined) {
    //   ctx.body = {
    //     status: -1,
    //     msg: "请先登录",
    //   }
    //   return;
    // }
    await next();
    return;
  }
}

module.exports = auth;
