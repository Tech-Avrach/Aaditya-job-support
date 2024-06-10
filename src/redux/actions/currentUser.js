import { CURRENT_USER_UPDATE, EDIT_CURRENT_USER } from "./types";

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
    const response = await currentUserServices.edit(id, data);
      console.log("res : ", response);
      dispatch({
        type: CURRENT_USER_UPDATE,
        payload: response.data.userInfo.profileImage,
      });

      const userObj = {
        firstName: response.data?.userInfo?.firstName,
        lastName: response.data?.userInfo?.lastName,
        email: response.data?.userInfo?.email,
        profileImage: response.data?.userInfo?.profileImage,
        publicId: response.data?.userInfo?.publicId,
      };
      let currentUser = JSON.parse(localStorage.getItem("_gmp"));
      localStorage.setItem("_gmp", JSON.stringify({...currentUser, ...userObj}));
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
