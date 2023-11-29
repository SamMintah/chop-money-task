import { Router } from 'express';
import { AuthController } from '../controller/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', AuthController.login);
router.post('/initiate-reset', AuthController.initiatePasswordReset);
router.post('/complete-reset', AuthController.completePasswordReset);
router.post('/logout', authenticate, AuthController.logout);


export default router;
