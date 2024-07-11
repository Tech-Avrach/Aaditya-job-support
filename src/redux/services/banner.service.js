import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";



const getAll = (param) => {
    return axios.get(process.env.REACT_APP_API_URL + "banner/list",  {
        headers: authHeader(),
        params: param,
    });
};

const get = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `banner/view/${id}`, {
        headers: authHeader(),
    });
};

const create = (data) => {

    return axios.post(process.env.REACT_APP_API_URL + "banner/create", data, {
        headers: multipartHeader(),
    });
};

const update = (id, data, param) => {

    return axios.put(process.env.REACT_APP_API_URL + `banner/update/${id}?currency=${param.currency}`, data, {
        headers: multipartHeader(),
    });
};

const deleteBanner = (id, param) => {
    return axios.delete(process.env.REACT_APP_API_URL + `banner/delete/${id}`, {
        data: param,
        headers: authHeader(),
    });
};

const restore = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `banner/restore/${id}`, {
        headers: authHeader(),
    });
};
const uploadadImage = (formImage) => {
    return axios.post(process.env.REACT_APP_API_URL + `banner/upload`, formImage, {
      headers: multipartHeader(),
    })
  }

export default {
    getAll,
    get,
    create,
    update,
    deleteBanner,
    restore,
    uploadadImage
}