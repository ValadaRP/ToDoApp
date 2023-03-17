import express from 'express';
import {json} from 'body-parser';
import { Request,Response,NextFunction } from 'express';
import toDoRoutes from './routes/toDoRoutes';

const app = express();

app.use(json());

app.use('/todo', toDoRoutes);

app.use((err: Error,req:Request,res:Response,next:NextFunction) => {
    res.status(500).json({message: err.message});
});

app.listen(5000);