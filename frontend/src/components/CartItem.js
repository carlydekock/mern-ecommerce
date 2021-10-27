import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form} from 'react-bootstrap';

// const CartItem = ({item, handleQtyChange, handleDelete}) => {
//   return (
//     <div>
//       <div className="CartItem-image">
//         <img src={item.image} alt={item.name}/>
//       </div>
//       <Link to={`/product/${item.product}`} className="CartItem-name">
//         <p>{item.name}</p>
//       </Link>
//       <p className="CartItem-price">${item.price}</p>
//       <select className="CartItem-select" value={item.qty} onChange={(e) => handleQtyChange(item.product, e.target.value)}>
//         {[...Array(item.countInStock).keys()].map(element => (
//           <option key={element+1} value={element+1}>{element+1}</option>
//         ))}
//       </select>
//       <button className="CartItem-delete" onClick={() => handleDelete(item.product)}>
//         <i className="fas fa-trash"></i>
//       </button>
//     </div>
//   );
// }

const CartItem = ({item, handleQtyChange, handleDelete}) => {
  return (
    <div>
      <Row>
        <Col md={2}>
          <Image src={item.image} alt={item.name} fluid rounded/>
        </Col>
        <Col md={3}>
          <Link to={`/product/${item.product}`} className="CartItem-name">{item.name}</Link>
        </Col>
        <Col md={2}>${item.price}</Col>
      <Col md={2}>
      <select className="CartItem-select" value={item.qty} onChange={(e) => handleQtyChange(item.product, e.target.value)}>
        {[...Array(item.countInStock).keys()].map(element => (
          <option key={element+1} value={element+1}>{element+1}</option>
          ))}
      </select>
      </Col>
      <Col md={2}>
      <button className="CartItem-delete" onClick={() => handleDelete(item.product)}>
        <i className="fas fa-trash"></i>
      </button>
      </Col>
        </Row>
    </div>
  );
}

export default CartItem;
