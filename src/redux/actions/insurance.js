import {
    CREATE_INSURANCE,
    RETRIEVE_INSURANCE,
    UPDATE_INSURANCE,   
    DELETE_INSURANCE,
    RESTORE_INSURANCE
  } from "./types";


  import insuranceService from "../services/insurance.service";

  export const retrieveInsaurance =
(param) =>
async (dispatch) => {
  try {
    const res = await insuranceService.getAll(param);
    console.log('retrieved insurance',res.data);
    dispatch({
      type: RETRIEVE_INSURANCE,
      payload: res.data.insuranceList,
    });
  return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
    console.log(err);
  }
};


export const createInsurance = (data) => async (dispatch) => {
    try {
      const res = await insuranceService.create(data);
      console.log(res.data);
      // dispatch({
      //   type: CREATE_INSURANCE,
      //   payload: res.data.insuranceInfo,
      // });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };


  export const deleteInsurance = (id, param) => async (dispatch) => {
    try {
      const res = await insuranceService.deleteInsurance(id, param);
  
      console.log("Delete Insurance", res)
      dispatch({
        type: DELETE_INSURANCE,
        payload:  res.data.insuranceList,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }


  export const restoreInsurance = (id, param) => async (dispatch) => {
    try {
      const res = await insuranceService.restore(id, param);
  
      console.log("restore Insurance", res)
      dispatch({
        type: RESTORE_INSURANCE,
        payload:  res.data.insuranceList,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  export const updateInsurance = (id, data) => async (dispatch) => {
    try {
      const res = await insuranceService.update(id, data);
      console.log("update insurance", res)
      
      dispatch({
        type: UPDATE_INSURANCE,
        payload:  res.data.insuranceList,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      console.log("insurance update error",err)
      return Promise.reject(err);
    }
  }