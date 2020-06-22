import Koa from "koa"
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { EventEmitter } from "events";

interface EventMap
{
    "prestart": (r: Router) => void
}

export class Server
{
    koaApp: Koa = new Koa()
    router: Router = new Router ()
    eventC: EventEmitter

    constructor()
    {
        this.eventC = new EventEmitter()
    }
    
    on<T extends keyof EventMap>(event: T, listener: EventMap[T])
    {
        this.eventC.on(event, listener)
        return this
    }
    emit<T extends keyof EventMap>(event: T, ...argu: any[])
    {
        this.eventC.emit(event, ...argu)
        return this
    }

    start(port?: number)
    {
        this.emit("prestart", this.router)
        this.koaApp.use(async (ctx, next) =>
        {
            ctx.set("Access-Control-Allow-Origin", "*")
            ctx.set("Access-Control-Allow-Headers", "X-Requested-With,accept, origin, content-type")
            await next()
        })
        this.koaApp.use(bodyParser())
        this.koaApp.use(this.router.routes()).use(this.router.allowedMethods())
        this.koaApp.listen(port ? port : 80)
    }
}


