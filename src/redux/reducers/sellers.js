import {
  RETRIEVE_SELLER,
  RETRIEVE_LOGGEDIN_SELLER,
  DELETE_SELLER,
  RESTORE_SELLER,
  UPDATE_SELLER_STATUS,
  UPDATE_SELLER_ACCOUNT,
} from "../actions/types";

const initialState = { sellers: [], totalSellerCount: 0 };

const sellerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_SELLER:
      return {
        sellers: payload,
        totalSellerCount: payload.count,
      };

    case RETRIEVE_LOGGEDIN_SELLER:
      return payload;

    // case CREATE_USER:
    //   return payload;

    // case UPDATE_USER:
    //   return payload;

    case UPDATE_SELLER_STATUS:
      const updated = state.sellers?.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      );
      return {
        sellers: updated,
        totalSellerCount: state.totalSellerCount,
      };

    case DELETE_SELLER:
      // const updatedSellers = state.sellers?.map((item) =>
      //   item.publicId === payload.publicId ? { ...item, ...payload } : item
      // );
      return {
        ...state,
        sellers: payload,
        totalSellerCount: state.totalSellerCount,
      };

    case RESTORE_SELLER:
      // const restored = state.sellers?.map((item) =>
      //   item.publicId === payload.publicId ? { ...item, ...payload } : item
      // );
      return {
        sellers: payload,
        totalSellerCount: state.totalSellerCount,
      };

    case UPDATE_SELLER_ACCOUNT:
      return state;

    default:
      return state;
  }
};

export default sellerReducer;
