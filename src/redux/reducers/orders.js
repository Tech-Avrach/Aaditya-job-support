import {
    RETRIEVE_ORDERS
} from "../actions/types";

const initialState = { orders: [], totalOrderCount: 0 };

const ordersReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_ORDERS:
        return {
            orders: payload,
          totalOrderCount: payload.length,
        };
  
      default:
        return state;
    }
  };
  
  export default ordersReducer;
  