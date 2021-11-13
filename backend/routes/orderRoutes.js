import express from 'express';
const router = express.Router();

import { createOrder, getOrderById } from '../controllers/orderController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

router.route('/').post(protectRoute, createOrder);
router.route('/:id').get(protectRoute, getOrderById);

export default router;