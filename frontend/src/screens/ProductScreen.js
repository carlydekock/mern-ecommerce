import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails, createProductReview } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productContants';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreateReview = useSelector(state => state.productCreateReview);
  const { error:errorCreateReview, success:successCreateReview } = productCreateReview;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(successCreateReview){
      alert('Review submitted!');
      setRating(0);
      setComment('');
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET});
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successCreateReview])

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, {
      rating,
      comment
    }))
  }

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>⬅ Go Back</Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
              <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col><strong>${product.price}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map(element => (
                            <option key={element+1} value={element+1}>{element+1}</option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button className='btn-block' type='button' onClick={handleAddToCart} disabled={product.countInStock === 0}>Add To Cart</Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {product.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating}/>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write A Review</h2>
                {errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}
                {userInfo ? (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='rating' className='my-3'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-3'>Submit</Button>
                  </Form>
                ) : (<Message>Please <Link to='/login'> sign in</Link> to write a review.</Message>)}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
      )}
    </div>
  );
}

export default ProductScreen;
