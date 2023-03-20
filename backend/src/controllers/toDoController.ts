import {RequestHandler} from 'express';
import mysql from 'mysql2';
import { DBQuery,DBQueryParam, DBUpdate } from '../models/DBConnect';

interface todo{
    Id:number;
    Name:string;
    Content: string;
    Date: Date;
}

export const getTodo: RequestHandler = async (req,res,next) => {
    // const rows = await DBQueryParam(`SELECT * FROM todo where id = ?`, 1);

    const rows = await DBQuery("SELECT * FROM todo");
    res.status(201).json({todo: rows});
};

export const getTodoById: RequestHandler<{id: number}> = async (req,res,next) => {
    const todoId = req.params.id;
    const response: todo = await DBQueryParam(`SELECT * FROM todo where id = ?`,todoId);
    console.log(response.Id);

    res.status(201).json({message: `Your id is ${todoId}`, res: response});
}

export const updateTodo: RequestHandler = async (req,res,next) => {
    const todoId = (req.body as {id:number}).id;
    const response = await DBQueryParam(`SELECT * FROM todo where id = ?`,todoId);
    

    res.status(201).json({message: `Test: ${todoId}`});
}