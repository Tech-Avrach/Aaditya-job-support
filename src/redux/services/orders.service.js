import axios from "axios";
import { authHeader } from "./auth-header";

const getAll = (param) => {
    return axios.get(process.env.REACT_APP_API_URL + `order/list`,  {
        headers: authHeader(),
        params: param,
    });
};

const get = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `order/view/${id}`, {
        headers: authHeader(),
    });
};

export default {
    getAll,
    get
}