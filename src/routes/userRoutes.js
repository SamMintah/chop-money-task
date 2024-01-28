import { Router } from 'express';
import { UserController } from '../controller/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', UserController.addUser);
router.get('/', authenticate, UserController.getAllUsers);
router.get('/:id', authenticate, UserController.getUserById);

export default router;
