import express from 'express';
const router = express.Router();

import { createOrder } from '../controllers/orderController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

router.route('/').post(protectRoute, createOrder);

export default router;