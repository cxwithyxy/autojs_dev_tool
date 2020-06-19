declare class FileChangeWatcher
{
    constructor(dbPath?: string)
}
declare module "file-changed" {
    export = FileChangeWatcher
}
