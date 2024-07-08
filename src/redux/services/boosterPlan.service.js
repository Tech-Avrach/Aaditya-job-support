import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = (param) => {
    return axios.get(process.env.REACT_APP_API_URL + "boosterPlan/list",  {
        headers: authHeader(),
        params: param,
    });
};

const get = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `boosterPlan/view/${id}`, {
        headers: authHeader(),
    });
};

const create = (data, param) => {
    return axios.post(process.env.REACT_APP_API_URL + `boosterPlan/create??currency=${param.currency} `, data, {
        headers: authHeader(),
    });
};

const update = (id, data, param) => {
    return axios.put(process.env.REACT_APP_API_URL + `boosterPlan/update/${id}?currency=${param.currency}`, data, {
        headers: authHeader(),
    });
};

const deleteBoosterplan = (id) => {
    return axios.delete(process.env.REACT_APP_API_URL + `boosterPlan/delete/${id}`, {
        headers: authHeader(),
    });
};

const restore = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `boosterPlan/restore/${id}`, {
        headers: authHeader(),
    });
};

export default {
    getAll,
    get,
    create,
    update,
    deleteBoosterplan,
    restore
}