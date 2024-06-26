import { CREATE_DISPUTE, RETRIEVE_DISPUTE, UPDATE_DISPUTE_STATUS } from "./types";

import DisputeService from "../../redux/services/dispute";

export const retrieveDispute = (filterText, page, perPage) => async (dispatch) => {
  try {
    const res = await DisputeService.getAll(filterText, page, perPage);
    console.log(filterText, page, perPage);
    dispatch({
      type: RETRIEVE_DISPUTE,
      payload: res.data.listDispute,
    });
    
  } catch (err) {
    console.log(err);
  }
};

export const createDispute = (transactionId, reason) => async (dispatch) => {
  try {
    const res = await DisputeService.createDispute(transactionId, reason);
    console.log(res.data.message);
    dispatch({
      type: CREATE_DISPUTE,
      payload: res.data.listDispute,
    });

    return Promise.resolve(res.data);
    
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const updateDisputeStatus = (id, data) => async (dispatch) => {
  try {
    const res = await DisputeService.updateStatus(id, data);
    
    dispatch({
      type: UPDATE_DISPUTE_STATUS,
      payload: res.data?.listDispute,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
