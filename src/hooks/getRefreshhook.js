import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken, logout } from "../redux/actions/auth";
import { getRemainingTime } from "./refreshHelper";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const useTokenRefreshHook = () => {
  const dispatch = useDispatch();
  const handleRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("_gmp"));
    const publicId = user?.publicId

    let token;
    let refresh;

    try {
      token = Cookies.get('token');
      refresh = Cookies.get('refreshToken');
    } catch (error) {
      console.log("token not found in cookies");
    }

    if(!token || !refresh) {
      dispatch(logout());
    }

    const payloadBase64 = token?.split(".")[1];

    if (payloadBase64) {
      const decodedPayload = atob(payloadBase64);
      const parsedToken = JSON.parse(decodedPayload);

      const jwtexpire = getRemainingTime(parsedToken.exp);
      if (jwtexpire.minutes < 8) {
        // localStorage.setItem("_expire", jwtexpire.minutes);
        Cookies.set("expire", jwtexpire.minutes);
      }
      if (parsedToken.exp * 1000 < Date.now()) {
        const userId = parsedToken?.userId;
        if (refresh) {
          dispatch(refreshToken(publicId, refresh))
            .then(() => {
              console.log("Token refreshed successfully");
            })
            .catch(() => {
              console.log("Error refreshing token");
              dispatch(logout());
            });
        } else {
          dispatch(logout());
        }
      }
    }
  };

  useEffect(() => {
    handleRefreshToken();
  }, []);
};

export default useTokenRefreshHook;
