import authService from "../redux/services/auth.service";
import Cookies from 'js-cookie';

export const handleRefreshTokenHelper = () => {
  const user = JSON.parse(localStorage.getItem("_gmp"));
  const token = Cookies.get('token');
  const refresh = Cookies.get('refreshToken');
  const rememberMe = user?.rememberMe;
  const publicId = user?.publicId;
  const payloadBase64 = token?.split(".")[1];

  if (payloadBase64) {
    const decodedPayload = atob(payloadBase64);
    const parsedToken = JSON.parse(decodedPayload);

    const jwtexpire = getRemainingTime(parsedToken.exp);
    // console.log("jwtexpire in ", jwtexpire);
    if (jwtexpire.minutes < 7) {
      // localStorage.setItem("_expire", jwtexpire.minutes);
      Cookies.set("expire", jwtexpire.minutes);
    } else {
      // localStorage.removeItem("_expire");
      Cookies.remove("expire");
    }
    const expirationTime = parsedToken.exp * 1000;
    const refreshThreshold = expirationTime - 4 * 60000;
    if (refreshThreshold < Date.now()) {
      // const userId = parsedToken?.userId;
      if (refresh) {
        authService
          .refreshToken(publicId, refresh, rememberMe)
          .then(() => {
            console.log("Token refreshed successfully");
          })
          .catch((error) => {
            localStorage.removeItem("_gmp");

            Cookies.remove('expiry');
            Cookies.remove('refreshToken');
            Cookies.remove('token');
            window.location.replace("/login");
          });
      } else {
        localStorage.removeItem("_gmp");

        Cookies.remove('expiry');
        Cookies.remove('refreshToken');
        Cookies.remove('token');

        window.location.replace("/login");
      }
    }
  }
};

export const getRemainingTime = (expTime) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const timeRemainingInSeconds = expTime - currentTime;

  const positiveTimeRemainingInSeconds = Math.max(timeRemainingInSeconds, 0);

  const minutes = (positiveTimeRemainingInSeconds / 60).toFixed(2);
  const hours = (positiveTimeRemainingInSeconds / 3600).toFixed(2);
  return {
    minutes,
    hours,
  };
};
