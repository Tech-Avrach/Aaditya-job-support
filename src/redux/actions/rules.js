import {
    RETRIEVE_RULES,
    CREATE_RULES,
} from "./types";

import RulesService from "../services/rules.service";

export const retrieveRules =
  (keyword = "", page = "", perPage = "", all = true, active = true) =>
  async (dispatch) => {
    try {
      const res = await RulesService.getAll(keyword, page, perPage, all, active);
    //   dispatch({
    //     type: RETRIEVE_RULES,
    //     payload: res.data.rolesList,
    //   });
    console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  export const createRule = (data) => async (dispatch) => {
    try {
      const res = await RulesService.createRule(data);
  
    //   dispatch({
    //     type: CREATE_RULES,
    //     payload: res?.data,
    //   });


  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };