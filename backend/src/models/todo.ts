export class Todo{
    private _name: string;
    private _content: string;

    constructor(name: string, content: string){
        this._name = name;
        this._content = content;
    }

    get name(){
        return this._name;
    }
    get content(){
        return this._content;
    }
    
}