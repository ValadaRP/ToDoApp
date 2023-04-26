import {RequestHandler} from 'express';
import { HttpError } from '../models/http-error';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator/src/validation-result';
import { hash, compare } from 'bcrypt';

const prisma = new PrismaClient();

export const createUser: RequestHandler = async (req,res,next) => {
    const {email,password} = req.body as {email: string, password: string};

    let hashedPassword = await hash(password, 12);
    await prisma.user.create({data: {email: email, password: hashedPassword}});
    
    prisma.$disconnect();
    
    res.status(201).json({message: "You succesfuly created your account"});
};