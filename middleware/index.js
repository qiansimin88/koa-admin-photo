// 所有的中间件
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const path = require('path')
const koaStatic = require('koa-static')


module.exports = ( app ) => {
    // 配合静态资源服务
    app.use( koaStatic( path.resolve(__dirname, '../public') ) );
    // 配置模板引擎
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../views'),  // 模板位置
        nunjucksConfig: {
          trimBlocks: true
        }
    }))
    // 处理Post请求 ctx.request.body;
    app.use( bodyParser() ); 
}
