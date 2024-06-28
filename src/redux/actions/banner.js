import {
    RETRIEVE_BANNER,
    CREATE_BANNER,
    UPDATE_BANNER,
    DELETE_BANNER,
    RESTORE_BANNER,
} from "./types";

import BannerService from "../../redux/services/banner.service";

export const retrieveBanners = (param) => async (dispatch) => {
    try {
        const res = await BannerService.getAll(param);
        console.log('retrieved banner',res.data.listPages);
        dispatch({
            type: RETRIEVE_BANNER,
            payload: res.data.listPages,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
        console.log(err);
    }
};

export const createBanner = (data) => async (dispatch) => {
    try {
      const res = await BannerService.create(data);
      console.log('create banner',res.data);
      dispatch({
        type: CREATE_BANNER,
        payload: res.data.bannerData,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateBanner = (id, data) => async (dispatch) => {
    try {
      const res = await BannerService.update(id, data);
  
      console.log("update banner", res)
      dispatch({
        type: UPDATE_BANNER,
        payload:  res.data.bannerData,
      });
      return Promise.resolve(res.data);
    } catch (err) {

      return Promise.reject(err);
    }
  };

  export const deleteBanner = (id, param) => async (dispatch) => {
    try {
      const res = await BannerService.deleteBanner(id, param);
  
      console.log("delete banner", res)
      dispatch({
        type: DELETE_BANNER,
        payload:  res.data.listPages,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const restoreBanner = (id) => async (dispatch) => {
    try {
      const res = await BannerService.restore(id);
  
      console.log("restore banner", res)
      dispatch({
        type: RESTORE_BANNER,
        payload:  res.data.listPages,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
