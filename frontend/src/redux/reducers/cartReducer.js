import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_RESET} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch(action.type){
    case CART_ADD_ITEM:
      const item = action.payload;
      const itemExists = state.cartItems.find(element => element.product === item.product);
      if(itemExists){
        return {
          ...state,
          cartItems: state.cartItems.map(element => element.product === itemExists.product ? item : element),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
      case CART_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product !== action.payload)
        }
      case CART_SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: action.payload
        }
      case CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload
        }
      case CART_RESET:
        return {
          ...state,
          cartItems: []
        }
    default:
      return state;
  }
}