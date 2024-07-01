import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";


const getAll = (param) => {
    return axios.get(process.env.REACT_APP_API_URL + "faqs/list", {
      headers: authHeader(),
      params: param,
    });
  };

  const get = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `faq/view/${id}`, {
      headers: authHeader(),
    });
  };

  const create = (data) => {
    return axios.post(process.env.REACT_APP_API_URL + "faq/create", data, {
      headers: authHeader(),
      params: {},
    });
  };

  const deleteFaq = (id, param) => {
    return axios.delete(process.env.REACT_APP_API_URL + `faq/delete/${id}`, {
      params: param,
      headers: authHeader(),
    });
  };

  const restore = (id, param) => {
    return axios.get(process.env.REACT_APP_API_URL + `faq/restore/${id}`, {
      headers: authHeader(),
    });
  };

  const update = (id, data) => {
    return axios.put(`${process.env.REACT_APP_API_URL}faq/update/${id}`, data, {
      headers: authHeader(),
    });
  };

  const statusUpdate = (id,Active, param) => {
    return axios.put(process.env.REACT_APP_API_URL + `faq/updateStatus/${id}`, {
        "isActive" :Active,
        ...param
    }, {
        headers: authHeader(),
      });
  };    


  export default {
    getAll,
    create,
    deleteFaq,
    restore,        
    update,
    statusUpdate,
    get,
  }