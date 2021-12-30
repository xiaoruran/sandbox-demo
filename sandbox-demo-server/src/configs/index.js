const process = require('process');

// 设置项目根路径
const rootPath = process.cwd();

const pdfWidth = 600;
const pdfHeight = 450;
const CONFIG = {
  SESSION_CONFIG: {
    key: 'koa:sess',
    maxAge: 60 * 1000, /** cookie 的过期时间 */
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false,
  },
  pdfConfig: {
    width: pdfWidth,
    height: pdfHeight,
    pageConfig: {
      orientation: "landscape",
      unit: "px",
      format: [pdfHeight, pdfWidth], // 高、宽设置
    }
  },
  rootPath,
};

module.exports = CONFIG;