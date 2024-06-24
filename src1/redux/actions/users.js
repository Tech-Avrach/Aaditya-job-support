import {
  RETRIEVE_USERS,
  RETRIEVE_SINGALE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  RESTORE_USER,
  UPDATE_USER_STATUS,
  ADD_USER_SUPERADMIN,
} from "./types";

import UserService from "../../redux/services/user.service";

export const retrieveUsers =
  (keyword = "", page = "", perPage = "") =>
  async (dispatch) => {
    try {
      const res = await UserService.getAll(keyword, page, perPage);
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data.listUsers,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const retrieveSingleUser = (id) => async (dispatch) => {
  try {
    const res = await UserService.get(id);
    dispatch({
      type: RETRIEVE_SINGALE_USER,
      payload: { user: res?.data?.userInfo },
    });
    return Promise.resolve(res?.data?.userInfo);
  } catch (err) {
    console.log(err);
  }
};

export const createUser = (data) => async (dispatch) => {
  try {
    const res = await UserService.create(data);

    dispatch({
      type: CREATE_USER,
      payload: res.data.userInfo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.update(id, data);

    dispatch({
      type: UPDATE_USER,
      payload: res.data.userInfo,
    });

    const userObj = {
      firstName: res.data?.userInfo?.firstName,
      lastName: res.data?.userInfo?.lastName,
      email: res.data?.userInfo?.email,
      profileImage: res.data?.userInfo?.profileImage,
      publicId: res.data?.userInfo?.publicId,
    };
    let currentUser = JSON.parse(localStorage.getItem("_gmp"));
    localStorage.setItem("_gmp", JSON.stringify({...currentUser, ...userObj}));

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateUserStatus = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.updateStatus(id, data);
    dispatch({
      type: UPDATE_USER_STATUS,
      payload: res.data?.listUsers?.rows,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.deleteUser(id, data);

    dispatch({
      type: DELETE_USER,
      payload: res.data?.listUsers?.rows,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const restoreUser = (id, data) => async (dispatch) => {
  try {
    const res = await UserService.restore(id, data);


    dispatch({
      type: RESTORE_USER,
      payload: res.data?.listUsers?.rows,
    });

    // return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
    // console.log(err)
  }
};

export const AddUserSuperAdmin = (data) => async (dispatch) => {
  try {
    const res = await UserService.addusersuperadmin(data);

    dispatch({
      type: ADD_USER_SUPERADMIN,
      payload: res.data.userInfo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
