import axios from "axios";

import { authHeader, multipartHeader, rulesHeader } from "./auth-header";

const getAll = (keyword, page, perPage, all, active = true) => {
    return axios.get(process.env.REACT_APP_API_URL + "rulesReg/list", {
      headers: authHeader(),
      params: {
        keyword: keyword,
        page: page,
        perPage: perPage,
        all: all,
        active: active,
      },
    });
  };


  const createRule = (data) => {
    // const tempD = {
    //     "rulesRegText" : "Test Rules5"
    // }
    console.log(data);
    return axios.post(process.env.REACT_APP_API_URL + `rulesReg/create`, data, {
      headers: rulesHeader(),
    });
  };

  export default {
    getAll,
    createRule,

  }