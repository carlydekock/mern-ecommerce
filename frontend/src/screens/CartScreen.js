import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import CartItem from '../components/CartItem';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const query = new URLSearchParams(location.search);
  const qty = query.get('qty');

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handleQtyChange = (id, qty) => {
    dispatch(addToCart(id, qty));
  };
  
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((price, item) => (item.price * item.qty) + price, 0)
  };

  const handleCheckout = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <CartItem key={item.product} item={item} handleQtyChange={handleQtyChange} handleDelete={handleDelete}/>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal ({getCartCount()}) items</h2>
                ${getCartSubtotal().toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='d-grid'>
                  <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={handleCheckout}>Proceed To Checkout</Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

      </Row>
    </>
  );
}

export default CartScreen;
