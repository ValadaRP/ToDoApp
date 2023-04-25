import {Router} from 'express';
import { check } from 'express-validator';
import { createUser } from '../controllers/userController';

const router = Router();

router.post("/create", createUser);

export default router;