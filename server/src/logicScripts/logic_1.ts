import { CommandController } from "../command/CommandController";
import { FSController } from "../fileSystem/FSController";
import { Server } from "../net/Server";
import _ from "lodash";

let cmc!: CommandController
let fsc!: FSController
let server!: Server

export function init()
{
    cmc = new CommandController()
    fsc = new FSController("build")
    server = new Server()
}

export function eventInit()
{
    fsc.on("start", (files) =>
    {
        _.forEach(files, (v) =>
        {
            cmc.createCommand("download", v)
        })
    })

    server.on("prestart", r =>
    {
        r.post("/", ctx =>
        {
            ctx.body = JSON.stringify(cmc.toJson())
        })
        r.post("/done", ctx =>
        {
            let id = ctx.request.body.id
            if(id)
            {
                cmc.removeCommand(id)
                ctx.body = "1"
                return
            }
            ctx.body = "0"
        })
    })
}

export function start()
{
    fsc.start()
    server.start()
}