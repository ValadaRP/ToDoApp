import {RequestHandler} from 'express';
import { Todo } from '../models/todo';
import { HttpError } from '../models/http-error';
import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator/src/validation-result';


const prisma = new PrismaClient();

export const getTodo: RequestHandler = async (req,res,next) => {
    const todos = await prisma.todo.findMany();
    prisma.$disconnect();
    res.status(201).json({todo: todos});
};

export const getTodoById: RequestHandler<{id: string}> = async (req,res,next) => {
    const todoId = req.params.id;
    const todo = await prisma.todo.findFirst({
        where: {
            id: todoId
        }
    });
    prisma.$disconnect();
    res.status(201).json({message: `Your id is ${todoId}`, res: todo});
}

export const updateTodo: RequestHandler = async (req,res,next) => {
    // const todoId = (req.body as {id:number}).id;
    const {id, name, content} = req.body as {id:string, name: string, content: string};
    await prisma.todo.update({
        where: {
            id: id
        },
        data: {
            name: name,
            content: content
        }
    });
    prisma.$disconnect();
    res.status(201).json({message: `You have sucesfully updated todo: ${id}`});
}

export const createTodo: RequestHandler = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError("Invalid inputs passed", 422));
    }
    const { name, content } = req.body as {name: string, content: string};

    const todo: Todo = new Todo(name, content);
    await prisma.todo.create({data: {name: todo.name, content: todo.content, userId: "fcf130cc-4ac1-43bb-8d59-ce0621d7f288"}});
    
    await prisma.$disconnect();
    
    res.status(201).json({message: `Your new todo is ${todo}`});
}

export const delteTodo: RequestHandler = async (req, res, next) => {
    const {id} = req.body as {id: string};
    const todo = await prisma.todo.findFirst({where: {
        id: id
    }});
    if(!todo){
        return next(new HttpError("Todo with this id doesn't exist", 400));
    }
    await prisma.todo.delete({
        where: {
            id: id
        }
    });
    await prisma.$disconnect();
    res.status(201).json({message: "You have sucesfully deleted todo"});
}
