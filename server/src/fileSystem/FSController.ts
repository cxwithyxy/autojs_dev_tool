import {read as readdir } from "readdir";
import { EventEmitter } from "events";
import {readFile} from "fs-promise-native"
import {resolve as pathResolve} from "path"
// let FileChangeWatcher = require("file-changed")
import FileChangeWatcher from "file-changed";

interface EventMap
{
    "start": (files: string[]) => void
}

export class FSController
{
    basePath: string
    eventC:EventEmitter
    fileWatcher: any

    constructor(basePath?:string)
    {
        this.eventC = new EventEmitter()
        if(!basePath)
        {
            this.basePath = process.cwd()
        }
        else
        {
            this.basePath = basePath
        }
        this.fileWatcher = new FileChangeWatcher()
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

    async getFileContent(filepath: string)
    {
        return await readFile(pathResolve(this.basePath, filepath))
    }

    async dir()
    {
        return await readdir(this.basePath)
    }

    async start()
    {
        let dirList = await this.dir()
        this.emit("start", dirList)
    }

    stop()
    {

    }
}