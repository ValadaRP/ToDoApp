import {RequestHandler} from 'express';
import { HttpError } from '../models/http-error';
import { validationResult } from 'express-validator/src/validation-result';
import User from '../models/user';
import { PrismaClient } from '@prisma/client';
import { hash, compare } from 'bcrypt';
const prisma = new PrismaClient();


export const createUser: RequestHandler = async (req,res,next) => {
    const {email,password} = req.body as {email: string, password: string};   
    let hashedPassword = await hash(password, 12);
    await prisma.user.create({data: {
        email: email,
        password: hashedPassword
    }});

    res.status(201).json({message: "You succesfuly created your account"});
};