import { RETRIEVE_DISPUTE, UPDATE_DISPUTE_STATUS } from "./types";

import DisputeService from "../../redux/services/dispute";

export const retrieveDispute = () => async (dispatch) => {
  try {
    const res = await DisputeService.getAll();
    dispatch({
      type: RETRIEVE_DISPUTE,
      payload: res.data.listDispute,
    });
    
  } catch (err) {
    console.log(err);
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
