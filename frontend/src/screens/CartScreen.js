import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../redux/actions/cartActions';

const CartScreen = ({match, location, history}) => {
  const productId = match.params.id;
  const query = new URLSearchParams(location.search);
  const qty = query.get('qty');

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty])

  return (
    <div>
      Cart Screen
    </div>
  );
}

export default CartScreen;
