export class QuestionsModel {
    public statement:string
    public punctuation:number
    public id: number 
    public minPunctuation: number 
    public maxPunctuation: number 
    public difficulty: string
    public category:{
        name:string
        description:string
    }
    public alternatives: {
        id: number
        option: string
        description: string
        isCorrect: boolean
        selected: boolean
    }[]
    public verify: boolean
}