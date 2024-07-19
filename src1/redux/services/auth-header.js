import { handleRefreshTokenHelper } from "../../hooks/refreshHelper";
import Cookies from 'js-cookie';

let token = "";

try {
  token = Cookies.get('token');
} catch (error) {
  console.log("token not found in cookies");
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

export const multipartHeader = () => {
  handleRefreshTokenHelper();
  const headers = {
    "x-access-token": token,
  };
  return headers;
};

export default { authHeader, multipartHeader };
