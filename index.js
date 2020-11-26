const _koa = require("./lib/koa")
const Router = require('./lib/router')
const server = new _koa()
const router = new Router();

router.get('/index', async (ctx, next) => { ctx.body = 'index page'; });
router.get('/post', async (ctx, next) => { ctx.body = 'post page'; });
router.get('/list', async (ctx, next) => { ctx.body = 'list page'; });
router.post('/index', async (ctx, next) => { ctx.body = 'post page'; });

server.use(router.routesMiddleware());

server.listen(3000)