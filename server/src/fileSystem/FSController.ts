import {read as readdir } from "readdir";
import { EventEmitter } from "events";
import {readFile} from "fs-promise-native"
import {resolve as pathResolve} from "path"
import FileChangeWatcher from "file-changed";
import sleep from "sleep-promise";
import _ from "lodash";

interface EventMap
{
    "start": (files: string[]) => void
    "fileChange": (files: string[]) => void
}

export class FSController
{
    basePath: string
    eventC:EventEmitter
    fileWatcher: FileChangeWatcher
    isWorking: boolean = false

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
        let returnDir: string[] = []
        let pathDir = await readdir(this.basePath)
        _.each(pathDir, (v) =>
        {
            returnDir.push(pathResolve(this.basePath, v))
        })
        return returnDir
    }

    async start()
    {
        this.isWorking = true
        let dirList = await this.dir()
        this.fileWatcher.addFile(...dirList)
        this.fileWatcher.update();
        
        this.emit("start", dirList)
        
        ;(async ()=>
        {
            for(;;)
            {
                if(!this.isWorking)
                {
                    break
                }
                let filesChanged = this.fileWatcher.check()
                this.emit("fileChange", filesChanged)
                this.fileWatcher.update();
                await sleep(1e3)
            }
        })()
    }

    stop()
    {
        this.isWorking = false
    }
}