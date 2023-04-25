import {Router} from 'express';
import {getTodo, getTodoById, updateTodo, createTodo, delteTodo} from '../controllers/toDoController';
import { check } from 'express-validator';

const router = Router();

router.get('/', getTodo);
router.get('/:id', getTodoById);
router.post('/update',[check("name").not().isEmpty().isString(),check("content").not().isEmpty().isString()] ,updateTodo);
router.post('/create',[check("name").not().isEmpty().isString(),check("content").not().isEmpty().isString()] ,createTodo);
router.post('/delete',[check("id").not().isEmpty().isString()], delteTodo);

export default router;