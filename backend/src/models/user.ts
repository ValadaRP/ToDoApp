import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { hash, compare } from 'bcrypt';

export default class User{
    private _id?: string;
    private _email: string;
    private _password: string;

    constructor(email: string, password: string, id?: string){
        this._id = id;
        this._email = email;
        this._password = password;
    }
}