import {read as readdir } from "readdir";
import { EventEmitter } from "events";

interface EventMap
{
    "start": (files: string[]) => void
}

export class FSController
{
    basePath: string
    eventC:EventEmitter

    constructor(basePath?:string)
    {
        this.eventC = new EventEmitter()
        if(!basePath)
        {
            this.basePath = process.cwd()
            return
        }
        this.basePath = basePath
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

    async dir()
    {
        return await readdir(this.basePath)
    }

    async start()
    {
        this.emit("start", await this.dir())
    }

    stop()
    {

    }
}