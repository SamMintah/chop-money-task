import { Router } from 'express';
import { UserController } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', UserController.addUser);
// router.get('/', authMiddleware, UserController.getAllUsers);
// router.get('/:id', authMiddleware, UserController.getUserById);

export default router;
