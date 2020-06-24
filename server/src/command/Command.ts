export class Command
{
    static idCounter = 0
    type: string
    content: string
    id: number

    constructor(type:string, content: string)
    {
        this.type = type
        this.content = content
        this.id = Command.idCounter++
    }

    toJson()
    {
        return {id: this.id, content: this.content, type: this.type}
    }

    getId()
    {
        return this.id
    }
    
}