import express, { RequestHandler } from 'express';
import {json} from 'body-parser';
import { Request,Response,NextFunction } from 'express';
import toDoRoutes from './routes/toDoRoutes';
import userRoutes from './routes/userRoutes';
import { HttpError } from './models/http-error';
import cors from 'cors';

const app = express();

app.use(json());
app.use(cors());

app.use('/todo', toDoRoutes);
app.use('/user', userRoutes);

app.use((req,res,next): RequestHandler => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error: HttpError, _:Request ,res: Response,next: NextFunction) => {
    if (res.headersSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);