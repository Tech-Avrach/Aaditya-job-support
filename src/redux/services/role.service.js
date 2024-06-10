import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = (keyword, page, perPage) => {
  return axios.get(process.env.REACT_APP_API_URL + "role/list", {
    headers: authHeader(),
    data: {},
    params: {
      keyword: keyword,
      page: page,
      perPage: perPage,
    },
  });
};

const get = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `role/view/${id}`, {
    headers: authHeader(),
    data: {},
    params: {},
  });
};

const update = (id, data) => {
  return axios.put(process.env.REACT_APP_API_URL + `role/update/${id}`, data, {
    headers: multipartHeader(),
  });
};

const getpermission = (roleId) => {
  return axios.get(
    process.env.REACT_APP_API_URL + `permission/view/${roleId}`,
    {
      headers: authHeader(),
      data: {},
      params: {},
    }
  );
};

const createrole = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + `role/create`, data, {
    headers: multipartHeader(),
  });
};

const addpermission = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + `permission/create`, data, {
    headers: multipartHeader(),
  });
};

const deleteUser = (id) => {
  return axios.delete(process.env.REACT_APP_API_URL + `role/delete/${id}`, {
    headers: authHeader(),
  });
};

const restore = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `role/restore/${id}`, {
    headers: authHeader(),
  });
};

const isActiveroles = (id,Active) => {
  console.log(authHeader());
  return axios.put(process.env.REACT_APP_API_URL + `role/updateStatus/${id}`,{
    "isActive" :Active
}, {

    headers: authHeader(),
   
  });
};

export default {
  getAll,
  getpermission,
  createrole,
  get,
  update,
  addpermission,
  deleteUser,
  restore,
  isActiveroles,
};
