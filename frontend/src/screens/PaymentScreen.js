import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/actions/cartActions';

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal'); //default payment method

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch save shipping address
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check type='radio' label='Paypal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>
        <div className='my-3'>
        <Button type='submit' variant='primary'>Continue</Button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
