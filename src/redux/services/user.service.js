import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = (keyword, page, perPage) => {
  return axios.get(process.env.REACT_APP_API_URL + "user/list", {
    headers: authHeader(),
    data: {},
    params: {
      all: true,
      keyword: keyword,
      page: page,
      perPage: perPage,
    },
  });
};

const get = (id) => {
  console.log(id)
  return axios.get(process.env.REACT_APP_API_URL + `user/view/${id}`, {
    headers: authHeader(),
    data: {},
  });
};

const create = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + `user/create`, data, {
    headers: multipartHeader(),
  });
};

const update = (id, data) => {
  return axios.put(process.env.REACT_APP_API_URL + `user/update/${id}`, data, {
    headers: multipartHeader(),
  });
};

const updateStatus = (id, data) => {
  return axios.put(
    process.env.REACT_APP_API_URL + `user/updateStatus/${id}`,
    data,
    {
      headers: authHeader(),
    }
  );
};

const deleteUser = (id) => {
  return axios.delete(process.env.REACT_APP_API_URL + `user/delete/${id}`, {
    headers: authHeader(),
  });
};

const restore = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `user/restore/${id}`, {
    headers: authHeader(),
  });
};

const addusersuperadmin = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + `user/register/backEnd`, data, {
    headers: multipartHeader(),
  });
};

export default {
  getAll,
  get,
  create,
  update,
  updateStatus,
  deleteUser,
  restore,
  addusersuperadmin
};
