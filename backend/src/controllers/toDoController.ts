import {RequestHandler} from 'express';
import mysql from 'mysql2';
import { DBQuery,DBQueryParam } from '../models/DBConnect';


export const getTodo: RequestHandler = async (req,res,next) => {
    const rows = await DBQueryParam(`SELECT * FROM todo where id = ?`, 1);
    

    res.status(201).json({todo: rows});
};