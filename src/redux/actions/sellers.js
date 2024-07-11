import {
  RETRIEVE_SELLER,
  RETRIEVE_LOGGEDIN_SELLER,
  CREATE_SELLER,
  UPDATE_SELLER,
  DELETE_SELLER,
  RESTORE_SELLER,
  UPDATE_SELLER_STATUS,
  UPDATE_SELLER_ACCOUNT,
} from "./types";

import SellerService from "../../redux/services/seller.service";

export const retrieveSeller =
  (all = false, keyword = "", page = "", perPage = "", active = "") =>
  async (dispatch) => {
    try {
      const res = await SellerService.getAll(
        all,
        keyword,
        page,
        perPage,
        active
      );
      dispatch({
        type: RETRIEVE_SELLER,
        payload: res.data.listSellers,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const retrieveSingaleSeller = (id) => async (dispatch) => {
  try {
    const res = await SellerService.get(id);
    dispatch({
      type: RETRIEVE_LOGGEDIN_SELLER,
      payload: { seller: res?.data?.userInfo },
    });
  } catch (err) {
    console.log(err);
  }
};

export const createSeller = (data) => async (dispatch) => {
  try {
    const res = await SellerService.create(data);

    dispatch({
      type: CREATE_SELLER,
      payload: res.data.userInfo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateSeller = (id, data) => async (dispatch) => {
  try {
    const res = await SellerService.update(id, data);

    dispatch({
      type: UPDATE_SELLER,
      payload: res.data.userInfo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateSellerStatus = (id, data) => async (dispatch) => {
  try {
    const res = await SellerService.updateStatus(id, data);
    dispatch({
      type: UPDATE_SELLER_STATUS,
      payload: res.data?.listSellers,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const handleAccountApproval = (id, data) => async (dispatch) => {
  try {
    const res = await SellerService.accountApproval(id, data);
    dispatch({
      type: UPDATE_SELLER_ACCOUNT,
      payload: res.data?.sellerInfo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteSeller = (id, data) => async (dispatch) => {
  try {
    const res = await SellerService.deleteUser(id, data);
    console.log(res)

    dispatch({
      type: DELETE_SELLER,
      payload: res?.data?.listSellers,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const restoreSeller = (id, data) => async (dispatch) => {
  try {
    const res = await SellerService.restore(id, data);

    dispatch({
      type: RESTORE_SELLER,
      payload: res?.data?.listSellers,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    // return Promise.reject(err);
    console.log(err)
  }
};
