import { handleRefreshTokenHelper } from "../../hooks/refreshHelper";

const user = JSON.parse(localStorage.getItem("_gmp"));
let token = "";

if (user && user.token) {
  token = user.token;
}
export const authHeader = () => {
  handleRefreshTokenHelper();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    // 'x-access-token': token,
  };
  return headers;
};

export const rulesHeader = () => {
  handleRefreshTokenHelper();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    // 'x-access-token': token,
  };
  return headers;
};

export const multipartHeader = () => {
  handleRefreshTokenHelper();
  const headers = {
    "x-access-token": token,
  };
  return headers;
};

export default { authHeader, multipartHeader, rulesHeader };
