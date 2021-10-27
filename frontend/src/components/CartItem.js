import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Button, Form } from 'react-bootstrap';

const CartItem = ({ item, handleQtyChange, handleDelete }) => {
  return (
    <div>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col md={3}>
          <Link to={`/product/${item.product}`} className="CartItem-name">{item.name}</Link>
        </Col>
        <Col md={2}>${item.price.toFixed(2)}</Col>
        <Col md={2}>
          <Form.Select value={item.qty} onChange={(e) => handleQtyChange(item.product, e.target.value)}>
          {[...Array(item.countInStock).keys()].map(element => (
              <option key={element + 1} value={element + 1}>{element + 1}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button type="button" variant="light" onClick={() => handleDelete(item.product)}>
            <i className="fas fa-trash"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CartItem;
