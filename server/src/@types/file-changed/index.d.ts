declare class FileChangeWatcher
{
    _data: string[]
    _dbPath:string
    constructor(dbPath?: string)
    addFile(...files: string[])
    check(filepath?:string): string[]
    list(): string[]
    update()
}
declare module "file-changed" {
    export = FileChangeWatcher
}
