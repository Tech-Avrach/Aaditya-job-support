import { EDIT_CURRENT_USER } from "./types";

import currentUserServices from "../../redux/services/currentUser.service";

export const getCurrentUser = (id) => async (dispatch) => {
  try {
    const res = await currentUserServices.get(id);
    //   console.log("res : ", res);
    //   dispatch({
    //     type: EDIT_CURRENT_USER,
    //     payload: res.data.userInfo,
    //   });
    return Promise.resolve(res.data.userInfo);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const editCurrentUser = (id, data) => async (dispatch) => {
  try {
    const res = await currentUserServices.edit(id, data);
    //   console.log("res : ", res);
    //   dispatch({
    //     type: EDIT_CURRENT_USER,
    //     payload: res.data.userInfo,
    //   });
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
