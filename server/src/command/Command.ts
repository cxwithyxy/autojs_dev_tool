export class Command
{
    static idCounter = 0
    type: string
    state: boolean = false
    content: string
    id: number

    constructor(type:string, content: string)
    {
        this.type = type
        this.content = content
        this.id = Command.idCounter++
    }

    getId()
    {
        return this.id
    }

    isFinish()
    {
        return this.state
    }

    setFinish()
    {
        this.state = true
    }
}