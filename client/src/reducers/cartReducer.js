import { UPDATE_USER_CART } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case UPDATE_USER_CART:
      return action.payload || false;

    default:
      return state;
  }
}
