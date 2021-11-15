import express from 'express';
const router = express.Router();

import { authUser, getUserProfile, updateUserProfile, registerUser, getUsers, deleteUser } from '../controllers/userController.js';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protectRoute, isAdmin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protectRoute, getUserProfile).put(protectRoute, updateUserProfile);
router.route('/:id').delete(protectRoute, isAdmin, deleteUser);

export default router;