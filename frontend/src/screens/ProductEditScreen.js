import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails } from '../redux/actions/productActions';


const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if(!product.name || product._id !== productId){
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, history, productId, product]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //update product details
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name' className='my-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='price' className='my-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='number' placeholder='Enter price' value={price.toFixed(2)} onChange={(e) => setPrice(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='image' className='my-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='brand' className='my-3'>
            <Form.Label>Brand</Form.Label>
            <Form.Control type='text' placeholder='Enter brand name' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='countInStock' className='my-3'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='category' className='my-3'>
            <Form.Label>Category</Form.Label>
            <Form.Control type='text' placeholder='Enter category name' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
            {/* <Form.Select size="sm">
              <option value={category}>Gear</option>
              <option value={category}>Clothing</option>
              <option value={category}>Accessories</option>
              <option value={category}>Equipment</option>
            </Form.Select> */}
          </Form.Group>
          <Form.Group controlId='description' className='my-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>Update</Button>
        </Form>
        )}
      </FormContainer>
    </>
  );
}

export default ProductEditScreen;