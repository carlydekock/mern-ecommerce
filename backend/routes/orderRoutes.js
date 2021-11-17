import express from 'express';
const router = express.Router();

import { createOrder, getOrderById, updateOrderToPaid, getUserOrders, getAllOrders, updateOrderToDelivered } from '../controllers/orderController.js';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(protectRoute, createOrder).get(protectRoute, isAdmin, getAllOrders);
router.route('/myorders').get(protectRoute, getUserOrders);
router.route('/:id').get(protectRoute, getOrderById);
router.route('/:id/pay').put(protectRoute, updateOrderToPaid);
router.route('/:id/delivered').put(protectRoute, isAdmin, updateOrderToDelivered);

export default router;