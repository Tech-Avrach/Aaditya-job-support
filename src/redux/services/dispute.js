import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = (param) => {
  return axios.get(process.env.REACT_APP_API_URL + "dispute/list", {
    headers: authHeader(),
    data: {},
    params: param,
  });
};

const createDispute = (transactionId, reason) => {
  let data = { 
    "transactionId": transactionId, 
    "reason": reason 
  }
  return axios.post(process.env.REACT_APP_API_URL + "dispute/create", data, {
    headers: authHeader(),
    params: {},
  });
};


const get = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `dispute/view/${id}`, {
    headers: authHeader(),
    data: {},
    params: {},
  });
};

const updateStatus = (id, data) => {
  return axios.put(
    process.env.REACT_APP_API_URL + `dispute/updateStatus/${id}`,
    data,
    {
      headers: authHeader(),
    }
  );
};

const deleteDispute = (id, param) => {
  return axios.delete(process.env.REACT_APP_API_URL + `dispute/delete/${id}`, {
    data: param,
    headers: authHeader(),
  });
};

const restoreDispute = (id, param) => {
  return axios.get(process.env.REACT_APP_API_URL + `dispute/restore/${id}`, {
    params: param,
    headers: authHeader(),
  });
};


export default {
  getAll,
  get,
  updateStatus,
  createDispute,
  deleteDispute,
  restoreDispute
};
