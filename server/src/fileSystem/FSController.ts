import {read as readdir } from "readdir";
import { EventEmitter } from "events";
import {readFile} from "fs-promise-native"
import {resolve as pathResolve, relative as pathRelative} from "path"
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
        console.log(`watching current path: ${this.basePath}`)
        
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

    dir2RelativePath(dir: string[])
    {
        let returnDir: string[] = []
        _.each(dir, v =>
        {
            returnDir.push(pathRelative(this.basePath, v))
        })
        return returnDir
    }
    
    dir2AbsolutePath(dir: string[])
    {
        let returnDir: string[] = []
        _.each(dir, (v) =>
        {
            returnDir.push(pathResolve(this.basePath, v))
        })
        return returnDir
    }

    async start()
    {
        this.isWorking = true
        let dirList = this.dir2AbsolutePath(await this.dir())
        this.fileWatcher.addFile(...dirList)
        this.fileWatcher.update();
        
        this.emit("start", this.dir2RelativePath(dirList))
        
        ;(async ()=>
        {
            for(;;)
            {
                if(!this.isWorking)
                {
                    break
                }
                let filesChanged = <string[]>[]
                let missingFiles = <string[]>[]
                try
                {
                    filesChanged = this.fileWatcher.check()
                }
                catch(e)
                {
                    console.log((<Error>e).message.split("file: ")[1]);
                    
                }
                if(filesChanged.length > 0)
                {
                    this.emit("fileChange", this.dir2RelativePath(filesChanged))
                }
                this.fileWatcher.update();
                await sleep(10e3)
            }
        })()
    }

    stop()
    {
        this.isWorking = false
    }
}