import {read as readdir } from "readdir";

export class FSController
{
    basePath: string
    
    constructor(basePath?:string)
    {
        if(!basePath)
        {
            this.basePath = process.cwd()
            return
        }
        this.basePath = basePath
    }

    async dir()
    {
        return await readdir(this.basePath)
    }
}