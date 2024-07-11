import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = (param) => {
    return axios.get(process.env.REACT_APP_API_URL + "insurance/list", {
      headers: authHeader(),
      params: param,
    });
  };


  const get = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `insurance/view/${id}`, {
      headers: authHeader(),
    });
  };

  const create = (data) => {
    return axios.post(process.env.REACT_APP_API_URL + "insurance/create", data, {
      headers: authHeader(),
      params: {},
    });
  };

  const deleteInsurance = (id, param) => {
    return axios.delete(process.env.REACT_APP_API_URL + `insurance/delete/${id}`, {
      params: param,
      headers: authHeader(),
    });
  };

  const restore = (id, param) => {
    return axios.get(process.env.REACT_APP_API_URL + `insurance/restore/${id}`, {
      headers: authHeader(),
    });
  };

  const update = (id, data) => {
    return axios.put(`${process.env.REACT_APP_API_URL}insurance/update/${id}`, data, {
      headers: authHeader(),
    });
  };

  export default {
    getAll,
    get,
    create,
    deleteInsurance,
    restore,
    update
  }