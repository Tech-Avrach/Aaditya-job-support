import {
    RETRIEVE_FAQ,
    CREATE_FAQ,
    UPDATE_FAQ,
    DELETE_FAQ,
    RESTORE_FAQ,
    UPDATE_FAQ_STATUS,
} from "./types";

import FaqService from "../services/faq.service";

export const retrieveFaqs =
(param) =>
async (dispatch) => {
  try {
    const res = await FaqService.getAll(param);
    console.log(res.data.faqInfo);
    dispatch({
      type: RETRIEVE_FAQ,
      payload: res.data.listFAQ,
    });
  return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
    console.log(err);
  }
};


export const createFaq = (data) => async (dispatch) => {
  try {
    const res = await FaqService.create(data);
    console.log(res.data);
    dispatch({
      type: CREATE_FAQ,
      payload: res.data.faqInfo,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};



export const deleteFaq = (id, param) => async (dispatch) => {
    try {
      const res = await FaqService.deleteFaq(id, param);
  
      console.log("Delete faq", res)
      dispatch({
        type: DELETE_FAQ,
        payload:  res.data.listFAQ,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }


  export const restoreFaq = (id, param) => async (dispatch) => {
    try {
      const res = await FaqService.restore(id, param);
  
      console.log("restore faq", res)
      dispatch({
        type: RESTORE_FAQ,
        payload:  res.data.listFAQ,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }


  export const activeStatusFaq = (id, Active, param) => async (dispatch) => {
    try {
      const res = await FaqService.statusUpdate(id, Active, param);
        
      console.log("active status Faq",res)
      dispatch({
        type: UPDATE_FAQ_STATUS,
        payload: res.data.listFAQ,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };