export class HttpError extends Error{
    public code: number;
    constructor(public message: string, errorCode: number){
        super(message);
        this.code = errorCode;
    }
}