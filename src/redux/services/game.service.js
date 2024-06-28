import axios from "axios";
import { authHeader, multipartHeader } from "./auth-header";

const getAll = (
  keyword,
  page,
  perPage,
  platform,
  category,
  minPrice,
  maxPrice,
  currency,
  adType,
  status
) => {
  return axios.get(process.env.REACT_APP_API_URL + "ad/list", {
    headers: authHeader(),
    data: {},
    params: {
      all: true,
      page: page,
      keyword: keyword,
      perPage: perPage,
      platform: platform,
      category: category,
      minPrice: minPrice,
      maxPrice: maxPrice,
      currency: currency,
      adType: adType,
      status: status,
    },
  });
};

const get = (id) => {
  return axios.get(process.env.REACT_APP_API_URL + `ad/view/${id}`, {
    headers: authHeader(),
    data: {},
  });
};

const create = (data) => {
  return axios.post(process.env.REACT_APP_API_URL + `ad/create`, data, {
    headers: multipartHeader(),
  });
};

const update = (id, data) => {

  return axios.put(process.env.REACT_APP_API_URL + `ad/update/${id}`, data, {
    headers: multipartHeader(),
  });
};

const deleteGame = (id, data) => {
  return axios.delete(process.env.REACT_APP_API_URL + `ad/delete/${id}`, {
    headers: authHeader(),
    data: data,
  });
};

const restore = (id, data) => {
  return axios.get(process.env.REACT_APP_API_URL + `ad/restore/${id}`, {
    headers: authHeader(),
    data: data,
  });
};

const uploadadImage = (formImage) => {
  console.log('first', formImage)
  return axios.post(process.env.REACT_APP_API_URL + `adImage/upload`, formImage, {
    headers: multipartHeader(),
  })
}

const uploadTradeItemPic = (formImage) => {
  return axios.post(process.env.REACT_APP_API_URL + `tradeImage/upload`, formImage, {
    headers: multipartHeader(),
  })
}

export default {
  getAll,
  get,
  create,
  update,
  deleteGame,
  restore,
  uploadadImage,
  uploadTradeItemPic,
};
