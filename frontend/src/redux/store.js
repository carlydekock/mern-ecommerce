import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducer.js';
import { cartReducer } from './reducers/cartReducer.js';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducer.js';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderMyListReducer } from './reducers/orderReducer.js';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer, 
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : '';
const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage, paymentMethod: paymentMethodFromLocalStorage },
  userLogin: { userInfo: userInfoFromLocalStorage},
};
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;