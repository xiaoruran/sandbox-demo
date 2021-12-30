const Router = require('koa-router');
const router = new Router();
const UserService = require('../../service/userservice');
const getData = require('../../utils/fileread');


// 查找用户列表(get)
router.get('/list', async (ctx) => {
  console.log(__dirname);
  let userList = await getData('./mock/userList.json');
  ctx.response.type = 'json';
  ctx.response.body = userList;
})


// 增加用户(注册用户)
router.post('/register', async (ctx) => {
  console.log('register');
  let body = ctx.request.body;
  // 先判断此用户名是否已经存在
  const findResult = await UserService.findUserByName(body.username);
  if (findResult) {
    console.log("用户已存在");
    ctx.response.body = '用户已存在'
  } else {
    const data = await UserService.createUser(body.username, body.password);
    console.log(data);
    ctx.response.body = body;
  }
})

// 更新用户
router.post('/updateUser', async (ctx) => {
  let body = ctx.request.body;
  // 先判断此用户名是否已经存在
  const findResult = await UserService.findUserById(body._id);
  if (!findResult) {
    console.log("用户不存在");
    ctx.response.body = '用户不存在'
  } else {
    const data = await UserService.updateUser(body._id, { username: body.username, password: body.password });
    console.log(data);
    ctx.response.body = body;
  }
})

// 获取用户列表
router.get('/getUserList', async (ctx) => {
  const userList = await UserService.getUserList();
  ctx.response.body = userList;
})

// 设置cookie
router.get('/cookie', async (ctx) => {
  ctx.cookies.set('cookie1', 'cookies', {
    path: "/", // 有效范围
    httpOnly: true, // 只能在服务器修改
    maxAge: 10 * 1000, // 毫秒级
  });
  ctx.response.body = ctx.cookies.get('cookie1');
})


// login登录
router.post('/login', async (ctx) => {
  console.log('login');
  ctx.session.islogin = { username: ctx.request.body.username, password: ctx.request.body.password };
  ctx.cookies.set('SESSION_ID', JSON.stringify(ctx.session.userInfo), {
    path: "/", // 有效范围
    httpOnly: true, // 只能在服务器修改
    maxAge: 30 * 60 * 1000, // 毫秒级
  });
  ctx.response.body = {
    status: 200,
    msg: "登录成功",
  }
})

//用户登出
router.post('/logout', async (ctx) => {
  ctx.session.userInfo = NULL;
  ctx.response.body = {
    status: 200,
    msg: "登出成功",
  }
})

module.exports = router;
