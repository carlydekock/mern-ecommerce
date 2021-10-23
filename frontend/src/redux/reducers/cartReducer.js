import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
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
    default:
      return state;
  }
}