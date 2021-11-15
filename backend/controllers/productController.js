import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//Fetch all products, GET /api/products, access:public
const getProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//Fetch a single product, GET /api/products/:id, access:public
const getProductById = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);

  if(product){
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//Delete a single product, Delete /api/products/:id, access:private/admin
const deleteProduct = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);

  if(product){
    await product.remove();
    res.json({message: 'Product removed'});
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
};
