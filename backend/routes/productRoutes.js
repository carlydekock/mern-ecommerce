import express from 'express';
import { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts } from '../controllers/productController.js';
import { protectRoute, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

//Fetch all products, GET /api/products, access:public
router.route('/').get(getProducts).post(protectRoute, isAdmin, createProduct);
router.route('/:id/reviews').post(protectRoute, createProductReview);
router.get('/top', getTopProducts);

//Fetch a single product, GET /api/products/:id, access:public
router.route('/:id').get(getProductById).delete(protectRoute, isAdmin, deleteProduct).put(protectRoute, isAdmin, updateProduct);

export default router;