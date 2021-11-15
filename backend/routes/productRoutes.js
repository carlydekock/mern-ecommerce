import express from 'express';
import { getProductById, getProducts, deleteProduct } from '../controllers/productController.js';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

//Fetch all products, GET /api/products, access:public
router.route('/').get(getProducts);

//Fetch a single product, GET /api/products/:id, access:public
router.route('/:id').get(getProductById).delete(protectRoute, isAdmin, deleteProduct);

export default router;