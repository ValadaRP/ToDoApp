import {RequestHandler} from 'express';
import { DBQuery,DBQueryParam, DBUpdate, DBCreate, DBDelete } from '../models/DBConnect';
import { Todo } from '../models/todo';
import { HttpError } from '../models/http-error';

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
    // const todoId = (req.body as {id:number}).id;
    const {id, name, content} = req.body as {id:number, name: string, content: string};
    await DBUpdate(`UPDATE todo SET Name = ?, Content = ? WHERE Id = ?`,id,name, content);
    res.status(201).json({message: `You have sucesfully updated todo: ${id}`});
}

export const createTodo: RequestHandler = async (req,res,next) => {
    const { name, content } = req.body as {name: string, content: string};

    const todo: Todo = new Todo(name, content);
    await DBCreate(`INSERT INTO todo (Name, Content) VALUES (?, ?);`,todo.name, todo.content);

    res.status(201).json({message: `Your new todo is ${todo}`});
}

export const delteTodo: RequestHandler = async (req, res, next) => {
    const {id} = req.body as {id: number};
    const todo: todo = await DBQueryParam(`SELECT * FROM todo where id = ?`, id);
    if(!todo){
        return next(new HttpError("Todo with this id doesn't exist", 400));
    }
    await DBDelete(`DELETE from todo WHERE id = ?`,id);

    res.status(201).json({message: "You have sucesfully deleted todo"});
}