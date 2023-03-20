import {Router} from 'express';
import {getTodo, getTodoById, updateTodo} from '../controllers/toDoController';

const router = Router();

router.get('/', getTodo);
router.get('/:id', getTodoById);
router.post('/update', updateTodo);

export default router;