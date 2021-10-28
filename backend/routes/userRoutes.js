import express from 'express';
const router = express.Router();

import { authUser, getUserProfile, registerUser } from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protectRoute, getUserProfile);

export default router;