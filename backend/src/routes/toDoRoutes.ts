import {Router} from 'express';
import {getTodo} from '../controllers/toDoController';

const router = Router();

router.get('/', getTodo);

export default router;