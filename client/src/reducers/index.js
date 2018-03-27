import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import getCart from "./getCart";

export default combineReducers({
  auth: authReducer,
  cartAmount: cartReducer,
  cart: getCart
});
