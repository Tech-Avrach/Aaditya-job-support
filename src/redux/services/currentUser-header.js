import { handleRefreshTokenHelper } from "../../hooks/refreshHelper";

const user = JSON.parse(localStorage.getItem("_gmp"));
let token = "";

if (user && user.token) {
  token = user.token;
}

export const currentUserHeader = () => {
    handleRefreshTokenHelper();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return headers;
  };

  export default { currentUserHeader };