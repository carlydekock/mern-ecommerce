import express from 'express';
const router = express.Router();

import { createOrder, getOrderById, updateOrderToPaid, getUserOrders } from '../controllers/orderController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

router.route('/').post(protectRoute, createOrder);
router.route('/myorders').get(protectRoute, getUserOrders);
router.route('/:id').get(protectRoute, getOrderById);
router.route('/:id/pay').put(protectRoute, updateOrderToPaid);

export default router;