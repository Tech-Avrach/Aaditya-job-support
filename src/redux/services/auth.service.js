import axios from "axios";
import { Navigate } from "react-router-dom";

const login = (email, password, rememberMe) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "admin/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data?.data.sessionToken) {
        let _expiry = "";
        if (!rememberMe) {
          _expiry = new Date().getTime() + 1000 * 60 * 30;
        }

        const userObj = {
          token: response.data?.data.sessionToken,
          refreshToken: response.data?.data?.refreshToken,
          expiry: _expiry,
          firstName: response.data?.data?.userInfo?.firstName,
          lastName: response.data?.data?.userInfo?.lastName,
          email: response.data?.data?.userInfo?.email,
          profileImage: response.data?.data?.userInfo?.profileImage,
          publicId: response.data?.data?.userInfo?.publicId,
          permission: response.data?.permission
        };

        localStorage.setItem("_gmp", JSON.stringify(userObj));
      }
      return response.data;
    });
};

const refreshToken = (userId, refreshToken, rememberMe) => {
  return axios
    .post(process.env.REACT_APP_API_URL + "user/renewSession", {
      publicId: userId,
      refreshToken,
    })
    .then((response) => {
      if (response?.data?.response?.newSessionToken) {
        let _expiry = "";
        if (!rememberMe) {
          _expiry = new Date().getTime() + 1000 * 60 * 30;
        }
        if (response?.data?.response?.newSessionToken) {
          const userObj = {
            token: response?.data?.response?.newSessionToken,
            refreshToken: null,
            expiry: _expiry,
            firstName: response.data?.response?.userInfo?.firstName,
            lastName: response.data?.response?.userInfo?.lastName,
            email: response.data?.response?.userInfo?.email,
            profileImage: response.data?.response?.userInfo?.profileImage,
            publicId: response.data?.response?.userInfo?.publicId,
          };

          localStorage.setItem("_gmp", JSON.stringify(userObj));
        }
      }
      return response.data.userInfo;
    });
};

const logout = () => {
  localStorage.removeItem("_gmp");
  <Navigate to="/login" />;
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { login, logout, refreshToken };
