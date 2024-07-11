import axios from "axios";

const forgotPassword = (email) => {
  return axios.post(process.env.REACT_APP_API_URL + "forgotPwdAdmin", {
    email,
  });
};

const resetPassword = (newPassword, confirmPassword, token) => {
  return axios.post(process.env.REACT_APP_API_URL + "resetPwdAdmin", {
    newPassword,
    confirmPassword,
    token,
  });
};

const commonService = { forgotPassword, resetPassword };

export default commonService;
