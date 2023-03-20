import {Router} from 'express';
import {getTodo, getTodoById, updateTodo, createTodo} from '../controllers/toDoController';

const router = Router();

router.get('/', getTodo);
router.get('/:id', getTodoById);
router.post('/update', updateTodo);
router.post('/create', createTodo);

export default router;