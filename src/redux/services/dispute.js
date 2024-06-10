import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = () => {
  return axios.get(process.env.REACT_APP_API_URL + "dispute/list", {
    headers: authHeader(),
    data: {},
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

export default {
  getAll,
  get,
  updateStatus,
};
