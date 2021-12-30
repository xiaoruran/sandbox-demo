//洋葱模型简易实现
// 中间件格式
export interface Middleware {
  (...res: any): Promise<any>;
}

export default class Onion {
  middlewares: Middleware[] = [];

  constructor(middlewares: Middleware[] = []) {
    this.middlewares = middlewares;
  }

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  execute(context: any) {
    // 将上下文和中间件嵌入到上一级的中间件中,并将上下文保存到每一个中间件中
    const fn = compose(this.middlewares);
    return fn(context);
  }
}

// function compose(middlewares: Array<Middleware>) {
//   if (!Array.isArray(middlewares)) {
//     throw new Error('中间件是数组形式');
//   }
//   for (let i = 0; i < (middlewares as Middleware[]).length; i++) {
//     if (typeof middlewares[i] !== 'function') {
//       throw new Error('中间件的每一项是函数形式');
//     }
//   }

//   return (context: any) => {
//     let index = 0;
//     function dispatch(fn: Middleware | undefined) {
//       if (!fn) {
//         return Promise.resolve();
//       }
//       // 这个将下一个中间件赋给当前中间件的next参数
//       const next = () => dispatch(middlewares[++index]);
//       return Promise.resolve(fn(context, next));
//     }
//     return dispatch(middlewares[index]);
//   }
// }


function compose(middlewares: Array<Middleware>) {
  if (!Array.isArray(middlewares)) {
    throw new Error('中间件须是数组形式');
  }
  for (let i = 0; i < middlewares.length; i++) {
    if (typeof middlewares[i] !== 'function') {
      throw new Error('中间件的每一项须是函数')
    }
  }

  return (context: any) => {
    let index = 0;
    function dispatch(fn: Middleware | undefined) {
      if (!fn) {
        return Promise.resolve();
      }
      const next = () => dispatch(middlewares[++index]);
      return Promise.resolve(fn(context, next));
    }
    return dispatch(middlewares[0]);
  }
}

const onion = new Onion();

onion.use(async (context: any, next: Middleware) => {
  console.log("第一层");
  await next();
  console.log("第一层结束");
});

onion.use(async (context: any, next: Middleware) => {
  console.log("第二层");
  await next();
  console.log("第二层结束");
});

onion.execute(1);






