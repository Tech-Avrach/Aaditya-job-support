import {
    RETRIEVE_RULES,
    CREATE_RULES,
    UPDATE_RULES,
    DELETE_RULES,
    UPDATE_RULES_STATUS,
    RESTORE_RULES,
} from "./types";

import RulesService from "../services/rules.service";

export const retrieveRules =
  (param) =>
  async (dispatch) => {
    try {
      const res = await RulesService.getAll(param);
      console.log(res);
      dispatch({
        type: RETRIEVE_RULES,
        payload: res.data.listRules,
      });
    return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  export const createRule = (data) => async (dispatch) => {
    try {
      const res = await RulesService.createRule(data);
        
      console.log("create rule",res)
      dispatch({
        type: CREATE_RULES,
        payload:  res.data.rulInfo,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateRule = (id, data) => async (dispatch) => {
    try {
      const res = await RulesService.update(id, data);

      console.log("update rule", res)
      dispatch({
        type: UPDATE_RULES,
        payload:  res.data.rulInfo,
      });

      return Promise.resolve(res.data);


    } catch (err) {
      return Promise.reject(err);
    }
  }

  export const deleteRule = (id, param) => async (dispatch) => {
    try {
      const res = await RulesService.deleteRule(id, param);

      console.log("Delete rule", res)
      dispatch({
        type: DELETE_RULES,
        payload:  res.data.listRules.rows,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  export const restoreRule = (id, param) => async (dispatch) => {
    try {
      const res = await RulesService.restore(id, param);
  
      dispatch({
        type: RESTORE_RULES,
        payload: res.data.listRules.rows,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };


  export const activeStatusRule = (id, Active, param) => async (dispatch) => {
    try {
      const res = await RulesService.isActiverule(id, Active, param);
        
      console.log("active status rule",res)
      dispatch({
        type: UPDATE_RULES_STATUS,
        payload: res.data.listRules.rows,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };