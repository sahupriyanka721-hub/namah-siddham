import express from 'express';
import { loginAdmin, logoutAdmin, getMe, changePassword } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', authLimiter, loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protectAdmin, getMe);
router.post('/change-password', protectAdmin, changePassword);

export default router;
