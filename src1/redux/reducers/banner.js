
import {
    RETRIEVE_BANNER,
    CREATE_BANNER,
    UPDATE_BANNER,
    DELETE_BANNER,
    RESTORE_BANNER,
  } from "../actions/types";
  
  const initialState = { banners: [], totalBannercount: 0 };

  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

      case RETRIEVE_BANNER:
        return {
          banners: payload.rows,
          totalBannercount: payload.count,
        };

      case CREATE_BANNER:
        return {
          ...state,
          banners: [...state.banners, payload],
          totalBannercount: state.banners.length + 1,
        };

      case UPDATE_BANNER:
        return {
          ...state,
          banners: state.banners.map((item) =>
            item.publicId === payload.publicId ? payload : item
          ),
        };

      case DELETE_BANNER:
        return {
          ...state,
          banners: payload.rows,
          totalBannercount: payload.count,
        };

      case RESTORE_BANNER:
        return {
          ...state,
          banners: payload.rows,
          totalBannercount: payload.count,
        };
      default:
        return state;
    }
  }