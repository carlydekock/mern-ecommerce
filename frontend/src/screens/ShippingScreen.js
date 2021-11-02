import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../redux/actions/cartActions';

const ShippingScreen = ({ history }) => {

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [stateAbbrev, setStateAbbrev] = useState(shippingAddress.stateAbbrev || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch save shipping address
    dispatch(saveShippingAddress({ address, city, postalCode, country}));
    history.push('/payment');
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='city' className='my-3'>
          <Form.Label>City</Form.Label>
            <Form.Control type='text' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='state' className='my-3'>
          <Form.Label>State</Form.Label>
            <Form.Control type='text' placeholder='Enter state' value={stateAbbrev} required onChange={(e) => setStateAbbrev(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-3'>
          <Form.Label>Postal Code</Form.Label>
            <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='country' className='my-3'>
          <Form.Label>Country</Form.Label>
            <Form.Control type='text' placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
