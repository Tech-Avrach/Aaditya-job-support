import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = (param) => {
    return axios.get(process.env.REACT_APP_API_URL + "pages/list", {
      headers: authHeader(),
      params: param,
    });
  };

  const get = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `page/view/${id}`, {
      headers: authHeader(),
    });
  };

  const create = (data) => {
    return axios.post(process.env.REACT_APP_API_URL + "page/create", data, {
      headers: multipartHeader(),
    });
  };

  const update = (id, data) => {
    return axios.put(process.env.REACT_APP_API_URL + `page/update/${id}`, data, {
      headers: multipartHeader(),
    });
  };

  const deleteCms = (id) => {
    return axios.delete(process.env.REACT_APP_API_URL + `page/delete/${id}`, {
      headers: authHeader(),
    });
};

const restore = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `page/restore/${id}`, {
      headers: authHeader(),
    });
};    
export default {
  getAll,
  get,
  create,
  update,
  deleteCms,
  restore,
}