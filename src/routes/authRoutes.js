import { Router } from 'express';
import { AuthController } from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', AuthController.login);
router.post('/reset-initiate', AuthController.resetPasswordInitiate);
router.post('/reset-complete', AuthController.resetPasswordComplete);
router.post('/logout', authMiddleware, AuthController.logout);


export default router;
