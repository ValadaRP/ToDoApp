import {Router} from 'express';
import {getTodo, getTodoById, updateTodo, createTodo, delteTodo} from '../controllers/toDoController';

const router = Router();

router.get('/', getTodo);
router.get('/:id', getTodoById);
router.post('/update', updateTodo);
router.post('/create', createTodo);
router.post('/delete', delteTodo);

export default router;