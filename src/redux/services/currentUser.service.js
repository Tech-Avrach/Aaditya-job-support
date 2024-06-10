import axios from "axios";
import { currentUserHeader } from "./currentUser-header"

const get = (id) => {
    return axios.get(process.env.REACT_APP_API_URL + `user/profile/${id}`, {
      headers: currentUserHeader(),
    });
  };

  const edit = (id, data) => {
    return axios.put(process.env.REACT_APP_API_URL + `user/update/${id}`, data, {
      headers: currentUserHeader(),
    });
  };



  export default {
    get,
    edit,
  };