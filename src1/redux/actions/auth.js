import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from "./types";

import AuthService from "../services/auth.service";

export const login = (email, password, rememberMe) => (dispatch) => {
  return AuthService.login(email, password, rememberMe).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });


      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const refreshToken = (userId, refreshToken) => (dispatch) => {
  return AuthService.refreshToken(userId, refreshToken).then(
    (data) => {
    
      dispatch({
        type: REFRESH_SUCCESS,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REFRESH_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();


  dispatch({
    type: LOGOUT,
  });
};
