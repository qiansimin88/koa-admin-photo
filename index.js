const Koa = require('koa')
const app = new Koa()   // koa实例
const chalk = require('chalk');
require('./router')( app );
const util = require('./util/util')


// 中间件安装
require('./middleware')(app);
// 鉴权中间件
app.use(async (ctx, next) => {
    let _match = ['/login', '/qrcode', '/token', '/check'].indexOf(ctx.request.path) >= 0
  
    if (!_match) {
      let token = util.getToken(ctx)
      if (!token) {
        util.redirectToLogin(ctx)
      } else {
        let res = await axios.get('https://api.ikcamp.cn/my', {
          headers: { 'x-session': token }
        })
        if (res.data.data && res.data.data.isAdmin) {
          ctx.state.token = token
          await next()
        } else {
          util.redirectToLogin(ctx)
        }
      }
    } else {
      await next()
    }
})
app.listen( 3443, () => {
    console.log( chalk.green( 'koa-admin-photo applcation is running at http://locahost:3443' ) );
} );
