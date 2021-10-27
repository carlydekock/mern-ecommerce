import express from 'express';
import { getProductById, getProducts } from '../controllers/productController.js';
const router = express.Router();

//Fetch all products, GET /api/products, access:public
router.route('/').get(getProducts);

//Fetch a single product, GET /api/products/:id, access:public
router.route('/:id').get(getProductById);

export default router;