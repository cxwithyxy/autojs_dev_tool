import Koa from "koa"
import Router from "koa-router";
import bodyParser from "koa-bodyparser";


export class Server
{
    koaApp: Koa

    constructor()
    {
        let router = new Router ()
         
        router.post('/all', (ctx: Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>) =>
        {
            ctx.body = "啊啊啊啊"
        })
         
        this.koaApp = new Koa()
         
        this.koaApp.use(bodyParser())
         
        this.koaApp.use(router.routes()).use(router.allowedMethods())
         
    }
    
    start()
    {
        this.koaApp.listen(8181)
    }
}


