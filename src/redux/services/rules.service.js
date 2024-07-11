import axios from "axios";

import { authHeader, multipartHeader } from "./auth-header";

const getAll = (param) => {
    return axios.get(process.env.REACT_APP_API_URL + "rulesReg/list", {
      headers: authHeader(),
      params: param,
    });
  };


  const createRule = (data) => {
    // const tempD = {
    //     "rulesRegText" : "Test Rules5"
    // }
    console.log(data);
    return axios.post(process.env.REACT_APP_API_URL + `rulesReg/create`, data, {
      headers: authHeader(),
    });
  };

  const get = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `rulesReg/view/${id}`, {
      headers: authHeader(),
      data: {},
    });
  };

  const update = (id, data) => {
    return axios.put(process.env.REACT_APP_API_URL + `rulesReg/update/${id}`, data, {
      headers: authHeader(),
    });
  };

  const deleteRule = (id, param) => {
    console.log(param)
    return axios.delete(
     ` ${process.env.REACT_APP_API_URL}rulesReg/delete/${id}`, 
      {
        data: param,
        headers: authHeader(),
      }
    );
  };

  const restore = (id, param) => {
    return axios.get(process.env.REACT_APP_API_URL + `rulesReg/restore/${id}`, {
        headers: authHeader(),
    });
  };

  const isActiverule = (id,Active, param) => {
    return axios.put(process.env.REACT_APP_API_URL + `rulesReg/updateStatus/${id}`,{
      "isActive" :Active,
      ...param
  }, {
      headers: authHeader(),
    });
  };

  export default {
    getAll,
    createRule,
    get,
    update,
    deleteRule,
    isActiverule,
    restore,
  }