const Router = require('koa-router');

const router = new Router();

const tagRouter = require('./tag/index.js');
const userRouter = require('./user/index.js');
const uploadRouter = require('./upload/index.js');
const pdfRouter = require('./pdf_creator/index.js');

router.use('/tag', tagRouter.routes(), tagRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/upload', uploadRouter.routes(), uploadRouter.allowedMethods());
router.use('/pdf', pdfRouter.routes(), pdfRouter.allowedMethods());

module.exports = router;