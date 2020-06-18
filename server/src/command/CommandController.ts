import { Command } from "./Command";
import _ from "lodash"

export class CommandController
{
    commandQueue: Command[]

    constructor()
    {
        this.commandQueue = []
    }

    createCommand(type: string, content: string)
    {
        this.commandQueue.push(new Command(type, content))
    }

    finishCommand(id: number)
    {
        this.getCommand(id).setFinish()
    }

    getCommand(): Command[]
    getCommand(id: number): Command
    getCommand(id?: number): Command[] | Command
    {
        if(_.isUndefined(id))
        {
            return this.commandQueue
        }
        let returnCommand: Command | undefined
        _.forEach(this.commandQueue, (v, k) =>
        {
            returnCommand = v
        })
        if(_.isUndefined(returnCommand))
        {
            throw new Error(`command id not found (id: ${id})`);
        }
        return returnCommand
    }
}