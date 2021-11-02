import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../redux/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const cart = useSelector(state => state.cart);
  const { userInfo } = userLogin;

  const getCartCount = () => {
    return cart.cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
  };

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Summit Supply</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart ({getCartCount()})</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : 
              <LinkContainer to="/login">
                <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
              </LinkContainer>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

