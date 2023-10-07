export class QuestionsModel {
    public statement:string
    public punctuation:string
    public id: number 
    public minPunctuation: number 
    public maxPunctuation: number 
    public difficulty: string
    public category:{
        name:string
        description:string
    }
    public alternatives: {
        option: string
        description: string
        isCorrect: false
        selected: boolean
    }[]
    public verify: boolean
}