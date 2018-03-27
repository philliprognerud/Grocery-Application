import axios from "axios";
import { FETCH_USER, UPDATE_USER_CART, GET_USER_CART } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/auth/loggedin");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUserCart = (itemID = false) => async dispatch => {
  switch (itemID) {
    case false: {
      const res = await axios.post("/api/items-in-cart", {
        itemID: itemID
      });

      if (res.data) {
        dispatch({ type: UPDATE_USER_CART, payload: res.data.cart.length });
      } else {
        dispatch({ type: UPDATE_USER_CART, payload: null });
      }

      break;
    }

    default: {
      const res = await axios.post("/api/add-to-cart", {
        itemID: itemID
      });

      dispatch({ type: UPDATE_USER_CART, payload: res.data.cartSize });
      break;
    }
  }
};

export const getUserCart = () => async dispatch => {
  const res = await axios.post("/api/items-in-cart");
  dispatch({ type: GET_USER_CART, payload: res.data.cart });
};
